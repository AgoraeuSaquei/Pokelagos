# V2.1 — Imersão e Narrativa

Atualização editorial e visual. O motor e os dados são idênticos à V2.0.1; a versão do motor e as chaves de salvamento permanecem 2.0.1. O módulo `narrative.js` varia trechos conhecidos de modo determinístico, sem modificar eventos ou RNG. O diário, capítulos, biografias e principais textos de exportação usam a revisão; títulos históricos originais são mantidos nas referências. Local e estação são exibidos no capítulo; memórias vinculadas podem ser abertas e mudanças de equipe são mostradas após o acontecimento.

Abra `Destinos_da_Costa_v21.html` ou sirva `index.html` com os arquivos do pacote. `python build.py` recria o HTML autônomo. `node test-narrative.js` roda a auditoria; para comparar com a versão anterior, passe o caminho de seu `engine.js` como argumento. `RELATORIO_NARRATIVA.json` contém a amostra comparativa. A revisão reduz repetição literal, mas não elimina todas as frases recorrentes. A interface foi testada com Chromium, armazenamento simulado e rede externa bloqueada.

---

# V2.0.1 — Ecossistemas Vivos

- 507 registros de Pokémon, 32 novos. Expansão de espécies de Fogo, Pedra, Sombrio, Fantasma e Gelo. Os tipos exibidos continuam sendo o tipo principal simplificado do catálogo.
- Fenômenos ecológicos: vida noturna, onda de calor no verão, frente fria no inverno, maré baixa em costões, migrações no outono/primavera, tempestades elétricas e eclipse regional raro (calendário fictício, não astronômico).
- Cada condição altera o conjunto elegível e os pesos das espécies. Não há cotas obrigatórias por tipo; a diversidade tem um bônus moderado. A afinidade pessoal continua existindo. Nenhuma espécie lendária, mítica, forma regional ou fóssil foi acrescentada ao conjunto de encontros selvagens normais.
- Avistamentos e encontros narrativos utilizam o novo sistema. Trocas, presentes e incubação permanecem independentes, e as evoluções continuam verificadas individualmente a cada mês. Os cenários e animações da V2.0 foram mantidos.
- A chance shiny por encontro permanece 1/4096; a restauração e a criação mantêm suas regras. O calendário e as probabilidades são ficção de jogo.
- Nova versão do motor e novas chaves de armazenamento: as histórias antigas não são substituídas, mas a mesma pessoa poderá ter outra trajetória nesta versão. Não há migração automática de progresso. Os sprites novos dependem da rede, como os demais não incorporados.

## Verificação V2.0.1

`node test-ecology.js`: 60 perfis costeiros, comparação com a V2.0 quando esta estiver disponível na pasta irmã `destinos-v20`; condições elegíveis, continuidade em 10 perfis e validade das evoluções. A amostra registrou 888 Pokémon obtidos em cada versão; Água 294→230, Fogo 36→61, Pedra 61→93, Sombrio 9→48, Fantasma 15→45, Gelo 2→15. Evoluções 716→631 nesta amostra (composição e trajetórias diferentes), não por mudança na frequência das verificações. `node test-connected.js`: 60 individuais e 30 duplas; `node test-growth.js`: 80 perfis, 855 de 1164 Pokémon elegíveis evoluíram. `node test-visuals.js`: validações de planos visuais em 15 perfis e uma dupla. Não houve novo teste visual em navegador ou de rede externa nesta revisão.

Execute `python build.py` para gerar `Destinos_da_Costa_v201.html`. Abra o HTML único no navegador ou publique os arquivos estáticos do ZIP.

---

# Pokémon: Destinos da Costa — V2.0 · Pixel Art & Animações

## Novidades da V2.0

