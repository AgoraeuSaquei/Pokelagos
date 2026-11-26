const assert=require('node:assert/strict'),D=require('./data'),E=require('./engine');let battles=0,duels=0,wins=0,losses=0,post=0;
for(let i=0;i<200;i++){
 let s=E.simulate({name:'Teste batalha '+i,birth:'1985-01-01',cityId:D.cities[i%10].id,asOf:'2026-11-25'}),xp={};
 for(let [j,e] of s.events.entries()){
  assert(e.snapshot.pokemon.filter(p=>p.status==='active').length<=6);assert(e.snapshot.seen.every(x=>D.species[x.id]));
  if(!e.battle)continue;battles++;let b=e.battle;assert(b.duels.length>=1&&b.duels.length<=3);assert.equal(b.wins,b.duels.filter(d=>d.won).length);assert.equal(b.losses,b.duels.filter(d=>!d.won).length);assert.equal(b.result,b.wins>b.losses?'win':b.wins<b.losses?'loss':'draw');assert.equal(new Set(b.duels.map(d=>d.uid)).size,b.duels.length);
  for(let d of b.duels){duels++;if(d.won)wins++;else losses++;assert(d.xp>=(d.won?5:2)&&d.xp<=(d.won?8:4));let p=e.snapshot.pokemon.find(p=>p.uid===d.uid);assert(p&&p.status==='active'&&p.id===d.player.id);assert(D.species[d.opponent.id]);xp[d.uid]=(xp[d.uid]||0)+d.xp;assert.equal(p.battleXP,xp[d.uid]);assert(e.snapshot.seen.some(x=>x.id===d.opponent.id));}
  if(s.events[j+1]?.kind==='evolution'&&s.events[j+1].date===e.date)post++;
 }
 for(let p of s.pokemon)assert.equal(p.battleXP,xp[p.uid]||0);
}
assert(battles&&wins&&losses&&post);console.log({battles,duels,wins,losses,postBattleEvolutions:post});
