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
const data={regionalForms,fossilSpecies,mapPoints,mapRoutes,festivals,locals,expeditions,objects,newsModels,touristOrigins,gyms,elite,habitats,cities,species,edges,myths,personalities,traits,careers,world}; if(typeof module!=='undefined')module.exports=data;else root.DC_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this);
