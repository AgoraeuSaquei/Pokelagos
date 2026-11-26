(function(root){
'use strict';
const habitats={costa:'Costões e praias',mar:'Mar aberto',recife:'Recifes',lagoa:'Lagoas',rio:'Rios e córregos',mata:'Mata Atlântica',restinga:'Restinga',urbano:'Área urbana',rural:'Campos rurais',morro:'Morros e trilhas',caverna:'Cavernas',salina:'Salinas',noturno:'Ambientes noturnos',brejo:'Brejos',externo:'Regiões distantes'};
const cities=[
 ['buzios','Armação dos Búzios','Entre o mar e as trilhas','costa:30,restinga:24,urbano:16,morro:12,mar:10,recife:8','Praia da Ferradura|João Fernandes|Ponta da Lagoinha|Praia da Tartaruga|Geribá|Orla Bardot|Trilha das Emerências|Praia Brava','costa'],
 ['cabo-frio','Cabo Frio','O encontro do comércio com o mar','urbano:27,costa:25,lagoa:14,restinga:12,mar:10,recife:8,salina:4','Canal do Itajuru|Praia do Forte|Ilha do Japonês|Peró|Dunas|Passagem|Praia das Conchas|Gamboa','urbano'],
 ['arraial','Arraial do Cabo','Horizontes de águas profundas','mar:35,recife:24,costa:20,restinga:9,morro:7,urbano:5','Pontal do Atalaia|Praia do Forno|Praia Grande|Praia dos Anjos|Ilha do Farol|Prainha|Trilha do Forno|Ponta da Cabeça','mar'],
 ['aldeia','São Pedro da Aldeia','Entre a lagoa e os campos','lagoa:31,rural:25,urbano:15,brejo:11,restinga:10,rio:8','Praia do Sudoeste|Praia da Baleia|Centro|Praia do Sol|Ponta do Ambrósio|Campo Redondo|Baixo Grande|Serra de Sapiatiba','rural'],
 ['araruama','Araruama','A terra das águas salgadas','lagoa:32,salina:25,rural:15,urbano:12,restinga:10,brejo:6','Lagoa de Araruama|Praia Seca|Pontinha|Iguabinha|Parque de Ponte dos Leites|Morro Grande|Centro|Praia do Hospício','salina'],
 ['iguaba','Iguaba Grande','Dias tranquilos à beira da lagoa','lagoa:35,rural:23,restinga:17,urbano:13,brejo:12','Orla de Iguaba|Praia de Iguabinha (arredores)|Ponta da Farinha|Centro|Estação de Iguaba|Trilhas da lagoa|Campos do interior|Margens da lagoa','lagoa'],
 ['saquarema','Saquarema','Ondas, lagoas e espírito esportivo','costa:30,lagoa:23,mar:14,morro:12,restinga:11,rural:10','Itaúna|Vila|Lagoa de Saquarema|Jaconé|Barra Nova|Bacaxá|Praia de Vilatur|Morro da Cruz','costa'],
 ['rio-ostras','Rio das Ostras','Pedras, lagoas e festivais','costa:28,urbano:23,restinga:19,lagoa:12,mar:10,rio:8','Costa Azul|Praça da Baleia|Lagoa de Iriry|Praia da Tartaruga|Praia do Cemitério|Boca da Barra|Centro|Praia Virgem','costa'],
 ['silva','Silva Jardim','O coração verde da região ampliada','mata:42,rio:19,rural:15,morro:11,brejo:9,caverna:4','Poço das Antas (entorno)|Lagoa de Juturnaíba|Aldeia Velha|Correntezas|Centro|Gaviões|Bananeiras|Trilhas da mata','mata'],
 ['casimiro','Casimiro de Abreu','Rios e caminhos da floresta','mata:31,rio:25,rural:18,morro:12,brejo:8,urbano:6','Barra de São João|Rio São João|Centro|Professor Souza|Rio Dourado|Trilhas do interior|Campos do vale|Margens do rio','rio']
].map(([id,name,tag,weights,places,primary])=>({id,name,tag,weights:Object.fromEntries(weights.split(',').map(s=>{let [k,v]=s.split(':');return [k,+v]})),places:places.split('|'),primary}));
// Cada linha: habitats | raridade de base | tipo principal narrativo | cadeia (ramificações com /). IDs da Pokédex nacional.
const families=`
costa,mar,recife|c|água|278 Wingull>279 Pelipper
costa,lagoa,recife|c|água|98 Krabby>99 Kingler
recife,costa|u|água|222 Corsola
recife,mar|u|água|120 Staryu>121 Starmie
recife,mar|u|água|116 Horsea>117 Seadra>230 Kingdra
mar,costa|u|água|963 Finizen>964 Palafin
mar,recife|r|água|131 Lapras
mar,recife|u|água|170 Chinchou>171 Lanturn
mar,recife|u|água|458 Mantyke>226 Mantine
recife,mar|u|água|366 Clamperl>367 Huntail/368 Gorebyss
mar|u|água|320 Wailmer>321 Wailord
mar,recife|u|água|72 Tentacool>73 Tentacruel
mar,recife|u|água|90 Shellder>91 Cloyster
mar,recife|r|água|211 Qwilfish
costa,recife|u|água|688 Binacle>689 Barbaracle
costa,recife|u|água|767 Wimpod>768 Golisopod
mar,recife|r|água|746 Wishiwashi
mar,recife|u|água|456 Finneon>457 Lumineon
mar,recife|u|água|370 Luvdisc
mar,recife|u|água|223 Remoraid>224 Octillery
mar,recife|r|água|369 Relicanth
mar,recife|u|água|194 Wooper>195 Quagsire
lagoa,rio,mar|c|água|129 Magikarp>130 Gyarados
lagoa,rio|c|água|54 Psyduck>55 Golduck
lagoa,rio,brejo|c|água|60 Poliwag>61 Poliwhirl>62 Poliwrath/186 Politoed
lagoa,brejo|c|água|270 Lotad>271 Lombre>272 Ludicolo
lagoa,rio|c|água|580 Ducklett>581 Swanna
lagoa,rio,costa|c|água|418 Buizel>419 Floatzel
lagoa,rio,costa|u|água|7 Squirtle>8 Wartortle>9 Blastoise
lagoa,rio|u|água|158 Totodile>159 Croconaw>160 Feraligatr
lagoa,rio|u|água|258 Mudkip>259 Marshtomp>260 Swampert
lagoa,brejo|u|água|393 Piplup>394 Prinplup>395 Empoleon
lagoa,rio|u|água|501 Oshawott>502 Dewott>503 Samurott
lagoa,rio|u|água|656 Froakie>657 Frogadier>658 Greninja
costa,mar|u|água|728 Popplio>729 Brionne>730 Primarina
lagoa,rio|u|água|816 Sobble>817 Drizzile>818 Inteleon
lagoa,urbano|u|água|912 Quaxly>913 Quaxwell>914 Quaquaval
lagoa,brejo|u|água|349 Feebas>350 Milotic
lagoa,rio|u|água|535 Tympole>536 Palpitoad>537 Seismitoad
lagoa,rio|u|água|341 Corphish>342 Crawdaunt
lagoa,recife|u|água|118 Goldeen>119 Seaking
lagoa,rio|u|água|339 Barboach>340 Whiscash
lagoa,costa|u|água|422 Shellos>423 Gastrodon
lagoa,brejo|u|água|283 Surskit>284 Masquerain
lagoa,brejo|u|água|751 Dewpider>752 Araquanid
lagoa,rio|r|dragão|147 Dratini>148 Dragonair>149 Dragonite
lagoa,brejo|c|voador|163 Hoothoot>164 Noctowl
mata,restinga|c|inseto|10 Caterpie>11 Metapod>12 Butterfree
mata,restinga|c|inseto|13 Weedle>14 Kakuna>15 Beedrill
mata,rural|c|inseto|265 Wurmple>266 Silcoon>267 Beautifly
mata,rural|c|inseto|268 Cascoon>269 Dustox
mata,restinga|c|planta|43 Oddish>44 Gloom>45 Vileplume/182 Bellossom
mata,rural|c|planta|69 Bellsprout>70 Weepinbell>71 Victreebel
mata,rural|c|planta|273 Seedot>274 Nuzleaf>275 Shiftry
mata,rural|c|planta|285 Shroomish>286 Breloom
mata,rural|c|planta|187 Hoppip>188 Skiploom>189 Jumpluff
mata,rural|c|planta|191 Sunkern>192 Sunflora
mata,restinga|u|planta|114 Tangela>465 Tangrowth
mata,rural|u|planta|357 Tropius
mata,rural|u|planta|1 Bulbasaur>2 Ivysaur>3 Venusaur
mata,rural|u|planta|152 Chikorita>153 Bayleef>154 Meganium
mata,morro|u|planta|252 Treecko>253 Grovyle>254 Sceptile
mata,rural|u|planta|387 Turtwig>388 Grotle>389 Torterra
mata,rural|u|planta|495 Snivy>496 Servine>497 Serperior
mata,rural|u|planta|650 Chespin>651 Quilladin>652 Chesnaught
mata,noturno|u|planta|722 Rowlet>723 Dartrix>724 Decidueye
mata,rural|u|planta|810 Grookey>811 Thwackey>812 Rillaboom
mata,urbano|u|planta|906 Sprigatito>907 Floragato>908 Meowscarada
mata,rural|u|planta|406 Budew>315 Roselia>407 Roserade
mata,rural|u|planta|546 Cottonee>547 Whimsicott
mata,rural|u|planta|548 Petilil>549 Lilligant
mata,rural|u|planta|669 Flabébé>670 Floette>671 Florges
mata,rural|u|planta|761 Bounsweet>762 Steenee>763 Tsareena
mata,restinga|u|inseto|123 Scyther>212 Scizor/900 Kleavor
mata,restinga|u|inseto|127 Pinsir
mata,restinga|u|inseto|214 Heracross
mata,rural|c|inseto|165 Ledyba>166 Ledian
mata,noturno|c|inseto|167 Spinarak>168 Ariados
mata,rural|c|inseto|401 Kricketot>402 Kricketune
mata,rural|c|inseto|540 Sewaddle>541 Swadloon>542 Leavanny
mata,restinga|c|inseto|664 Scatterbug>665 Spewpa>666 Vivillon
mata,restinga|u|inseto|736 Grubbin>737 Charjabug>738 Vikavolt
mata,restinga|u|inseto|742 Cutiefly>743 Ribombee
mata,rural|u|normal|287 Slakoth>288 Vigoroth>289 Slaking
mata,rural|c|normal|190 Aipom>424 Ambipom
mata,rural|c|normal|161 Sentret>162 Furret
mata,rural|c|normal|263 Zigzagoon>264 Linoone
mata,urbano|c|normal|16 Pidgey>17 Pidgeotto>18 Pidgeot
mata,rural|c|voador|21 Spearow>22 Fearow
mata,rural|c|voador|276 Taillow>277 Swellow
mata,rural|c|voador|396 Starly>397 Staravia>398 Staraptor
urbano,costa|c|voador|519 Pidove>520 Tranquill>521 Unfezant
mata,restinga|c|voador|661 Fletchling>662 Fletchinder>663 Talonflame
mata,rural|c|voador|821 Rookidee>822 Corvisquire>823 Corviknight
mata,rural|u|voador|177 Natu>178 Xatu
mata,restinga|u|elétrico|172 Pichu>25 Pikachu>26 Raichu
mata,urbano|u|elétrico|587 Emolga
urbano,rural|c|normal|52 Meowth>53 Persian
urbano,rural|c|normal|19 Rattata>20 Raticate
urbano,rural|c|normal|506 Lillipup>507 Herdier>508 Stoutland
urbano,rural|c|normal|133 Eevee>134 Vaporeon/135 Jolteon/136 Flareon/196 Espeon/197 Umbreon/470 Leafeon/471 Glaceon/700 Sylveon
urbano,rural|u|fogo|58 Growlithe>59 Arcanine
urbano,rural|u|fogo|37 Vulpix>38 Ninetales
rural,morro|u|fogo|77 Ponyta>78 Rapidash
rural,morro|u|fogo|4 Charmander>5 Charmeleon>6 Charizard
rural,morro|u|fogo|155 Cyndaquil>156 Quilava>157 Typhlosion
rural,morro|u|fogo|255 Torchic>256 Combusken>257 Blaziken
mata,morro|u|fogo|390 Chimchar>391 Monferno>392 Infernape
rural,urbano|u|fogo|498 Tepig>499 Pignite>500 Emboar
rural,urbano|u|fogo|653 Fennekin>654 Braixen>655 Delphox
urbano,rural|u|fogo|725 Litten>726 Torracat>727 Incineroar
rural,urbano|u|fogo|813 Scorbunny>814 Raboot>815 Cinderace
rural,urbano|u|fogo|909 Fuecoco>910 Crocalor>911 Skeledirge
urbano|c|elétrico|81 Magnemite>82 Magneton>462 Magnezone
urbano|u|elétrico|100 Voltorb>101 Electrode
urbano|u|elétrico|479 Rotom
urbano|c|veneno|88 Grimer>89 Muk
urbano|c|veneno|568 Trubbish>569 Garbodor
urbano|u|aço|599 Klink>600 Klang>601 Klinklang
urbano,noturno|u|fantasma|92 Gastly>93 Haunter>94 Gengar
urbano,noturno|u|fantasma|353 Shuppet>354 Banette
noturno,mata|u|fantasma|355 Duskull>356 Dusclops>477 Dusknoir
noturno,urbano|u|fantasma|425 Drifloon>426 Drifblim
noturno,caverna|u|fantasma|607 Litwick>608 Lampent>609 Chandelure
noturno,mata|u|fantasma|708 Phantump>709 Trevenant
noturno,restinga|u|fantasma|769 Sandygast>770 Palossand
urbano,noturno|u|psíquico|63 Abra>64 Kadabra>65 Alakazam
urbano,rural|u|psíquico|96 Drowzee>97 Hypno
mata,urbano|u|psíquico|280 Ralts>281 Kirlia>282 Gardevoir/475 Gallade
urbano,rural|u|fada|173 Cleffa>35 Clefairy>36 Clefable
urbano,rural|u|fada|174 Igglybuff>39 Jigglypuff>40 Wigglytuff
urbano,rural|u|fada|175 Togepi>176 Togetic>468 Togekiss
urbano,rural|u|normal|440 Happiny>113 Chansey>242 Blissey
rural,restinga|c|elétrico|179 Mareep>180 Flaaffy>181 Ampharos
rural,morro|c|elétrico|403 Shinx>404 Luxio>405 Luxray
rural,urbano|u|elétrico|309 Electrike>310 Manectric
rural|c|normal|241 Miltank
rural|c|normal|128 Tauros
rural|c|normal|427 Buneary>428 Lopunny
rural|c|normal|659 Bunnelby>660 Diggersby
rural|c|normal|831 Wooloo>832 Dubwool
rural|c|terra|749 Mudbray>750 Mudsdale
rural|c|normal|915 Lechonk>916 Oinkologne
rural|u|normal|216 Teddiursa>217 Ursaring>901 Ursaluna
rural|u|normal|446 Munchlax>143 Snorlax
morro,caverna|c|pedra|74 Geodude>75 Graveler>76 Golem
morro,caverna|u|pedra|95 Onix>208 Steelix
morro,caverna|u|aço|304 Aron>305 Lairon>306 Aggron
morro,restinga|c|pedra|744 Rockruff>745 Lycanroc
morro,caverna|c|terra|50 Diglett>51 Dugtrio
morro,caverna|c|lutador|66 Machop>67 Machoke>68 Machamp
morro,caverna|u|terra|111 Rhyhorn>112 Rhydon>464 Rhyperior
morro,caverna|u|pedra|299 Nosepass>476 Probopass
morro,caverna|u|pedra|524 Roggenrola>525 Boldore>526 Gigalith
morro,restinga|u|pedra|557 Dwebble>558 Crustle
salina,morro|u|pedra|932 Nacli>933 Naclstack>934 Garganacl
salina,restinga|c|terra|27 Sandshrew>28 Sandslash
salina,restinga|u|terra|328 Trapinch>329 Vibrava>330 Flygon
salina,costa|u|voador|973 Flamigo
morro,caverna|r|dragão|371 Bagon>372 Shelgon>373 Salamence
morro,caverna|r|dragão|443 Gible>444 Gabite>445 Garchomp
morro,caverna|r|pedra|246 Larvitar>247 Pupitar>248 Tyranitar
caverna,noturno|c|veneno|41 Zubat>42 Golbat>169 Crobat
caverna,noturno|c|psíquico|527 Woobat>528 Swoobat
caverna,noturno|u|voador|714 Noibat>715 Noivern
caverna,morro|u|aço|374 Beldum>375 Metang>376 Metagross
mata,morro|u|lutador|447 Riolu>448 Lucario
mata,morro|u|lutador|307 Meditite>308 Medicham
mata,morro|u|lutador|619 Mienfoo>620 Mienshao
mata,noturno|u|sombrio|198 Murkrow>430 Honchkrow
mata,noturno|u|sombrio|215 Sneasel>461 Weavile
mata,noturno|u|sombrio|228 Houndour>229 Houndoom
mata,noturno|u|sombrio|570 Zorua>571 Zoroark
brejo,mata|c|veneno|23 Ekans>24 Arbok
brejo,mata|u|veneno|336 Seviper
brejo,mata|u|veneno|451 Skorupi>452 Drapion
brejo,rio|u|veneno|453 Croagunk>454 Toxicroak
brejo,restinga|u|elétrico|595 Joltik>596 Galvantula
restinga,mata|u|normal|352 Kecleon
mata,morro|u|dragão|610 Axew>611 Fraxure>612 Haxorus
mata,rural|u|normal|115 Kangaskhan
mata,rural|u|normal|335 Zangoose
costa,mar|r|água|564 Tirtouga>565 Carracosta
morro,caverna|r|pedra|140 Kabuto>141 Kabutops
morro,caverna|r|pedra|138 Omanyte>139 Omastar
morro,caverna|r|pedra|142 Aerodactyl
externo|u|gelo|220 Swinub>221 Piloswine>473 Mamoswine
externo|u|gelo|361 Snorunt>362 Glalie/478 Froslass
externo|u|gelo|712 Bergmite>713 Avalugg

restinga,urbano,rural,noturno|c|sombrio|261 Poochyena>262 Mightyena
urbano,restinga,noturno|c|sombrio|509 Purrloin>510 Liepard
morro,mata,noturno|u|sombrio|302 Sableye
morro,restinga,mata|r|sombrio|359 Absol
noturno,mata,urbano|u|fantasma|200 Misdreavus>429 Mismagius
noturno,costa,recife|u|água|592 Frillish>593 Jellicent
morro,caverna|u|terra|622 Golett>623 Golurk
morro,restinga,rural|u|fogo|322 Numel>323 Camerupt
morro,restinga,salina|u|fogo|324 Torkoal
morro,caverna|u|fogo|218 Slugma>219 Magcargo
rural,restinga,morro|u|fogo|631 Heatmor
rural,morro,restinga|u|fogo|554 Darumaka>555 Darmanitan
morro,restinga|u|fogo|240 Magby>126 Magmar>467 Magmortar
morro,caverna,costa|u|pedra|837 Rolycoly>838 Carkol>839 Coalossal
morro,costa|u|pedra|774 Minior
externo|u|gelo|459 Snover>460 Abomasnow
externo|u|gelo|872 Snom>873 Frosmoth
externo|u|gelo|225 Delibird
`.trim();
const species={}, edges={};
for(const line of families.split('\n').filter(Boolean)){const [hs,r,type,chain]=line.split('|'); let prev=[]; for(const stage of chain.split('>')){let ids=[];for(let token of stage.split('/')){let m=token.trim().match(/^(\d+) (.+)$/);if(!m)continue;let id=+m[1], name=m[2];if(!species[id])species[id]={id,name,type,habitats:hs.split(','),rarity:r,stage:prev.length?1:0,legend:false};ids.push(id);}for(const p of prev){edges[p]=[...new Set([...(edges[p]||[]),...ids])];}prev=ids;}}
// Correções e regras específicas; ramos não são sorteados como etapas sequenciais.
species[664]={id:664,name:'Scatterbug',type:'inseto',habitats:['mata','restinga'],rarity:'c',stage:0,legend:false};edges[664]=[665];species[665].stage=1; species[352]={id:352,name:'Kecleon',type:'normal',habitats:['restinga','mata'],rarity:'u',stage:0,legend:false};edges[265]=[266,268];edges[266]=[267];edges[268]=[269];species[268].stage=1;species[194].habitats=['lagoa','rio','brejo'];species[195].habitats=species[194].habitats;
const myths=[ [249,'Lugia','psíquico','mar','O Guardião do Atlântico','arraial'],[251,'Celebi','psíquico','mata','O Espírito da Mata','silva',true],[245,'Suicune','água','lagoa','O Purificador das Lagoas','araruama'],[145,'Zapdos','elétrico','costa','O Senhor das Tempestades','cabo-frio'],[385,'Jirachi','aço','morro','A Estrela dos Desejos','buzios',true],[151,'Mew','psíquico','mata','O Viajante Invisível','casimiro',true],[380,'Latias','dragão','costa','A Sombra sobre as Velas','buzios'],[381,'Latios','dragão','mar','A Luz do Horizonte','rio-ostras'],[144,'Articuno','gelo','mar','O Vento Impossível','arraial'],[146,'Moltres','fogo','morro','A Chama no Horizonte','saquarema'],[490,'Manaphy','água','recife','O Príncipe das Correntes','arraial',true],[492,'Shaymin','planta','rural','O Jardim que Renasce','aldeia',true],[243,'Raikou','elétrico','rural','O Trovão dos Campos','iguaba'],[244,'Entei','fogo','morro','O Rugido das Serras','casimiro'] ];
for(const [id,name,type,h,title,city,mythic] of myths)species[id]={id,name,type,habitats:[h],rarity:'x',stage:0,legend:!mythic,mythic:!!mythic,title,city};
const personalities=['leal','curioso','reservado','brincalhão','protetor','independente','paciente','teimoso','afetuoso','observador','tranquilo','ousado','desconfiado','gentil','competitivo','sensível','sociável','sonhador','disciplinado','aventureiro','cuidadoso','travesso','orgulhoso','calmo','inquieto'];
const traits=['coragem','empatia','curiosidade','disciplina','competitividade','sociabilidade','aventura','paciencia'];
const careers=[['Pesquisador marinho','curiosidade','mar'],['Guardião ambiental','empatia','mata'],['Criador Pokémon','paciencia','rural'],['Treinador competitivo','competitividade','urbano'],['Guia de trilhas','aventura','morro'],['Cuidador Pokémon','empatia','urbano'],['Pescador artesanal','paciencia','lagoa'],['Fotógrafo de natureza','curiosidade','restinga'],['Coordenador Pokémon','sociabilidade','urbano'],['Comerciante','sociabilidade','urbano'],['Professor','disciplina','urbano'],['Mergulhador','coragem','mar'],['Guarda costeiro','coragem','costa'],['Artista','curiosidade','urbano'],['Agricultor','paciencia','rural'],['Técnico de laboratório','disciplina','urbano'],['Barqueiro','aventura','lagoa'],['Veterinário Pokémon','empatia','urbano'],['Atleta regional','competitividade','costa'],['Restaurador de habitats','empatia','brejo'],['Cartógrafo','aventura','morro'],['Bibliotecário','paciencia','urbano'],['Organizador de festivais','sociabilidade','urbano'],['Mecânico','disciplina','urbano'],['Educador ambiental','empatia','mata'],['Observador de aves','curiosidade','restinga'],['Cozinheiro','sociabilidade','urbano'],['Apicultor Pokémon','paciencia','rural'],['Escritor','curiosidade','urbano'],['Trabalhador independente','disciplina','urbano']];
const world=[ [1998,'arraial','Migração de Lapras','Uma passagem de Lapras mobilizou pescadores e pesquisadores.'],[2004,'cabo-frio','Laboratório do Canal','O laboratório abriu suas portas para visitantes.'],[2009,'buzios','Festival dos Companheiros','Moradores celebraram os vínculos entre humanos e Pokémon.'],[2013,'arraial','O mistério das águas','Relatos de uma silhueta no mar dividiram opiniões.'],[2017,'saquarema','Copa das Ondas','Uma competição regional reuniu jovens de toda a costa.'],[2022,'silva','Expedição da Mata','Pesquisadores organizaram uma semana de observação ambiental.'],[2026,'araruama','Festival das Lagoas','Uma celebração regional reuniu criadores e comunidades.'] ];
const institutions={buzios:['Observatório dos Costões','Clube de Exploradores da Península','Festival dos Companheiros'], 'cabo-frio':['Laboratório do Canal','Arena do Forte','Centro de Intercâmbio Pokémon'],arraial:['Instituto das Correntes','Estação de Resgate Marinho','Expedição anual do Farol'],aldeia:['Escola de Criadores','Viveiro das Lagoas','Feira de Ovos e Filhotes'],araruama:['Instituto das Águas Salgadas','Estação das Salinas','Festival das Lagoas'],iguaba:['Casa de Acolhimento da Lagoa','Centro de Criadores','Encontro da Orla'],saquarema:['Arena das Ondas','Escola de Surf Pokémon','Copa das Ondas'],'rio-ostras':['Observatório de Aves Costeiras','Clube dos Viajantes','Festival da Costa'],silva:['Instituto Guardiões da Mata','Estação de Monitoramento','Expedição da Mata'],casimiro:['Escola do Rio São João','Posto de Resgate Florestal','Encontro dos Rios']}; for(const c of cities)c.institutions=institutions[c.id]; const gyms=[
 ['buzios','Marina','água','Marés',[278,418,121,131]],['cabo-frio','Victor','elétrico','Farol',[81,25,181,405]],['arraial','Célia','gelo','Profundezas',[361,220,362,713]],['silva','Gael','planta','Mata',[285,153,286,407]],['araruama','Augusto','pedra','Sal',[932,74,95,934]],['saquarema','Raul','lutador','Ondas',[66,447,67,448]],['aldeia','Helena','voador','Céus',[396,276,164,398]],['rio-ostras','Íris','psíquico','Mente',[63,280,97,282]]
].map(([city,leader,type,badge,team],i)=>({id:city,city,leader,type,badge:'Insígnia das '+badge,team,order:i}));
for(const g of gyms)if(['Farol','Sal'].some(x=>g.badge.endsWith(x)))g.badge=g.badge.replace('das ','do ');else if(g.badge.endsWith('Mata')||g.badge.endsWith('Mente'))g.badge=g.badge.replace('das ','da ');else if(g.badge.endsWith('Céus'))g.badge=g.badge.replace('das ','dos ');
const elite=[['Dante','fantasma',[94,477,609]],['Aurora','fogo',[59,157,392]],['Cássio','aço',[306,376,601]],['Serena','dragão',[149,373,445]],['Campeã Lívia','misto',[350,448,248]]].map(([leader,type,team],i)=>({leader,type,team,id:'elite-'+i}));

// V1.5: conteúdo original, não histórico real. Mapa esquemático em coordenadas de desenho.
const mapPoints={buzios:[83,34],'cabo-frio':[66,52],arraial:[69,76],aldeia:[49,48],araruama:[27,59],iguaba:[39,50],saquarema:[12,77],'rio-ostras':[89,9],silva:[15,14],casimiro:[52,17]};
const mapRoutes=[['saquarema','araruama'],['araruama','iguaba'],['iguaba','aldeia'],['aldeia','cabo-frio'],['cabo-frio','arraial'],['cabo-frio','buzios'],['buzios','rio-ostras'],['rio-ostras','casimiro'],['casimiro','silva'],['silva','araruama'],['casimiro','aldeia']];
const festivals=[['buzios','Festival das Marés','costa'],['cabo-frio','Torneio de Verão','urbano'],['arraial','Expedição das Profundezas','mar'],['iguaba','Feira dos Criadores','rural'],['silva','Festival da Mata','mata'],['casimiro','Encontro Noturno','noturno'],['aldeia','Campeonato dos Céus','rural'],['araruama','Festival das Salinas','salina'],['rio-ostras','Feira das Descobertas','costa'],['saquarema','Campeonato das Ondas','costa'],['cabo-frio','Congresso Pokémon','urbano'],['buzios','Celebração dos Companheiros','costa']];
const locals=[['silva','Professor Aroeira',3,'curiosidade','Pesquisa florestal',1954],['arraial','Capitão Vicente',279,'aventura','Navegação e lendas',1948],['araruama','Dra. Catarina Salgado',142,'curiosidade','Fósseis e geologia',1972],['casimiro','Dona Celeste',43,'empatia','Acolhimento de selvagens',1958],['buzios','Bióloga Estela',171,'curiosidade','Conservação dos recifes',1980],['cabo-frio','Engenheiro Nilo',81,'disciplina','Tecnologia Pokémon',1977],['aldeia','Criadora Teresa',179,'paciencia','Criação e filhotes',1965],['iguaba','Veterinária Rosa',113,'empatia','Saúde Pokémon',1982],['saquarema','Atleta Breno',419,'competitividade','Esportes aquáticos',1987],['rio-ostras','Fotógrafa Luma',276,'aventura','Aves costeiras',1990]].filter(x=>species[x[2]]);
const expeditions=[['arraial','As correntes do Farol','mar',['água','elétrico'],'mapa-marinho'],['silva','As trilhas da mata','mata',['planta','inseto'],'caderno'],['aldeia','O segredo de Sapiatiba','morro',['pedra','terra','elétrico'],'fragmento'],['buzios','Entre os costões','costa',['água','pedra'],'concha'],['araruama','Cristais das salinas','salina',['pedra','terra'],'cristal'],['casimiro','O caminho do rio','rio',['água','planta'],'mapa-rio'],['cabo-frio','O canal ao amanhecer','lagoa',['água','voador'],'bussola'],['iguaba','Aves da lagoa','lagoa',['voador','planta'],'pena'],['saquarema','Além das ondas','mar',['água','voador'],'mapa-marinho'],['rio-ostras','Sinais nos recifes','recife',['água','elétrico'],'concha']];
const objects=[['fire-stone','Pedra de Fogo','fire-stone'],['water-stone','Pedra da Água','water-stone'],['thunder-stone','Pedra do Trovão','thunder-stone'],['leaf-stone','Pedra da Folha','leaf-stone'],['moon-stone','Pedra da Lua','moon-stone'],['sun-stone','Pedra do Sol','sun-stone'],['shiny-stone','Pedra Brilhante','shiny-stone'],['dusk-stone','Pedra do Crepúsculo','dusk-stone'],['dawn-stone','Pedra do Despertar','dawn-stone'],['ice-stone','Pedra de Gelo','ice-stone'],['mapa-marinho','Carta náutica',''],['caderno','Caderno de campo',''],['fragmento','Fragmento mineral','hard-stone'],['concha','Concha das marés','shell-bell'],['cristal','Cristal de sal',''],['mapa-rio','Mapa do rio',''],['bussola','Bússola antiga',''],['pena','Pena de lembrança','pretty-wing'],['sino','Sino da Amizade','soothe-bell'],['escama','Escama de Dragão','dragon-scale'],['ambar','Âmbar Antigo','old-amber'],['vara','Vara de pesca','old-rod'],['kings-rock','Pedra do Rei','kings-rock'],['metal-coat','Revestimento Metálico','metal-coat'],['deep-sea-tooth','Dente do Mar','deep-sea-tooth'],['deep-sea-scale','Escama do Mar','deep-sea-scale'],['protector','Protetor','protector'],['electirizer','Eletrizador','electirizer'],['magmarizer','Magmarizador','magmarizer'],['reaper-cloth','Tecido do Ceifador','reaper-cloth'],['oval-stone','Pedra Oval','oval-stone'],['razor-claw','Garra Afiada','razor-claw'],['peat-block','Bloco de Turfa','peat-block'],['black-augurite','Augurite Negra','black-augurite']].map(([id,name,sprite])=>({id,name,sprite}));
const newsModels=[['Uma nova expedição','Pesquisadores convidam voluntários para registrar espécies e preservar os habitats.','pesquisa'],['Rotas de migração','Observadores relatam mudanças na movimentação dos Pokémon da região.','natureza'],['Uma feira de intercâmbio','Criadores e viajantes apresentarão companheiros de outras regiões.','troca'],['Torneio entre cidades','Treinadores se reúnem para uma disputa amistosa, aberta ao público.','competição'],['Um novo abrigo','Voluntários ampliam o acolhimento de Pokémon em recuperação.','natureza'],['Descobertas no litoral','Equipes de campo registram novos comportamentos de espécies conhecidas.','pesquisa'],['Aulas abertas','Especialistas oferecem oficinas de convivência e cuidados com Pokémon.','pesquisa'],['Festival de companheiros','Visitantes celebram vínculos, apresentam histórias e trocam lembranças.','festival'],['Mudanças no habitat','Guardiões acompanham o efeito das estações sobre espécies locais.','natureza'],['Viajantes chegam à região','Treinadores de longe compartilham experiências e propostas de intercâmbio.','troca'],['Recordes na arena','Uma competição local reúne veteranos e estreantes.','competição'],['Caminhos reabertos','Guias organizam visitas a trilhas após ações de conservação.','natureza']];
const touristOrigins=[['Kanto',['urbano','morro','rural']],['Johto',['mata','noturno','rural']],['Hoenn',['externo','caverna','morro']],['Sinnoh',['externo','morro','caverna']],['Unova',['urbano','externo','rural']],['Kalos',['externo','rural','mata']],['Alola',['externo','recife','morro']],['Galar',['externo','rural','urbano']],['Paldea',['externo','morro','rural']]];

// Form IDs follow the PokéAPI sprite catalog. These are visitor species, not native encounters.
const regionalForms=[[10101,'Sandshrew de Alola','gelo',0,27,10102],[10102,'Sandslash de Alola','gelo',1,28,null],[10103,'Vulpix de Alola','gelo',0,37,10104],[10104,'Ninetales de Alola','gelo',1,38,null],[10105,'Diglett de Alola','terra',0,50,10106],[10106,'Dugtrio de Alola','terra',1,51,null],[10107,'Meowth de Alola','sombrio',0,52,10108],[10108,'Persian de Alola','sombrio',1,53,null]];
for(const [id,name,type,stage,base,next] of regionalForms){species[id]={id,name,type,stage,base,form:'Alola',habitats:['externo'],rarity:'r',legend:false};if(next)edges[id]=[next];}
// Regional ecological refinements: existing habitats remain, new ones are plausible microhabitats.
const habitatExtensions={37:['restinga','morro'],38:['restinga','morro'],58:['restinga','morro'],59:['restinga','morro'],77:['restinga'],78:['restinga'],74:['costa','restinga'],75:['costa','restinga'],76:['costa','restinga'],299:['costa','salina'],476:['costa','salina'],524:['costa','salina'],525:['costa','salina'],526:['costa','salina'],557:['costa','salina'],558:['costa','salina'],932:['costa'],933:['costa'],934:['costa'],744:['costa'],745:['costa'],228:['restinga','morro','rural'],229:['restinga','morro','rural'],198:['urbano','restinga'],430:['urbano','restinga'],769:['costa'],770:['costa'],353:['restinga'],354:['restinga'],570:['restinga'],571:['restinga']};
for(const [id,hs] of Object.entries(habitatExtensions))if(species[id])species[id].habitats=[...new Set([...species[id].habitats,...hs])];
// These branches require their appropriate evolution mechanisms in the engine.
const fossilSpecies=[138,140,142,564];
// Tipos atuais por espécie e forma: PokeAPI/pokeapi, data/v2/csv/pokemon_types.csv.
const canonicalTypes={"1":["planta","veneno"],"2":["planta","veneno"],"3":["planta","veneno"],"4":["fogo"],"5":["fogo"],"6":["fogo","voador"],"7":["água"],"8":["água"],"9":["água"],"10":["inseto"],"11":["inseto"],"12":["inseto","voador"],"13":["inseto","veneno"],"14":["inseto","veneno"],"15":["inseto","veneno"],"16":["normal","voador"],"17":["normal","voador"],"18":["normal","voador"],"19":["normal"],"20":["normal"],"21":["normal","voador"],"22":["normal","voador"],"23":["veneno"],"24":["veneno"],"25":["elétrico"],"26":["elétrico"],"27":["terra"],"28":["terra"],"35":["fada"],"36":["fada"],"37":["fogo"],"38":["fogo"],"39":["normal","fada"],"40":["normal","fada"],"41":["veneno","voador"],"42":["veneno","voador"],"43":["planta","veneno"],"44":["planta","veneno"],"45":["planta","veneno"],"50":["terra"],"51":["terra"],"52":["normal"],"53":["normal"],"54":["água"],"55":["água"],"58":["fogo"],"59":["fogo"],"60":["água"],"61":["água"],"62":["água","lutador"],"63":["psíquico"],"64":["psíquico"],"65":["psíquico"],"66":["lutador"],"67":["lutador"],"68":["lutador"],"69":["planta","veneno"],"70":["planta","veneno"],"71":["planta","veneno"],"72":["água","veneno"],"73":["água","veneno"],"74":["pedra","terra"],"75":["pedra","terra"],"76":["pedra","terra"],"77":["fogo"],"78":["fogo"],"81":["elétrico","aço"],"82":["elétrico","aço"],"88":["veneno"],"89":["veneno"],"90":["água"],"91":["água","gelo"],"92":["fantasma","veneno"],"93":["fantasma","veneno"],"94":["fantasma","veneno"],"95":["pedra","terra"],"96":["psíquico"],"97":["psíquico"],"98":["água"],"99":["água"],"100":["elétrico"],"101":["elétrico"],"111":["terra","pedra"],"112":["terra","pedra"],"113":["normal"],"114":["planta"],"115":["normal"],"116":["água"],"117":["água"],"118":["água"],"119":["água"],"120":["água"],"121":["água","psíquico"],"123":["inseto","voador"],"126":["fogo"],"127":["inseto"],"128":["normal"],"129":["água"],"130":["água","voador"],"131":["água","gelo"],"133":["normal"],"134":["água"],"135":["elétrico"],"136":["fogo"],"138":["pedra","água"],"139":["pedra","água"],"140":["pedra","água"],"141":["pedra","água"],"142":["pedra","voador"],"143":["normal"],"144":["gelo","voador"],"145":["elétrico","voador"],"146":["fogo","voador"],"147":["dragão"],"148":["dragão"],"149":["dragão","voador"],"151":["psíquico"],"152":["planta"],"153":["planta"],"154":["planta"],"155":["fogo"],"156":["fogo"],"157":["fogo"],"158":["água"],"159":["água"],"160":["água"],"161":["normal"],"162":["normal"],"163":["normal","voador"],"164":["normal","voador"],"165":["inseto","voador"],"166":["inseto","voador"],"167":["inseto","veneno"],"168":["inseto","veneno"],"169":["veneno","voador"],"170":["água","elétrico"],"171":["água","elétrico"],"172":["elétrico"],"173":["fada"],"174":["normal","fada"],"175":["fada"],"176":["fada","voador"],"177":["psíquico","voador"],"178":["psíquico","voador"],"179":["elétrico"],"180":["elétrico"],"181":["elétrico"],"182":["planta"],"186":["água"],"187":["planta","voador"],"188":["planta","voador"],"189":["planta","voador"],"190":["normal"],"191":["planta"],"192":["planta"],"194":["água","terra"],"195":["água","terra"],"196":["psíquico"],"197":["sombrio"],"198":["sombrio","voador"],"200":["fantasma"],"208":["aço","terra"],"211":["água","veneno"],"212":["inseto","aço"],"214":["inseto","lutador"],"215":["sombrio","gelo"],"216":["normal"],"217":["normal"],"218":["fogo"],"219":["fogo","pedra"],"220":["gelo","terra"],"221":["gelo","terra"],"222":["água","pedra"],"223":["água"],"224":["água"],"225":["gelo","voador"],"226":["água","voador"],"228":["sombrio","fogo"],"229":["sombrio","fogo"],"230":["água","dragão"],"240":["fogo"],"241":["normal"],"242":["normal"],"243":["elétrico"],"244":["fogo"],"245":["água"],"246":["pedra","terra"],"247":["pedra","terra"],"248":["pedra","sombrio"],"249":["psíquico","voador"],"251":["psíquico","planta"],"252":["planta"],"253":["planta"],"254":["planta"],"255":["fogo"],"256":["fogo","lutador"],"257":["fogo","lutador"],"258":["água"],"259":["água","terra"],"260":["água","terra"],"261":["sombrio"],"262":["sombrio"],"263":["normal"],"264":["normal"],"265":["inseto"],"266":["inseto"],"267":["inseto","voador"],"268":["inseto"],"269":["inseto","veneno"],"270":["água","planta"],"271":["água","planta"],"272":["água","planta"],"273":["planta"],"274":["planta","sombrio"],"275":["planta","sombrio"],"276":["normal","voador"],"277":["normal","voador"],"278":["água","voador"],"279":["água","voador"],"280":["psíquico","fada"],"281":["psíquico","fada"],"282":["psíquico","fada"],"283":["inseto","água"],"284":["inseto","voador"],"285":["planta"],"286":["planta","lutador"],"287":["normal"],"288":["normal"],"289":["normal"],"299":["pedra"],"302":["sombrio","fantasma"],"304":["aço","pedra"],"305":["aço","pedra"],"306":["aço","pedra"],"307":["lutador","psíquico"],"308":["lutador","psíquico"],"309":["elétrico"],"310":["elétrico"],"315":["planta","veneno"],"320":["água"],"321":["água"],"322":["fogo","terra"],"323":["fogo","terra"],"324":["fogo"],"328":["terra"],"329":["terra","dragão"],"330":["terra","dragão"],"335":["normal"],"336":["veneno"],"339":["água","terra"],"340":["água","terra"],"341":["água"],"342":["água","sombrio"],"349":["água"],"350":["água"],"352":["normal"],"353":["fantasma"],"354":["fantasma"],"355":["fantasma"],"356":["fantasma"],"357":["planta","voador"],"359":["sombrio"],"361":["gelo"],"362":["gelo"],"366":["água"],"367":["água"],"368":["água"],"369":["água","pedra"],"370":["água"],"371":["dragão"],"372":["dragão"],"373":["dragão","voador"],"374":["aço","psíquico"],"375":["aço","psíquico"],"376":["aço","psíquico"],"380":["dragão","psíquico"],"381":["dragão","psíquico"],"385":["aço","psíquico"],"387":["planta"],"388":["planta"],"389":["planta","terra"],"390":["fogo"],"391":["fogo","lutador"],"392":["fogo","lutador"],"393":["água"],"394":["água"],"395":["água","aço"],"396":["normal","voador"],"397":["normal","voador"],"398":["normal","voador"],"401":["inseto"],"402":["inseto"],"403":["elétrico"],"404":["elétrico"],"405":["elétrico"],"406":["planta","veneno"],"407":["planta","veneno"],"418":["água"],"419":["água"],"422":["água"],"423":["água","terra"],"424":["normal"],"425":["fantasma","voador"],"426":["fantasma","voador"],"427":["normal"],"428":["normal"],"429":["fantasma"],"430":["sombrio","voador"],"440":["normal"],"443":["dragão","terra"],"444":["dragão","terra"],"445":["dragão","terra"],"446":["normal"],"447":["lutador"],"448":["lutador","aço"],"451":["veneno","inseto"],"452":["veneno","sombrio"],"453":["veneno","lutador"],"454":["veneno","lutador"],"456":["água"],"457":["água"],"458":["água","voador"],"459":["planta","gelo"],"460":["planta","gelo"],"461":["sombrio","gelo"],"462":["elétrico","aço"],"464":["terra","pedra"],"465":["planta"],"467":["fogo"],"468":["fada","voador"],"470":["planta"],"471":["gelo"],"473":["gelo","terra"],"475":["psíquico","lutador"],"476":["pedra","aço"],"477":["fantasma"],"478":["gelo","fantasma"],"479":["elétrico","fantasma"],"490":["água"],"492":["planta"],"495":["planta"],"496":["planta"],"497":["planta"],"498":["fogo"],"499":["fogo","lutador"],"500":["fogo","lutador"],"501":["água"],"502":["água"],"503":["água"],"506":["normal"],"507":["normal"],"508":["normal"],"509":["sombrio"],"510":["sombrio"],"519":["normal","voador"],"520":["normal","voador"],"521":["normal","voador"],"524":["pedra"],"525":["pedra"],"526":["pedra"],"527":["psíquico","voador"],"528":["psíquico","voador"],"535":["água"],"536":["água","terra"],"537":["água","terra"],"540":["inseto","planta"],"541":["inseto","planta"],"542":["inseto","planta"],"546":["planta","fada"],"547":["planta","fada"],"548":["planta"],"549":["planta"],"554":["fogo"],"555":["fogo"],"557":["inseto","pedra"],"558":["inseto","pedra"],"564":["água","pedra"],"565":["água","pedra"],"568":["veneno"],"569":["veneno"],"570":["sombrio"],"571":["sombrio"],"580":["água","voador"],"581":["água","voador"],"587":["elétrico","voador"],"592":["água","fantasma"],"593":["água","fantasma"],"595":["inseto","elétrico"],"596":["inseto","elétrico"],"599":["aço"],"600":["aço"],"601":["aço"],"607":["fantasma","fogo"],"608":["fantasma","fogo"],"609":["fantasma","fogo"],"610":["dragão"],"611":["dragão"],"612":["dragão"],"619":["lutador"],"620":["lutador"],"622":["terra","fantasma"],"623":["terra","fantasma"],"631":["fogo"],"650":["planta"],"651":["planta"],"652":["planta","lutador"],"653":["fogo"],"654":["fogo"],"655":["fogo","psíquico"],"656":["água"],"657":["água"],"658":["água","sombrio"],"659":["normal"],"660":["normal","terra"],"661":["normal","voador"],"662":["fogo","voador"],"663":["fogo","voador"],"664":["inseto"],"665":["inseto"],"666":["inseto","voador"],"669":["fada"],"670":["fada"],"671":["fada"],"688":["pedra","água"],"689":["pedra","água"],"700":["fada"],"708":["fantasma","planta"],"709":["fantasma","planta"],"712":["gelo"],"713":["gelo"],"714":["voador","dragão"],"715":["voador","dragão"],"722":["planta","voador"],"723":["planta","voador"],"724":["planta","fantasma"],"725":["fogo"],"726":["fogo"],"727":["fogo","sombrio"],"728":["água"],"729":["água"],"730":["água","fada"],"736":["inseto"],"737":["inseto","elétrico"],"738":["inseto","elétrico"],"742":["inseto","fada"],"743":["inseto","fada"],"744":["pedra"],"745":["pedra"],"746":["água"],"749":["terra"],"750":["terra"],"751":["água","inseto"],"752":["água","inseto"],"761":["planta"],"762":["planta"],"763":["planta"],"767":["inseto","água"],"768":["inseto","água"],"769":["fantasma","terra"],"770":["fantasma","terra"],"774":["pedra","voador"],"810":["planta"],"811":["planta"],"812":["planta"],"813":["fogo"],"814":["fogo"],"815":["fogo"],"816":["água"],"817":["água"],"818":["água"],"821":["voador"],"822":["voador"],"823":["voador","aço"],"831":["normal"],"832":["normal"],"837":["pedra"],"838":["pedra","fogo"],"839":["pedra","fogo"],"872":["gelo","inseto"],"873":["gelo","inseto"],"900":["inseto","pedra"],"901":["terra","normal"],"906":["planta"],"907":["planta"],"908":["planta","sombrio"],"909":["fogo"],"910":["fogo"],"911":["fogo","fantasma"],"912":["água"],"913":["água"],"914":["água","lutador"],"915":["normal"],"916":["normal"],"932":["pedra"],"933":["pedra"],"934":["pedra"],"963":["água"],"964":["água"],"973":["voador","lutador"],"10101":["gelo","aço"],"10102":["gelo","aço"],"10103":["gelo"],"10104":["gelo","fada"],"10105":["terra","aço"],"10106":["terra","aço"],"10107":["sombrio"],"10108":["sombrio"]};
for(const p of Object.values(species)){p.ecologyType=p.type;p.types=canonicalTypes[p.id];p.type=p.types[0];}
const data={regionalForms,fossilSpecies,mapPoints,mapRoutes,festivals,locals,expeditions,objects,newsModels,touristOrigins,gyms,elite,habitats,cities,species,edges,myths,personalities,traits,careers,world}; if(typeof module!=='undefined')module.exports=data;else root.DC_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this);