- 22 fundos originais de pixel art (320 × 168 px) incorporados ao HTML, sem rede: praias, litoral noturno, costões, mar, barco, lagoas, salinas, restinga, rios, brejos, mata, trilhas, campos, morros, ruínas, cidade, festival, Centro Pokémon, caverna, laboratório, arena e casa. O código escolhe um cenário por local e texto do acontecimento, com variações visuais de noite, chuva e neblina quando a narrativa as menciona. São ilustrações estilizadas, não mapas geográficos.
- Animações de evolução, captura, acolhimento, troca, eclosão e avistamento shiny. A evolução e a eclosão escondem a nova forma até a revelação. O resultado vem do motor existente; nenhuma captura, evolução ou troca é criada pela animação. Trocas compartilhadas também têm efeito visual.
- Animação automática uma vez por acontecimento na sessão. É possível pular, rever no mesmo capítulo ou desativar a reprodução automática pelo botão no cabeçalho. A preferência fica no armazenamento local. Respeita a opção de movimento reduzido do navegador/sistema.
- **Motor e dados idênticos à V1.7** (comparação binária). Mesmas regras, sementes, espécies e probabilidades. As chaves de armazenamento V1.7 são mantidas; a retomada depende do mesmo navegador/origem e de o armazenamento antigo estar acessível. Um arquivo HTML baixado em outro caminho pode ter armazenamento diferente.
- O HTML único contém o código e os fundos; o ZIP inclui fontes, PNGs, gerador `make_scenes.py` e testes. Os sprites Pokémon continuam vindos do repositório da PokéAPI, com os mesmos 11 sprites locais e fallback existente. Não há música nem efeitos sonoros nesta edição.

## Teste V2.0

`node test-visuals.js` valida a seleção de cenários e a correspondência de planos de animação com eventos reais. `python build.py` recria o HTML autossuficiente. Para regenerar fundos, `python make_scenes.py` requer Pillow apenas no desenvolvimento. O runtime é HTML/CSS/JS puro.

Verificado em Chromium com o conteúdo HTML carregado diretamente em memória, armazenamento simulado e rede externa bloqueada: captura, evolução, troca, batalha, troca compartilhada, pular/rever, preferência de animação e largura mobile. O acesso direto a `file://` foi bloqueado no ambiente de teste, assim como os sprites externos. O usuário pode abrir o HTML localmente ou publicar os arquivos estáticos. Nenhum teste de performance em dispositivo físico foi executado.

---

# Histórico e regras preservadas — V1.7

## Como jogar

- Abra `index.html` (mantenha os arquivos juntos) ou o HTML único distribuído separadamente. No GitHub Pages, publique os arquivos da raiz deste ZIP.
- **Minha jornada** gera uma biografia individual; **Destinos conectados** solicita dois treinadores e um tipo de relação. Romance só ocorre entre adultos e não é garantido. A opção destino livre privilegia amizades e encontros espontâneos.
- Leia capítulo por capítulo. Os dois times, a Pokédex, Liga, laços, mundo e caderno de mistérios mostram o estado já revelado. As batalhas apresentam o resultado em uma etapa separada; a ficha definitiva e exportação só são liberadas no final. A opção Próximo encontro resume os capítulos individuais até o próximo evento compartilhado; eles continuam acessíveis ao voltar e no diário final.
- Os dois modos têm chaves de armazenamento independentes. Os salvamentos antigos não são apagados nem migrados. Esta versão altera a seed e os resultados, por isso não reproduz as mesmas vidas da V1.5.1. Dentro da V1.7, os capítulos anteriores são preservados quando a data avança.
- Sem dependências de runtime, contas ou backend. Os sprites externos exigem conexão; alternativas locais e símbolos continuam disponíveis. Dados de identidade ficam no navegador.

## Mistérios

Ovos permanecem ocultos até a eclosão; um relógio mensal independente processa as incubações (45–210 dias até a data prevista, mais a espera até a próxima verificação). Criação entre companheiros utiliza famílias compatíveis selecionadas manualmente, não todas as regras oficiais; o filhote segue a família materna. Nascimentos podem repetir uma espécie já conhecida. A chance narrativa shiny é 1/4096 por nascimento, ou 1/1024 quando há um progenitor shiny. Fósseis passam por descoberta, pesquisa e restauração ou preservação científica, sem captura forçada. Há quatro espécies de fóssil selecionadas e oito formas de Alola (quatro famílias), disponíveis principalmente em intercâmbios com visitantes de Alola; não entram na fauna nativa. IDs de formas referenciados no catálogo público https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv. Três mistérios raros podem durar vários anos e permanecer sem resposta. As verificações mensais de evolução da V1.5.1 foram mantidas.

## Duas vidas sincronizadas

O motor usa checkpoints comuns no calendário e simula as duas pessoas em ordem cronológica. Eventos compartilhados modificam os dois estados antes da continuação individual. O modo conectado é um universo novo; os dados individuais de outras jornadas não são sobrescritos. A ordem dos dois perfis faz parte da experiência.

