const A=require('node:assert/strict'),D=require('./data'),E=require('./engine');
const owned=['active','home','lab'],rapid=new Set([10,11,13,14,265,266,268,664,665,401]),slow=new Set([147,148,246,247,371,372,374,375,443,444,610,611]);
let totals={histories:0,pokemon:0,eligible:0,evolved:0,evolutions:0,calendar:0,battle:0,trade:0,home:0,lab:0,sameYear:0,shiny:0,items:0,rapid:0,slow:0},previous={histories:0,pokemon:0,eligible:0,evolved:0,evolutions:0};let old;try{old=require('../destinos-v15/engine')}catch{}
function count(s,t){t.histories++;t.pokemon+=s.pokemon.length;t.eligible+=s.pokemon.filter(p=>D.edges[p.originId]?.length).length;t.evolved+=s.pokemon.filter(p=>p.evolutions.length).length;t.evolutions+=s.pokemon.flatMap(p=>p.evolutions).length;}
for(let i=0;i<80;i++){
 const input={name:'Crescimento '+i,birth:`${1970+i%40}-${String(i%12+1).padStart(2,'0')}-15`,cityId:D.cities[i%10].id,asOf:'2026-11-25'};
 let s=E.simulate(input);count(s,totals);if(old)count(old.simulate(input),previous);
 if(i<25){let future=E.simulate({...input,asOf:'2030-11-25'});A.deepEqual(s.events,future.events.filter(e=>e.date<=s.asOf));}
 for(let [j,e] of s.events.entries()){
  A(e.snapshot.pokemon.filter(p=>p.status==='active').length<=6);if(e.kind!=='evolution')continue;
  let uid=e.pokemon[0],p=e.snapshot.pokemon.find(p=>p.uid===uid),prior=s.events[j-1].snapshot.pokemon.find(p=>p.uid===uid);A(prior);A(owned.includes(prior.status));A.equal(prior.status,p.status);A.equal(prior.shiny,p.shiny);A(D.edges[prior.id].includes(p.id));A(s.pokemon.find(x=>x.uid===uid).willing);if(p.shiny)totals.shiny++;if(p.status==='home')totals.home++;if(p.status==='lab')totals.lab++;
  if(!e.development){totals.trade++;A.equal(s.events[j-1].kind,'trade');continue;}
  const d=e.development;totals[d.trigger]++;if(rapid.has(prior.id)){A(d.days>=30);totals.rapid++}if(slow.has(prior.id)){A(d.days>=(D.species[prior.id].stage?900:540));totals.slow++}if(d.trigger==='battle'){let b=s.events.slice(0,j).reverse().find(x=>x.battle);A(b&&b.date===e.date&&b.battle.duels.some(x=>x.uid===uid));}
  if(d.item){let item=e.snapshot.world.items.find(x=>x.uid===d.item);A(item&&item.status==='utilizado'&&item.usedBy===uid&&item.usedDate===e.date);totals.items++;}if(d.method==='item')A(d.item);
  let mon=s.pokemon.find(x=>x.uid===uid);if(e.age===mon.obtainedAge)totals.sameYear++;
  A.equal(E.biography(s,uid,j).id,p.id);
 }
 for(let p of s.pokemon){if(!p.willing)A.equal(p.evolutions.length,0);for(let k=1;k<p.evolutions.length;k++)A(p.evolutions[k].date>p.evolutions[k-1].date);}
}
A(totals.calendar&&totals.battle&&totals.home&&totals.lab&&totals.sameYear&&totals.items&&totals.rapid&&totals.slow);console.log(JSON.stringify({current:totals,previous:old?previous:null},null,2));
