'use strict';
// Patch only our numeric field; preserve the original external profile JSON,
// including null properties and array positions that Upstash cjson discards.
const LUA=`local function profileWithGameExperience(raw,total)
 if not raw or not string.match(raw,'^%s*{') then raw='{}' end
 local value=tostring(total)
 local patched,count=string.gsub(raw,'("gameExperience"%s*:%s*)[%d%.eE%+%-]+',function(prefix) return prefix..value end,1)
 if count==1 then return patched end
 local body=string.gsub(raw,'}%s*$','')
 local comma=string.match(body,'^%s*{%s*$') and '' or ','
 return body..comma..'"gameExperience":'..value..'}'
end\n`;
module.exports={LUA};