- Encontros, expedições, reencontros, resgates, oportunidades de receber ovos, avistamentos extraordinários, romance adulto (opcional), duelos e desafios de dupla.
- Trocas reais e recíprocas: o Pokémon sai do inventário ativo do antigo treinador, mantém seu registro de biografia e entra no inventário do novo. Apelido, personalidade, forma, shiny, sexo, disposição e experiência de desenvolvimento são preservados; o histórico de batalhas é separado por período com cada treinador. Evoluções simples por troca podem acontecer em capítulo separado. A equipe ativa respeita seis vagas.
- Afinidade e rivalidade entre Pokémon das duas equipes crescem em encontros específicos e podem influenciar o desempenho de duplas. Cada encontro registra as formas daquele instante, sem antecipar evoluções.
- As batalhas de duplas são dois confrontos narrativos paralelos, não um simulador tático oficial 2×2. O XP altera os estados reais e pode provocar evoluções. Não há controle manual de ações, genealogia humana completa ou simulação de casamento/família. A reprodução Pokémon e os fósseis são catálogos iniciais, não um sistema completo de todos os jogos oficiais.

## Testes

`node test-connected.js` — 60 jornadas individuais e 30 duplas (120 vidas), com validação de cronologia, snapshots sem informações futuras, estados das trocas, evoluções, duelos opostos, equipes de até seis, idade adulta para romance e estabilidade ao avançar a data. Amostra: 125 ovos e 125 eclosões (3 ovos de criação), 72 fósseis descobertos/54 restaurados, 46 investigações secretas/11 resolvidas; 647 memórias compartilhadas, 47 trocas, 111 duelos, 88 desafios de dupla. Não são garantias de probabilidade universal.

Testes de regressão executados durante a integração: `node test-smoke.js` (120), `node test-growth.js` (80), `node test-battles.js` (200), todos passaram. As suítes antigas continuam incluídas para execução adicional. Interface Chromium validada com HTML incorporado e armazenamento simulado; rede externa e navegação direta por file:// foram bloqueadas no ambiente. Largura mobile de 390px verificada sem rolagem horizontal.

## Histórico anterior

# Destinos da Costa — V1.5.1: Crescimento e Equilíbrio

## Atualização do motor de desenvolvimento

- O calendário de crescimento é independente do sorteio de acontecimentos. Cada ano de vida a partir dos cinco anos contém 12 verificações espaçadas, com uma seed por data, indivíduo e forma. Nenhuma tentativa fracassada cria capítulo extra. Uma evolução bem-sucedida gera um capítulo próprio.
- Pokémon ativos, em casa e no laboratório ganham pequenas quantidades de experiência, vínculo e confiança ao longo do tempo. Pokémon entregues ou libertados ficam de fora enquanto não pertencerem ao treinador. A equipe ativa não muda automaticamente após uma evolução.
- Espécies de desenvolvimento rápido (Caterpie, Weedle, Wurmple, Scatterbug, Kricketot e suas formas intermediárias) têm espera mínima de 30 dias por estágio. O perfil gradual tem espera mínima de 150/300 dias; famílias de desenvolvimento lento (Dratini, Larvitar, Bagon, Beldum, Gible e Axew) têm mínimos de 540/900 dias. São parâmetros narrativos, não níveis oficiais. O tempo mínimo não garante uma evolução.
- Cada participante de uma batalha recebe uma verificação independente ao fim do confronto, com experiência da forma atual e experiência de batalha. Não é necessário esperar o próximo sorteio narrativo. O vínculo e a disposição continuam relevantes; cerca de 14% dos indivíduos não têm disposição para evoluir. A experiência da forma reinicia ao evoluir, mas o histórico de EXP de batalha permanece intacto.
- Ramos evolutivos são filtrados por elegibilidade antes do sorteio. A base regional utiliza requisitos próprios: amizade, itens consumíveis, trocas temporárias, e condições narrativas especiais. Itens podem ser encontrados em um capítulo separado durante uma oportunidade de evolução; ficam registrados na mochila. Trocas permanentes continuam podendo provocar evoluções de espécies compatíveis. Mantyke exige um Remoraid sob os cuidados do treinador, por exemplo. As regras são adaptadas ao simulador; não são uma reprodução exaustiva das condições oficiais de todos os jogos.
- A identidade individual, shiny, apelido, vínculo, status e histórico permanecem após a transformação. Pokémon do laboratório podem evoluir e enviar notícias ao treinador.
- A seed e a chave de armazenamento são próprias da V1.5.1. Os salvamentos V1.5 não são sobrescritos nem importados automaticamente; novas histórias podem divergir da versão anterior. A continuidade dentro da V1.5.1 é preservada.

