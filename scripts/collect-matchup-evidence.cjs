// Public SSR pages only. No private APIs, credentials or browser state.
const fs=require('node:fs');
const path=require('node:path');
const {loadLibrary,slug,sourceUrl,parsePage}=require('./lib/matchup-validation.cjs');
const root=path.resolve(__dirname,'..');
const cache=path.resolve(process.argv[2]||path.join(root,'.matchup-evidence-cache'));
const patches=(process.argv[3]||'16.22,16.21').split(',');
const limit=Number(process.argv[4]||0);
const api=loadLibrary(root);
const requests=api.champions.flatMap(champion=>champion.roles.flatMap(role=>patches.map(patch=>({enemy:champion.name,role,patch}))));
if(limit) requests.splice(limit);
fs.mkdirSync(cache,{recursive:true});
let complete=0,failed=0,stopped=false;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function worker() {
  while(requests.length&&!stopped) {
    const request=requests.shift();
    const key=`${slug(request.enemy)}-${request.role}-${request.patch}`;
    const output=path.join(cache,key+'.json');
    if(fs.existsSync(output)) {
      const prior=JSON.parse(fs.readFileSync(output));
      const raw=path.join(cache,key+'.html');
      if(prior.httpStatus===200 && fs.existsSync(raw)) {
        const reparsed={...prior,...parsePage(fs.readFileSync(raw,'utf8'),request)};
        fs.writeFileSync(output,JSON.stringify(reparsed,null,2));
        if(reparsed.verifiedScope){complete++;continue;}
      }
    }
    const url=sourceUrl(request.enemy,request.role,request.patch);
    let result;
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'User-Agent':'DraftLanternResearchAudit/1.0 (public matchup validation)'}});
      const retrievedAt=new Date().toISOString();
      const html=await response.text();
      if(response.status===429 || response.status===403) {stopped=true;throw new Error(`Source access returned ${response.status}; collection stopped without bypassing protection`);}
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      result={...parsePage(html,request),url,retrievedAt,httpStatus:response.status,
        httpAge:response.headers.get('age'),httpDate:response.headers.get('date'),etag:response.headers.get('etag')};
      fs.writeFileSync(path.join(cache,key+'.html'),html);
      if(!result.verifiedScope) failed++;
    }catch(error){failed++;result={...request,url,retrievedAt:new Date().toISOString(),verifiedScope:false,errors:[error.message],rows:[]};}
    fs.writeFileSync(output,JSON.stringify(result,null,2));
    complete++;
    if(complete%20===0 || result.errors.length) console.log(JSON.stringify({complete,remaining:requests.length,failed,key,errors:result.errors}));
    await sleep(400);
  }
}
Promise.all(Array.from({length:3},worker)).then(()=>{
  console.log(JSON.stringify({complete,remaining:requests.length,failed,stopped,cache}));
  if(failed||stopped) process.exitCode=1;
});
