# Vocação Polar — versão reorganizada

Esta versão substitui o fluxo antigo fragmentado por uma estrutura mais simples e estável.

## Como abrir

Para testar rapidamente, abra `index.html` no navegador. O teste, os resultados e os minigames funcionam sem banco de dados.

Para desenvolvimento, é melhor usar um servidor local, por exemplo a extensão Live Server do VS Code ou XAMPP.

## Estrutura

- `index.html` — página inicial
- `descricao.html` — explicação do teste
- `cursos.html` — catálogo pesquisável dos cursos
- `teste.html` — teste vocacional completo em uma única página
- `resultado.html` — resultado dinâmico com ranking e top 3
- `desafios.html` — área dos minigames
- `assets/css` — estilos principais
- `assets/js` — lógica compartilhada, dados do teste e resultado
- `assets/img` — somente imagens usadas pela interface principal
- `extras` — minigames, sem interferir na pontuação do teste
- `backend` — gravação e relatório opcionais em PHP/MySQL

## Melhorias principais

- 21 perguntas em 3 etapas: Interesses, Seu jeito de trabalhar e Cenários.
- Todos os 7 cursos são comparados no mesmo sistema de pontuação.
- Resultado mostra ranking completo e os 3 caminhos de maior afinidade.
- O progresso fica salvo no `localStorage`.
- É possível voltar para a pergunta anterior e corrigir a resposta.
- Atalhos de teclado 1–4 nas alternativas.
- Layout responsivo para computador e celular.
- Painel de acessibilidade com tamanho de fonte, alto contraste e redução de animações.
- Busca no catálogo de cursos.
- Resultado imprimível e copiável.
- Minigames movidos para uma área separada.
- Duplicatas do projeto antigo removidas.
- Backend refeito com prepared statements, UTF-8 e relatório corrigido.

## Banco de dados opcional

Por padrão, a coleta está **desativada** em `backend/config.php`.

Se houver autorização adequada para coletar dados de participantes:

1. Importe `backend/database.sql` no MySQL/MariaDB.
2. Ajuste as credenciais em `backend/config.php`.
3. Troque `DATA_COLLECTION_ENABLED` para `true`.
4. Faça a integração de envio somente depois de definir consentimento e política de uso dos dados do seu projeto.

A versão atual do teste funciona completamente sem essa coleta.

## Resultado

As porcentagens exibidas são de **afinidade relativa**. O curso com a maior pontuação do participante vira a referência de 100%, e os demais são comparados a ele. O resultado é exploratório e não substitui orientação profissional.