## Validação

`node test-growth.js`, `node test-smoke.js`, `node test-battles.js`, `node test-world.js`, `node test-league.js`, `node test-bonds.js`. A comparação com V1.5 é opcional e usa a pasta irmã `destinos-v15`, quando presente. O teste principal utiliza 80 perfis sintéticos e verifica evolução válida, estágio, cronologia, shiny, itens, disposição, status e biografia. As outras suítes verificam 120, 200, 150, 500 e 350 perfis respectivamente. A mesma pessoa pode ter resultados diferentes entre versões; a amostra mede distribuição, não uma probabilidade universal.

## Instalação

Abra o HTML único, ou extraia o ZIP e abra `index.html`. Para publicar no GitHub Pages, utilize os arquivos da raiz do ZIP. Sem instalação de dependências. Sprites remotos exigem conexão; esta versão não modifica o carregador de imagens.

---

# Destinos da Costa — V1.4: Laços e Memórias

## Abrir

Extraia o ZIP e abra `index.html` em um navegador moderno, ou abra o HTML único distribuído separadamente. Para GitHub Pages, publique todos os arquivos da raiz do ZIP. Nenhum servidor, pacote ou instalação é necessário. Os sprites externos exigem internet; os sprites locais e os fallbacks da V1.3 foram preservados.

## Novidades

- 12 modelos de arcos narrativos com requisitos próprios, começo, continuidade e desfechos alternativos. As etapas são registradas em datas reais da biografia e separadas por anos. Até três arcos podem ficar abertos simultaneamente; alguns permanecem sem conclusão na idade atual.
- As histórias podem nascer de uma promessa, uma investigação, um desafio, um encontro lendário já vivido, um companheiro ou uma dupla. Os arcos alteram traços, confiança, vínculo, experiência e memórias usadas na escolha de carreira.
- Relações entre pares de Pokémon são persistentes: afinidade e rivalidade de 0 a 100, convivência, amizade profunda, rivalidade amigável ou difícil, apoio e treino. Só se geram novas interações com companheiros que não foram libertados. A amizade entre membros ativos concede um pequeno bônus de até cinco pontos percentuais na chance narrativa de vencer, antes dos limites de equilíbrio. A convivência também pode contribuir com experiência para evolução.
- Biografias calculadas a partir dos registros efetivamente vividos: origem, personalidade, evolução, vitórias/derrotas, XP, feitos, memórias, vínculos, arcos, situação e confrontos ilustrados. Clique em um Pokémon no time durante a leitura ou abra Laços e Memórias; no final, há uma nova aba com os registros completos.
- Sem spoilers: arcos, relações e detalhes individuais usam o estado do capítulo revelado, não a equipe futura. Durante batalhas ainda não finalizadas, a biografia detalhada mostra o estado consolidado anterior ao confronto; XP parcial segue visível na equipe. A ficha final continua bloqueada até o último capítulo.
- Exportação textual inclui os novos registros. Os dados permanecem locais; a chave de salvamento e a seed são próprias da versão 1.4.0. Não importa biografias V1.3: mantenha a versão anterior para consultá-las.

## Testes desta versão

`node test.js`, `node test-battles.js`, `node test-league.js`, `node test-bonds.js`.

- 1.000 biografias de continuidade cronológica, 200 de batalhas e 500 de Liga, mais 350 para Laços e Memórias. As amostras são sintéticas; não representam probabilidades universais.
- Na amostra de 350: 2.352 arcos, 12 modelos observados, 923 arcos com duração observada de pelo menos dez anos, 3.563 pares de Pokémon com relações registradas, 4.607 eventos relacionais, 4.198 biografias verificadas no final e no primeiro encontro. 583 arcos ainda abertos, 1.569 cumpridos, 193 encerrados alternativamente e 7 interrompidos.
- Testes de interface em Chromium: abertura, ausência de spoilers no início, primeiro arco, relações, biografia, retomada, aba final e largura de 390px. O ambiente bloqueia navegação e rede; foram usados HTML incorporado e armazenamento simulado. Não foi validado o carregamento de sprites remotos nem armazenamento real via file://.

