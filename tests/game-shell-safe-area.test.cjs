const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-player-hall.js'),'utf8');
const code=source.slice(source.indexOf('  function fitTelegramGameShell('),source.indexOf('  function adminGames('));
function fit(platform,safe={},content={}){const shell={style:{},addEventListener(){}};const context={window:{Telegram:{WebApp:{platform,safeAreaInset:safe,contentSafeAreaInset:content}},matchMedia:()=>({matches:false}),addEventListener(){},visualViewport:{height:800}},innerHeight:800};vm.createContext(context);vm.runInContext(code+';fitTelegramGameShell(shell);',Object.assign(context,{shell}));return shell.style;}
test('desktop Telegram has no invented mobile toolbar gap',()=>{for(const platform of ['tdesktop','macos','windows','linux']){const style=fit(platform);assert.equal(style.top,'0px');assert.equal(style.height,'800px');}});
test('iOS and Android retain native safe areas and toolbar clearance',()=>{assert.equal(fit('ios',{top:44},{top:52}).top,'104px');assert.equal(fit('android').top,'60px');assert.equal(fit('ios',{top:44,bottom:20},{top:52}).height,'676px');});
