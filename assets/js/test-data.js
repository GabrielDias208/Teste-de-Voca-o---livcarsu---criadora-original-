window.VOCACAO_DATA = (() => {
  const courses = {
    ADM: {
      code: 'ADM', name: 'Administração', icon: 'assets/img/adm.png', tag: 'Gestão e negócios',
      short: 'Planejamento, liderança, organização e tomada de decisão para fazer projetos e empresas funcionarem melhor.',
      profile: 'Você tende a se sentir confortável organizando recursos, definindo prioridades, tomando decisões e acompanhando resultados.',
      skills: ['liderança', 'organização', 'estratégia', 'negociação'],
      areas: ['Gestão de empresas', 'Empreendedorismo', 'Consultoria empresarial', 'Planejamento e operações'],
      next: 'Experimente liderar um projeto pequeno, organizar um evento ou montar um plano de negócio simples.'
    },
    COMEX: {
      code: 'COMEX', name: 'Comércio Exterior', icon: 'assets/img/comex.png', tag: 'Negócios globais',
      short: 'Negociação internacional, logística, culturas, idiomas e circulação de produtos entre países.',
      profile: 'Você demonstra interesse por negociação, cenários internacionais, culturas diferentes e resolução de problemas que envolvem logística e comunicação.',
      skills: ['negociação', 'idiomas', 'logística', 'visão global'],
      areas: ['Importação e exportação', 'Logística internacional', 'Despacho e documentação', 'Negociação internacional'],
      next: 'Pesquise uma cadeia de importação real e pratique idiomas ou comunicação intercultural.'
    },
    INFO: {
      code: 'INFO', name: 'Informática para Internet', icon: 'assets/img/info.png', tag: 'Tecnologia',
      short: 'Criação de sites e sistemas, lógica, tecnologia, interfaces digitais e solução de problemas.',
      profile: 'Você parece gostar de entender como as coisas funcionam, testar soluções, construir ferramentas digitais e resolver problemas passo a passo.',
      skills: ['lógica', 'programação', 'criatividade digital', 'resolução de problemas'],
      areas: ['Desenvolvimento web', 'Front-end e back-end', 'UX/UI técnico', 'Suporte e soluções digitais'],
      next: 'Crie um projeto web pequeno e veja se você gosta do processo de planejar, programar, testar e corrigir.'
    },
    MKT: {
      code: 'MKT', name: 'Marketing', icon: 'assets/img/mark.png', tag: 'Criatividade e comunicação',
      short: 'Comunicação, comportamento do público, criação de campanhas, marcas, conteúdo e análise de resultados.',
      profile: 'Suas respostas indicam afinidade com comunicação, criatividade, leitura de público e construção de mensagens que chamam atenção.',
      skills: ['comunicação', 'criatividade', 'branding', 'análise de público'],
      areas: ['Marketing digital', 'Publicidade', 'Gestão de marcas', 'Conteúdo e redes sociais'],
      next: 'Monte uma campanha fictícia para uma marca e teste diferentes ideias de público, mensagem e formato.'
    },
    RH: {
      code: 'RH', name: 'Recursos Humanos', icon: 'assets/img/rh.png', tag: 'Pessoas e equipes',
      short: 'Desenvolvimento de pessoas, comunicação, recrutamento, clima organizacional e trabalho em equipe.',
      profile: 'Você tende a prestar atenção nas pessoas, no clima do grupo e em como cada integrante pode se desenvolver e colaborar melhor.',
      skills: ['escuta', 'empatia', 'mediação', 'desenvolvimento de pessoas'],
      areas: ['Recrutamento e seleção', 'Treinamento', 'Clima e cultura', 'Desenvolvimento humano'],
      next: 'Observe como equipes se organizam e experimente mediar tarefas, dar feedback e facilitar uma atividade em grupo.'
    },
    SEGTRAB: {
      code: 'SEGTRAB', name: 'Segurança do Trabalho', icon: 'assets/img/st.png', tag: 'Prevenção e cuidado',
      short: 'Prevenção de acidentes, identificação de riscos, procedimentos, ergonomia e proteção no ambiente de trabalho.',
      profile: 'Você demonstra atenção a riscos, prevenção, regras práticas e formas de proteger pessoas antes que um problema aconteça.',
      skills: ['atenção', 'prevenção', 'responsabilidade', 'análise de riscos'],
      areas: ['Prevenção de acidentes', 'Ergonomia', 'Saúde ocupacional', 'Inspeção e treinamento'],
      next: 'Faça um mapa de riscos de um ambiente conhecido e pense em medidas preventivas simples para cada ponto.'
    },
    JURID: {
      code: 'JURID', name: 'Serviços Jurídicos', icon: 'assets/img/sj.png', tag: 'Leis e análise',
      short: 'Leitura e organização de documentos, direitos, normas, argumentação, análise de casos e procedimentos jurídicos.',
      profile: 'Você mostra interesse por regras, argumentos, justiça, análise de versões diferentes e organização cuidadosa de informações.',
      skills: ['argumentação', 'ética', 'leitura crítica', 'organização documental'],
      areas: ['Apoio jurídico', 'Contratos e documentos', 'Direitos trabalhistas', 'Rotinas administrativas jurídicas'],
      next: 'Leia um caso simples com pontos de vista diferentes e tente organizar fatos, regras aplicáveis e argumentos de cada lado.'
    }
  };

  const o = (title, detail, primary, secondary) => ({ title, detail, weights: { [primary]: 1 } });

  const questions = [
    {
      section: 'Interesses', prompt: 'Em um trabalho de escola, qual papel você escolheria primeiro?', hint: 'Pense no que você faria por vontade própria, não no que costuma sobrar para você.',
      options: [
        o('Organizar o grupo', 'Dividir tarefas, definir prazos e acompanhar a entrega.', 'ADM', 'RH'),
        o('Criar a parte digital', 'Montar o site, apresentação interativa ou solução técnica.', 'INFO', 'MKT'),
        o('Cuidar das pessoas', 'Ouvir o grupo, ajudar nos conflitos e manter todos participando.', 'RH', 'ADM'),
        o('Criar a comunicação', 'Pensar no visual, na divulgação e em como prender a atenção.', 'MKT', 'INFO')
      ]
    },
    {
      section: 'Interesses', prompt: 'Qual problema do mundo real mais desperta sua curiosidade?',
      options: [
        o('Produtos viajando entre países', 'Entender negociação, transporte, taxas e culturas.', 'COMEX', 'ADM'),
        o('Acidentes que poderiam ser evitados', 'Descobrir riscos e criar formas de prevenção.', 'SEGTRAB', 'JURID'),
        o('Conflitos sobre direitos e deveres', 'Analisar regras, documentos e argumentos.', 'JURID', 'SEGTRAB'),
        o('Empresas desorganizadas', 'Descobrir por que perdem tempo e como melhorar processos.', 'ADM', 'RH')
      ]
    },
    {
      section: 'Interesses', prompt: 'Você ganhou uma tarde livre para aprender algo novo. O que parece mais divertido?',
      options: [
        o('Criar uma página na internet', 'Testar código, layout e pequenas interações.', 'INFO', 'MKT'),
        o('Aprender sobre outro país', 'Idioma, costumes, negócios e como ele se conecta ao Brasil.', 'COMEX', 'MKT'),
        o('Montar um projeto do zero', 'Objetivo, orçamento, etapas e plano de execução.', 'ADM', 'COMEX'),
        o('Entender comportamento em grupo', 'Motivação, comunicação e dinâmica entre pessoas.', 'RH', 'MKT')
      ]
    },
    {
      section: 'Interesses', prompt: 'Qual tipo de conteúdo você provavelmente assistiria até o fim?',
      options: [
        o('Como uma campanha viralizou', 'Estratégia, público, criação e resultado.', 'MKT', 'INFO'),
        o('Como funciona um grande porto', 'Rotas, cargas, comércio e logística internacional.', 'COMEX', 'ADM'),
        o('Como evitar riscos no trabalho', 'Análise de acidentes e soluções preventivas.', 'SEGTRAB', 'JURID'),
        o('Como um caso foi resolvido', 'Fatos, documentos, normas e argumentos.', 'JURID', 'SEGTRAB')
      ]
    },
    {
      section: 'Interesses', prompt: 'Se você pudesse visitar uma empresa por um dia, onde passaria mais tempo?',
      options: [
        o('Com a equipe de negócios internacionais', 'Vendo negociações, parceiros, documentos e rotas entre países.', 'COMEX', 'ADM'),
        o('Com a equipe de pessoas', 'Entendendo seleção, treinamento e desenvolvimento.', 'RH', 'ADM'),
        o('Com quem planeja o negócio', 'Metas, indicadores, decisões e organização.', 'ADM', 'COMEX'),
        o('Com quem cuida da marca', 'Campanhas, identidade e relacionamento com o público.', 'MKT', 'INFO')
      ]
    },
    {
      section: 'Interesses', prompt: 'Qual desafio parece mais satisfatório de resolver?',
      options: [
        o('Negociar um acordo difícil', 'Encontrar um ponto que funcione para lados diferentes.', 'COMEX', 'ADM'),
        o('Encontrar um risco escondido', 'Perceber algo perigoso antes de virar problema.', 'SEGTRAB', 'JURID'),
        o('Organizar um conjunto de provas', 'Separar fatos, documentos e regras relevantes.', 'JURID', 'SEGTRAB'),
        o('Ajudar uma equipe desmotivada', 'Entender o que está acontecendo e recuperar a colaboração.', 'RH', 'ADM')
      ]
    },
    {
      section: 'Interesses', prompt: 'Se você criasse um projeto para a escola, qual escolheria?',
      options: [
        o('Aplicativo ou site útil', 'Uma ferramenta digital que resolva um problema dos alunos.', 'INFO', 'MKT'),
        o('Feira multicultural e de intercâmbio', 'Conectar estudantes, culturas, idiomas e oportunidades de outros lugares.', 'COMEX', 'RH'),
        o('Miniempresa estudantil', 'Planejamento, funções, custos e metas.', 'ADM', 'COMEX'),
        o('Campanha de divulgação', 'Criar conceito, identidade, peças e estratégia.', 'MKT', 'INFO')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Quando surge um problema inesperado, qual é seu primeiro impulso?',
      options: [
        o('Entender o processo inteiro', 'Ver prioridades, recursos e decidir a próxima ação.', 'ADM', 'SEGTRAB'),
        o('Investigar a causa com cuidado', 'Observar o que mudou, eliminar riscos e só então agir.', 'SEGTRAB', 'JURID'),
        o('Ouvir quem está envolvido', 'Entender necessidades e alinhar as pessoas.', 'RH', 'JURID'),
        o('Checar regras e evidências', 'Separar opinião de fato e verificar o que se aplica.', 'JURID', 'SEGTRAB')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Qual elogio combina mais com a forma como você gostaria de ser reconhecido?',
      options: [
        o('“Você explica e convence muito bem.”', 'Comunica ideias de forma clara e interessante.', 'MKT', 'COMEX'),
        o('“Você percebe riscos que ninguém vê.”', 'É cuidadoso e pensa nas consequências.', 'SEGTRAB', 'JURID'),
        o('“Você consegue negociar sem perder o foco.”', 'Equilibra interesses e procura acordos.', 'COMEX', 'ADM'),
        o('“Você faz as pessoas trabalharem melhor juntas.”', 'Cria confiança e colaboração.', 'RH', 'ADM')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Em uma decisão importante, o que pesa mais para você?',
      options: [
        o('Dados e funcionamento', 'Quero saber o que é lógico, testável e tecnicamente viável.', 'INFO', 'ADM'),
        o('Impacto nas pessoas', 'Quero entender como a decisão afeta o grupo.', 'RH', 'SEGTRAB'),
        o('Regras e coerência', 'Quero que a decisão tenha justificativa e respeite critérios.', 'JURID', 'ADM'),
        o('Objetivo e resultado', 'Quero uma escolha que faça o projeto avançar.', 'ADM', 'COMEX')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Qual ambiente parece mais estimulante?',
      options: [
        o('Equipe criando algo novo', 'Ideias, protótipos, telas e soluções digitais.', 'INFO', 'MKT'),
        o('Contato com públicos diferentes', 'Campanhas, eventos, conteúdo e comunicação.', 'MKT', 'COMEX'),
        o('Operação com procedimentos claros', 'Inspeção, prevenção, rotina técnica e responsabilidade.', 'SEGTRAB', 'JURID'),
        o('Negociação com diferentes culturas', 'Idiomas, prazos, documentos e acordos.', 'COMEX', 'MKT')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Quando precisa aprender algo complicado, qual método mais combina com você?',
      options: [
        o('Mexer e testar', 'Aprendo tentando, errando, corrigindo e entendendo o sistema.', 'INFO', 'ADM'),
        o('Seguir etapas e verificar riscos', 'Aprendo melhor com um procedimento claro e conferindo cada ponto.', 'SEGTRAB', 'ADM'),
        o('Conversar e trocar ideias', 'Aprendo ouvindo explicações e diferentes experiências.', 'RH', 'MKT'),
        o('Ler com atenção e comparar fontes', 'Gosto de reunir informações antes de concluir.', 'JURID', 'COMEX')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Qual tarefa você aceitaria com menos resistência?',
      options: [
        o('Revisar um procedimento de segurança', 'Checar riscos, detalhes e pontos de melhoria.', 'SEGTRAB', 'JURID'),
        o('Preparar uma negociação', 'Pesquisar contexto, interesses e possibilidades de acordo.', 'COMEX', 'ADM'),
        o('Planejar uma apresentação de marca', 'Escolher mensagem, público e formato.', 'MKT', 'INFO'),
        o('Preparar uma conversa de feedback', 'Pensar em como ajudar alguém a evoluir.', 'RH', 'ADM')
      ]
    },
    {
      section: 'Seu jeito de trabalhar', prompt: 'Em um grupo com opiniões muito diferentes, o que você faria?',
      options: [
        o('Criaria critérios para decidir', 'Organizaria opções e ajudaria o grupo a escolher.', 'ADM', 'JURID'),
        o('Mediaria a conversa', 'Tentaria entender interesses diferentes e construir um acordo.', 'COMEX', 'RH'),
        o('Defenderia a ideia com evidências', 'Montaria uma argumentação consistente e verificável.', 'JURID', 'ADM'),
        o('Transformaria as ideias em algo visual', 'Mostraria um protótipo, campanha ou demonstração.', 'MKT', 'INFO')
      ]
    },
    {
      section: 'Cenários', prompt: 'Uma pequena empresa está crescendo rápido e tudo está ficando confuso. Onde você começaria?',
      options: [
        o('Mapear processos e responsabilidades', 'Quem faz o quê, quando e com quais recursos.', 'ADM', 'RH'),
        o('Criar ferramentas digitais', 'Automatizar tarefas e organizar informações.', 'INFO', 'ADM'),
        o('Cuidar da comunicação da equipe', 'Alinhar expectativas, papéis e desenvolvimento.', 'RH', 'ADM'),
        o('Revisar riscos e condições de trabalho', 'Garantir que o crescimento não aumente acidentes.', 'SEGTRAB', 'ADM')
      ]
    },
    {
      section: 'Cenários', prompt: 'Um produto brasileiro vai ser vendido em outro país. Qual parte mais chama sua atenção?',
      options: [
        o('Negociação e logística internacional', 'Rotas, custos, documentos e parceiros.', 'COMEX', 'ADM'),
        o('Como adaptar a comunicação', 'Mensagem, identidade e público daquele mercado.', 'MKT', 'COMEX'),
        o('As regras e contratos envolvidos', 'Condições, obrigações e documentação.', 'JURID', 'COMEX'),
        o('A plataforma de venda', 'Experiência digital, site, integração e funcionamento.', 'INFO', 'MKT')
      ]
    },
    {
      section: 'Cenários', prompt: 'Durante um evento, acontece um problema sério. Qual responsabilidade você assumiria?',
      options: [
        o('Coordenar a resposta', 'Distribuir tarefas e manter o plano funcionando.', 'ADM', 'SEGTRAB'),
        o('Isolar o risco e prevenir novos problemas', 'Pensar primeiro na segurança das pessoas.', 'SEGTRAB', 'ADM'),
        o('Registrar fatos e verificar responsabilidades', 'Organizar informações com cuidado.', 'JURID', 'SEGTRAB'),
        o('Comunicar o que aconteceu', 'Explicar a situação de forma clara para o público.', 'MKT', 'JURID')
      ]
    },
    {
      section: 'Cenários', prompt: 'Uma equipe excelente tecnicamente está com muitos conflitos. Como você contribuiria?',
      options: [
        o('Conversaria individualmente com as pessoas', 'Entenderia causas, expectativas e necessidades.', 'RH', 'ADM'),
        o('Reorganizaria metas e responsabilidades', 'Reduziria dúvidas sobre quem decide e quem executa.', 'ADM', 'RH'),
        o('Criaria uma ferramenta para acompanhar o trabalho', 'Deixaria tarefas e comunicação mais visíveis.', 'INFO', 'ADM'),
        o('Criaria regras de convivência claras', 'Definiria critérios para tratar conflitos de forma consistente.', 'JURID', 'RH')
      ]
    },
    {
      section: 'Cenários', prompt: 'Você recebe um orçamento pequeno para melhorar a escola. Qual projeto escolheria?',
      options: [
        o('Sistema para facilitar serviços aos alunos', 'Uma solução digital simples e funcional.', 'INFO', 'ADM'),
        o('Programa de acolhimento e integração', 'Ações para melhorar convivência e pertencimento.', 'RH', 'MKT'),
        o('Campanha para valorizar projetos dos alunos', 'Conteúdo, identidade e divulgação.', 'MKT', 'RH'),
        o('Plano de prevenção de riscos', 'Mapear problemas físicos e propor melhorias.', 'SEGTRAB', 'ADM')
      ]
    },
    {
      section: 'Cenários', prompt: 'Um cliente diz que recebeu uma cobrança errada e ameaça reclamar publicamente. O que mais te interessa investigar?',
      options: [
        o('Onde o processo falhou', 'Revisar fluxo, responsáveis e como evitar repetição.', 'ADM', 'INFO'),
        o('Se o sistema calculou algo errado', 'Reproduzir o erro e corrigir a causa técnica.', 'INFO', 'ADM'),
        o('Quais direitos e documentos se aplicam', 'Conferir registros, regras e obrigações.', 'JURID', 'ADM'),
        o('Como responder ao público', 'Resolver a comunicação sem piorar a confiança na marca.', 'MKT', 'JURID')
      ]
    },
    {
      section: 'Cenários', prompt: 'Pensando no seu futuro, qual frase mais se aproxima do que você gostaria de fazer?',
      options: [
        o('Analisar regras e defender direitos', 'Organizar fatos, critérios e argumentos para chegar a uma solução justa.', 'JURID', 'SEGTRAB'),
        o('Conectar pessoas, empresas e países', 'Negociar e trabalhar com cenários internacionais.', 'COMEX', 'MKT'),
        o('Construir soluções digitais', 'Transformar problemas em sistemas, páginas e ferramentas.', 'INFO', 'MKT'),
        o('Proteger pessoas e garantir critérios justos', 'Prevenir riscos, interpretar regras e agir com responsabilidade.', 'SEGTRAB', 'JURID')
      ]
    }
  ];

  return { courses, questions };
})();