## Limites

Não há geração de texto por IA, escolhas manuais de história, mapa ilustrado, áudio ou histórias compartilhadas nesta versão. Os novos arcos e relações usam modelos escritos e combinados com o estado do motor. Pokémon e imagens pertencem aos respectivos titulares; projeto de fã não oficial.

---

## Histórico de versões (referência, não resultados da V1.4)

# Destinos da Costa — V1.3: A Liga das Lagoas

## Novidades desta versão

- Oito ginásios regionais com equipes por afinidade de tipo, líderes que mudam por época e insígnias originais em SVG.
- Desafios e revanche: a insígnia só é concedida após uma vitória, e cada ginásio registra tentativas, vitórias, derrotas e empates.
- As oito insígnias qualificam para a Liga; com pelo menos três Pokémon ativos, o treinador pode disputar quatro etapas da Elite e uma final. Derrotas reiniciam a campanha, empates permitem repetir a etapa. A conquista não é garantida.
- Até três rivais recorrentes por biografia, com equipes persistentes, crescimento e evoluções simulados quando reencontrados. As equipes mostradas são as conhecidas no último encontro.
- Batalhas importantes têm cinco momentos narrativos por duelo, com HP progressivo, sem revelar antecipadamente o resultado. Batalhas comuns permanecem rápidas. O HP é ilustrativo, determinado a partir do resultado da simulação; não é um cálculo de dano oficial nem um sistema de combate manual.
- Caixa de insígnias e rivais durante a leitura, limitada ao estado daquele capítulo; painel completo ao final.
- Motor 1.3.0 e chave de armazenamento próprios. A seed mudou; as histórias de versões antigas não são importadas. Mantenha a V1.2 para consultar sua versão anterior.

## Testes V1.3

Execute `node test.js`, `node test-battles.js` e `node test-league.js`.
- 1.000 biografias com verificação de continuidade até 2030 e invariantes da simulação.
- 200 biografias adicionais para XP e resultados de batalha; 3.173 batalhas e 6.332 duelos.
- 500 biografias adicionais, com perfil competitivo e 46 anos: 5.885 desafios de ginásio, 3.537 insígnias, 2.172 novas tentativas, 2.069 batalhas com rivais, 1.043 etapas da Liga e 18 campeões. A amostra competitiva não representa todos os usuários.
- Chromium: navegação direta file:// bloqueada pelo ambiente; teste via conteúdo HTML incorporado, armazenamento em memória e rede externa bloqueada. Verificados ausência de spoilers no início, HP, revelação de insígnia, painel final com oito insígnias, layout de 390px e ausência de exceções JS no fluxo testado. Sprites remotos continuam dependentes de internet.

As próximas versões (arcos narrativos, jornais, mapas, ovos com incubação, áudio e histórias compartilhadas) ainda não foram implementadas.

---

# Destinos da Costa — V1.2

## Atualização: jornada sem spoilers e batalhas

- Capítulos revelados em sequência; equipe, Pokédex e ficha final não antecipam o futuro.
- Batalhas narrativas de 1 a 3 duelos, placar progressivo e experiência individual. Vitórias concedem 5–8 EXP; derrotas, 2–4. Evoluções dependem de experiência, vínculo, vontade e requisitos simulados.
- O motor 1.2.0 usa uma nova seed: histórias V1.1 não são idênticas e não são importadas automaticamente. O progresso da V1.2 usa outra chave de armazenamento; iniciar nova jornada ou outro universo substitui o último progresso V1.2.
- O carregamento externo de imagens exige internet; permanecem os 11 sprites incorporados e os fallbacks.
- O sistema de duelos usa uma aproximação narrativa com um tipo principal, não as regras oficiais de batalha.
- Execute `node test.js` e `node test-battles.js`.

## Documentação da versão anterior (referência)

# Pokémon: Destinos da Costa — v1.1

Simulador biográfico fictício na Região dos Lagos e entorno (RJ). Aplicação de fã não oficial, HTML/CSS/JS, sem servidor, cadastro ou dependências de execução.

## Abrir e publicar

