# O que foi corrigido e melhorado

## Problemas do projeto anterior

- IDs HTML repetidos em várias alternativas.
- Lógica do teste espalhada por muitas páginas e scripts inline.
- Quatro cópias iguais do mesmo minigame.
- Duas cópias do jogo da memória e do Stick Challenge.
- Redirecionamentos frágeis entre `quest`, `carregamento`, `P2` e `resultado`.
- Pontuações separadas em várias chaves de `localStorage`, aumentando chance de inconsistência.
- Formulários HTML aninhados e um formulário principal oculto.
- Cadastro PHP usava variável diferente da recebida (`$name_aluno`), tipos incorretos e redirecionava para arquivo inexistente.
- Relatório PHP misturava títulos de série e escola e usava coluna de nome diferente do cadastro.
- Layout antigo dependia muito de `vh/vw`, `position:absolute` e `overflow:hidden`, causando problemas em telas menores.
- Links de CSS externos inválidos ou usados como se fossem folhas de estilo.

## Nova arquitetura

O fluxo principal agora usa cinco páginas claras: início, descrição, cursos, teste e resultado. A pontuação e as perguntas ficam centralizadas em JavaScript, o que facilita manutenção e inclusão de novas questões.
