# Visão do Projeto

## Nome do projeto

Time-Task

## Ideia principal

O **Time-Task** é uma aplicação web simples de foco imediato que combina um **timer regressivo** com uma **lista curta de microtarefas**.

A proposta é ajudar o usuário a transformar uma intenção ampla, como “estudar”, “arrumar algo”, “programar uma parte do projeto” ou “cumprir uma meta rápida”, em uma **missão objetiva**, com tempo definido e pequenas ações visíveis.

A aplicação funciona como um painel de execução:

1. O usuário define o nome da missão.
2. Define o tempo disponível.
3. Adiciona microtarefas.
4. Inicia o timer.
5. Marca o que foi concluído.
6. Finaliza a missão.
7. Consulta ou reutiliza missões pelo histórico/modelos.

O foco principal não é planejar o futuro, mas apoiar a ação no presente.

## Problema que resolve

Muitas pessoas sabem o que precisam fazer, mas se perdem na execução por alguns motivos comuns:

- Começam uma tarefa sem clareza do primeiro passo;
- Estimam mal o tempo disponível;
- Se distraem durante a execução;
- Tentam fazer uma tarefa grande sem dividir em ações menores;
- Perdem a noção de progresso;
- Usam timers separados de listas de tarefas, criando atrito;
- Não conseguem reaproveitar sessões que funcionaram bem.

O problema central que o Time-Task resolve é:

> **Organizar o que deve ser feito agora, dentro de um limite de tempo, com foco em execução simples e visível.**

## Objetivo principal

Ajudar o usuário a executar uma missão de curta ou média duração com mais clareza, mostrando:

- O tempo restante;
- A missão atual;
- As microtarefas da sessão;
- O progresso de conclusão;
- A possibilidade de pausar, retomar, finalizar, repetir ou salvar modelos.

O resultado esperado é que o usuário consiga sair de uma intenção vaga para uma execução objetiva.

Exemplo:

Antes:

> “Vou estudar um pouco.”

Depois:

> “Tenho 30 minutos para ler o resumo, resolver 5 exercícios e anotar dúvidas.”

## Público-alvo

A aplicação é voltada para pessoas que precisam organizar tarefas imediatas e reduzir distrações, principalmente:

- Estudantes;
- Pessoas que estudam ou trabalham pelo computador;
- Usuários que precisam cumprir metas rápidas;
- Pessoas que gostam de produtividade simples;
- Pessoas que usam blocos de tempo para estudar, revisar, limpar, programar ou organizar;
- Usuários que preferem ferramentas diretas, sem excesso de telas.

## Diferencial da aplicação

O diferencial do Time-Task está em unir **timer + checklist + histórico + modelos** em uma experiência simples.

Um timer comum apenas responde:

> “Quanto tempo falta?”

O Time-Task responde também:

> “O que eu devo fazer dentro desse tempo?”

Esse diferencial transforma a sessão em uma pequena missão guiada, com começo, meio e fim.

Pontos de diferenciação:

- Timer regressivo com visual de destaque;
- Lista curta de microtarefas;
- Progresso por tarefas concluídas;
- Histórico de missões finalizadas;
- Repetição de missões anteriores;
- Modelos salvos para reutilização;
- Confirmação visual para ações perigosas;
- Limite de tempo para manter o foco em sessões realistas;
- Interface com identidade própria, em estilo minimalista escuro/verde.

## Versão atual

**v0.1 - Núcleo funcional da missão**

Status: **em desenvolvimento**

A versão atual já possui o núcleo principal da experiência:

- Criação de missão;
- Definição de tempo;
- Limite máximo de tempo;
- Formatação de tempo em minutos e horas;
- Criação dinâmica de microtarefas;
- Timer regressivo;
- Pausa e retomada;
- Reinício e cancelamento;
- Finalização manual ou por tempo encerrado;
- Histórico local;
- Repetição de missões;
- Modelos salvos;
- Modais de confirmação;
- Refatoração inicial do CSS da tela principal.

Ainda faltam refinamentos antes de considerar a v0.1 fechada:

- Responsividade completa;
- Recuperação de missão ativa após recarregar a página;
- Testes manuais completos;
- Ajustes de acessibilidade;
- Melhor organização futura do JavaScript em módulos.

## Observações iniciais

A primeira versão deve continuar simples, rápida e funcional. O objetivo não é criar um gerenciador completo de produtividade, mas validar o núcleo da ideia:

> **Criar uma missão, iniciar o foco, acompanhar o tempo e registrar o resultado.**

Cuidados importantes:

- Evitar excesso de funcionalidades;
- Manter a lista de tarefas curta, preferencialmente entre 1 e 7 microtarefas;
- Limitar o tempo máximo da missão para evitar sessões exageradas;
- Usar armazenamento local antes de pensar em backend;
- Garantir que ações perigosas tenham confirmação;
- Priorizar clareza visual durante a execução;
- Preservar a identidade visual própria do projeto;
- Evoluir por versões pequenas e bem documentadas.