1. Extraia todos os arquivos do ZIP em uma pasta.
2. Abra `index.html` no Chrome, Edge ou Firefox. Nenhuma instalação é necessária. A versão HTML única, oferecida separadamente, contém o mesmo conteúdo.
3. Preencha nome, data de nascimento e cidade. Personalidade é opcional.
4. Use **Salvar neste dispositivo** para guardar uma identidade local. **História salva** simula até o dia atual. O armazenamento de páginas `file://` depende do navegador; exporte o texto para manter uma cópia independente.
5. Para publicar no GitHub Pages, envie `index.html`, `style.css`, `data.js`, `engine.js` e `app.js` à raiz do repositório. Em Settings > Pages, selecione Deploy from a branch, a branch principal e a pasta /(root). Acesse o link fornecido pelo GitHub.

## Arquitetura

- `data.js`: mundo, 467 espécies (incluindo evoluções e 14 lendários/míticos), famílias evolutivas, 15 habitats (externo reservado para expansões), 10 cidades, 80 referências de locais, 30 instituições/festivais fictícios, 30 carreiras, 25 personalidades Pokémon, 7 marcos históricos.
- `engine.js`: motor determinístico independente do DOM. Gera eventos, aplica consequências, registra memórias, avistamentos, capturas, vínculos, evolução, profissão, time e títulos. Usa uma seed por identidade e sub-seeds por ano/evento; não inclui a data atual na seed. O corte temporal é aplicado à data de cada evento. A idade de nascidos em 29/02 avança em 28/02 em anos não bissextos, por decisão do simulador.
- `app.js`: interface, filtros, detalhes, exportação TXT, salvamento local de uma identidade, universo alternativo. Nenhuma informação pessoal é enviada a uma API pelo aplicativo.
- `style.css`: responsividade e identidade visual de Pokédex e treinador.
- `test.js`: `node test.js` valida 1.000 biografias e casos de datas limite. Node é necessário apenas para rodar testes, não para usar o app.
- `UNIVERSO.md`: regras e limites do universo.

## Imagens e dados

A V1.1 incorpora 11 sprites PNG reais (IDs 7, 25, 50, 131, 133, 153, 222, 278, 352, 418 e 506) do repositório PokeAPI/sprites, recortados para remover bordas transparentes. Os demais são carregados sob demanda por ID nacional. O carregador tenta GitHub Raw, GitHub Pages e jsDelivr, alternando entre arte e sprite; o shiny nunca é substituído silenciosamente pela versão normal. Se todas as fontes falharem, aparece uma Pokébola com o número da espécie. A simulação continua sem conexão; não usa chamadas à API de dados em tempo real. O catálogo é uma seleção local curada, não uma importação completa da PokéAPI. Os tipos são afinidades narrativas principais, e não a ficha oficial completa de tipos duplos; certas evoluções especiais têm adaptações fictícias. A raridade é local e autoral, e não uma estatística dos jogos.

Fontes técnicas: https://pokeapi.co/ e https://github.com/PokeAPI/sprites . Pokémon e seus personagens pertencem aos respectivos titulares. Não há licença oficial de Pokémon concedida a este projeto; disponibilidade pública de imagens não concede direito de exploração comercial.

## Testes efetuados

- 1.000 identidades entre 17 e 56 anos, 10 cidades, corte 25/11/2026 e comparação com 25/11/2030: todas preservaram exatamente os eventos anteriores ao corte.
- Verificações de cronologia, referências de memória, limite de seis ativos, evolução pertencente à cadeia local, contagem de avistamentos e shiny, repetibilidade e datas limite (incluindo 29/02, nascimento no dia e idade avançada).
- Na amostra: 12.566 companheiros obtidos, 5.099 evoluções, 191 avistamentos shiny, 53 avistamentos extraordinários e 6.714 eventos explicitamente ligados a memórias anteriores. Valores são totais de ocorrências, não número de pessoas. Não são probabilidades garantidas.
- Teste de interface Chromium com os arquivos incorporados em uma página de teste, armazenamento local substituído por um objeto em memória e solicitações externas bloqueadas: formulário, 5 abas, diálogo de companheiro, filtros, fluxo salvar/carregar, universos, exportação e largura mobile de 390 px. A navegação direta e o carregamento real de imagens remotas não puderam ser verificados por restrições do ambiente.

## Limitações e próximos passos

Esta é uma primeira versão funcional, não o escopo completo de pré-produção. O catálogo ainda precisa de revisão espécie a espécie, regras oficiais mais completas de evolução e formas regionais, mais arcos narrativos e títulos, além de testes reais de publicação e em celulares. O mecanismo de narrativa usa templates e consequências estruturadas, não IA generativa. Não há sistema de batalhas, mapa interativo, cruzamento de duas biografias, importação de JSON, login, múltiplos slots ou persistência em nuvem. O histórico é reconstituído pelo motor; futuras versões devem manter o motor v1 disponível ou implementar migração para preservar as histórias salvas. O arquivo exportado é um registro independente em texto.

