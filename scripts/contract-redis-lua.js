"use strict";
const {lua, lauxlib, lualib, to_luastring, to_jsstring} = require("fengari");

// Bridge the tracking scripts to the same Redis state used by HTTP contracts.
module.exports = function runLua(script, keys, args, command) {
  const state = lauxlib.luaL_newstate();
  function push(value) {
    if (value == null || value === false) lua.lua_pushboolean(state, false);
    else if (typeof value === "number") lua.lua_pushnumber(state, value);
    else if (typeof value === "string") lua.lua_pushstring(state, to_luastring(value));
    else if (value === true) lua.lua_pushboolean(state, true);
    else {
      lua.lua_newtable(state);
      for (const [key, item] of Object.entries(value)) {
        push(Array.isArray(value) ? Number(key) + 1 : key);
        push(item);
        lua.lua_settable(state, -3);
      }
    }
  }
  function read(index) {
    index = lua.lua_absindex(state, index);
    if (lua.lua_istable(state, index)) {
      const value = lua.lua_rawlen(state, index) ? [] : {};
      lua.lua_pushnil(state);
      while (lua.lua_next(state, index)) {
        const key = read(-2);
        value[Array.isArray(value) ? key - 1 : key] = read(-1);
        lua.lua_pop(state, 1);
      }
      return value;
    }
    if (lua.lua_type(state, index) === lua.LUA_TNUMBER) return lua.lua_tonumber(state, index);
    if (lua.lua_isstring(state, index)) return to_jsstring(lua.lua_tostring(state, index));
    return lua.lua_toboolean(state, index);
  }
  function bind(name, callback) {
    lua.lua_pushjsfunction(state, () => {
      const values = Array.from({length: lua.lua_gettop(state)}, (_, i) => read(i + 1));
      push(callback(...values));
      return 1;
    });
    lua.lua_setglobal(state, to_luastring(name));
  }
  try {
    lualib.luaL_openlibs(state);
    push(keys); lua.lua_setglobal(state, to_luastring("KEYS"));
    push(args); lua.lua_setglobal(state, to_luastring("ARGV"));
    bind("command", (...parts) => command(parts));
    bind("encode", JSON.stringify);
    bind("decode", JSON.parse);
    const setup = "redis={call=command}; cjson={encode=encode,decode=decode}; ";
    const status = lauxlib.luaL_dostring(state, to_luastring(setup + script));
    if (status !== lua.LUA_OK) throw new Error(String(read(-1)));
    return read(-1);
  } finally { lua.lua_close(state); }
};
