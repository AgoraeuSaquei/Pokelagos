const assert=require('node:assert/strict'),D=require('./data'),E=require('./engine');
let stats={histories:500,gym:0,awards:0,rematches:0,rival:0,league:0,champions:0,turnDuels:0},sample;
for(const g of D.gyms)for(const id of g.team)assert.equal(D.species[id].type,g.type);
for(let i=0;i<stats.histories;i++){
 const input={name:'Liga '+i,birth:'1980-01-01',cityId:D.cities[i%10].id,personality:'competitive',asOf:'2026-11-25'},s=E.simulate(input);let badgeIds=new Set(),attempts={},rivalRec={},leagueStage=0;
 for(let e of s.events){let b=e.battle;if(b){
   if(b.mode==='gym'){stats.gym++;assert.equal(e.city,b.gymId);assert.equal(b.previous,attempts[b.gymId]||0);attempts[b.gymId]=(attempts[b.gymId]||0)+1;if(b.previous)stats.rematches++;assert(!badgeIds.has(b.gymId));if(b.award){assert.equal(b.result,'win');assert.equal(b.award.id,b.gymId);badgeIds.add(b.award.id);stats.awards++;}else assert.notEqual(b.result,'win');}
   if(b.mode==='rival'){stats.rival++;assert.equal(b.previous,rivalRec[b.rivalId]||0);rivalRec[b.rivalId]=(rivalRec[b.rivalId]||0)+1;let r=e.snapshot.rivals.find(x=>x.id===b.rivalId);assert.equal(r.name,b.rival);assert(b.duels.every((d,j)=>d.opponent.id===r.team[j].id));}
   if(b.mode==='league'){stats.league++;assert.equal(badgeIds.size,8);assert.equal(b.leagueStage,leagueStage);leagueStage=b.result==='win'?leagueStage+1:b.result==='loss'?0:leagueStage;}
   for(let d of b.duels)if(d.turns){stats.turnDuels++;assert.equal(d.turns[0].player,100);assert.equal(d.turns[0].opponent,100);assert.equal(d.turns.at(-1)[d.won?'opponent':'player'],0);assert(d.turns.at(-1)[d.won?'player':'opponent']>0);for(let j=1;j<d.turns.length;j++){assert(d.turns[j].player<=d.turns[j-1].player);assert(d.turns[j].opponent<=d.turns[j-1].opponent);}}
 }assert.deepEqual(e.snapshot.badges.map(x=>x.id),[...badgeIds]);assert.equal(e.snapshot.league.stage,leagueStage);assert.equal(e.snapshot.league.champion,leagueStage===5);}
 assert.equal(s.badges.length,badgeIds.size);assert.equal(s.league.champion,leagueStage===5);if(s.league.champion){stats.champions++;if(!sample)sample={input,firstGym:s.events.find(e=>e.battle?.mode==='gym').id,award:s.events.find(e=>e.battle?.award).id,last:s.events.at(-1).id};}
}
assert(stats.awards&&stats.rematches&&stats.rival&&stats.league&&stats.champions);console.log(stats);console.log(JSON.stringify(sample));