## V1.1 — atualização visual

Motor e catálogo preservados sem alteração. Novo painel de treinador, seis slots de equipe no resultado, sprites nos eventos (espécie identificada pelo texto e histórico evolutivo), etiquetas de afinidade e raridade, detalhes com linha evolutiva, Pokédex com sprites, destaque de shiny e lendários. As etiquetas de tipo refletem o tipo narrativo principal da base regional, não uma ficha oficial de tipos duplos. Os testes do motor foram repetidos com os mesmos resultados. A interface foi testada em Chromium com HTML incorporado e armazenamento simulado, rede remota bloqueada: cinco sprites iniciais carregaram localmente, seis slots, filtros, detalhes, abas, salvamento/carregamento simulado e layout de 390 px passaram. O carregamento real das imagens externas e abertura direta file:// continuam sem validação neste ambiente. Os sprites locais foram obtidos do repositório de origem e decodificados com sucesso.

## V1.5 — Um Mundo Vivo

Abra `index.html` no Chrome ou publique os arquivos na raiz do GitHub Pages. A versão HTML única é equivalente. Nenhuma API de texto nem servidor são necessários. A conexão externa é usada para sprites e artes; as imagens indisponíveis usam o fallback já existente. O armazenamento local da V1.5 é separado da V1.4: as histórias antigas não são migradas e a alteração do motor pode gerar outro destino.

- Trocas automáticas a partir dos 11 anos, com propostas recusadas, Pokémon elegíveis (time, casa ou laboratório), vínculo e tempo de convivência considerados. Pokémon entregues recebem estado `traded` e deixam de ser elegíveis a batalhas, evolução, treino e novos relacionamentos; suas biografias e registros da Pokédex permanecem. O novo Pokémon pode ir a qualquer uma das três categorias, respeitando seis vagas ativas. Turistas trazem espécies de habitats distintos, inclusive espécies de fogo em ambiente marítimo. A origem de turistas é uma regra narrativa fictícia, não uma distribuição oficial de espécies por região. Shiny continua com sorteio de 1/4096 para o Pokémon recebido. Evoluções por troca simples podem ocorrer em um capítulo seguinte; evoluções que exigem itens específicos não são acionadas automaticamente pela troca permanente. O mecanismo anterior de troca temporária continua para evoluções narrativas.
- Mapa esquemático da região com dez cidades e rotas ilustrativas; as cidades conhecidas permitem consultar as memórias e lugares já visitados. Não é um mapa geográfico de navegação.
- Jornal: 12 modelos mensais determinísticos compartilhados (data, cidade e manchete), notícias pessoais derivadas de conquistas, sem acesso a edições futuras.
- Quatro estações com pesos de habitat; 12 festivais anuais públicos, até dez personagens regionais (conforme a base de espécies, idade e disponibilidade), dez modelos de expedição em três capítulos, reputação em cinco áreas e 22 objetos. Pedras compatíveis guardadas podem ser consumidas na evolução, com data e Pokémon associados. Os outros itens são lembranças.
- Painel regional disponível durante a leitura, incluindo registro de trocas, pessoas, mochila, mapa, jornal e reputação. O painel usa snapshots, não o estado final. Exportação textual inclui trocas, itens e notícias.

### Testes V1.5
`node test-world.js` (150 histórias, comparação com data futura, estados e transferências, Pokédex, notícias compartilhadas e itens); `node test-smoke.js` (120 histórias + limites de idade); `node test-battles.js`, `node test-league.js`, `node test-bonds.js`. A suíte extensa `node test.js` (1000 histórias) não foi concluída dentro do limite da sessão; a amostra de 120 passou. Testes de navegador em Chromium com rede bloqueada e armazenamento simulado. As URLs remotas e persistência real em arquivo local precisam ser verificadas no navegador do usuário.

### Fora do escopo concluído
Arte de mapa em pixel art, cenários individuais ilustrados, dezenas de novos modelos de notícias e personagens, condições meteorológicas detalhadas, agendas completas dos NPCs e áudio permanecem para expansão. Os eventos históricos anteriores foram preservados.
