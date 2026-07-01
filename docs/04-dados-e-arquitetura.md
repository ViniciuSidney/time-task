# Dados e Arquitetura

## Dados principais

### Entidade: Sessão

Representa uma missão de foco criada pelo usuário para ser executada dentro de um tempo definido.

Campos:
- id: identificador único da sessão.
- title: título da missão.
- durationMinutes: duração planejada em minutos.
- status: estado atual da sessão (`draft`, `running`, `paused`, `finished` ou `cancelled`).
- createdAt: data e hora de criação da sessão.
- startedAt: data e hora em que o timer foi iniciado.
- pausedAt: data e hora em que a sessão foi pausada.
- finishedAt: data e hora em que a sessão foi finalizada.
- endAt: data e hora prevista para o encerramento da sessão.
- totalPausedMs: tempo total em milissegundos em que a sessão ficou pausada.
- completedTasks: quantidade de microtarefas concluídas.
- totalTasks: quantidade total de microtarefas da sessão.

---

### Entidade: Microtarefa

Representa uma ação curta que deve ser cumprida durante a sessão.

Campos:
- id: identificador único da microtarefa.
- sessionId: identificador da sessão à qual a microtarefa pertence.
- title: descrição curta da microtarefa.
- isDone: indica se a microtarefa foi concluída.
- order: posição da microtarefa na lista.
- createdAt: data e hora de criação da microtarefa.
- completedAt: data e hora de conclusão da microtarefa.

---

### Entidade: Configurações

Representa preferências simples do usuário na aplicação.

Campos:
- theme: tema visual selecionado (`light` ou `dark`).
- soundEnabled: indica se os sons da aplicação estão ativados.
- vibrationEnabled: indica se a vibração em dispositivos móveis está ativada.
- lastSessionId: identificador da última sessão acessada.

---

### Entidade futura: Modelo de sessão

Representa uma sessão reaproveitável, pensada para versões futuras.

Campos:
- id: identificador único do modelo.
- title: título do modelo.
- durationMinutes: duração padrão.
- tasks: lista de microtarefas padrão.
- createdAt: data e hora de criação do modelo.

---

## Relações entre dados

- Uma Sessão possui várias Microtarefas.
- Uma Microtarefa pertence a uma Sessão.
- As Configurações pertencem ao usuário local do navegador.
- Futuramente, um Modelo de sessão poderá gerar uma nova Sessão.
- Futuramente, um Modelo de sessão poderá possuir várias Microtarefas padrão.

---

## Armazenamento local

Na versão inicial, os dados serão salvos no navegador usando `localStorage`.

Chaves sugeridas:
- `timeTask.currentSession`: armazena a sessão em andamento.
- `timeTask.sessions`: armazena o histórico de sessões.
- `timeTask.settings`: armazena as preferências do usuário.
- `timeTask.templates`: armazena modelos de sessão em versões futuras.

Observação:
- A aplicação não terá login, banco de dados externo ou sincronização em nuvem na versão inicial.
- O armazenamento local é suficiente para validar a utilidade do projeto e manter o escopo simples.

---

## Regra técnica importante do timer

O timer deve ser calculado com base em datas reais, não apenas em intervalos visuais.

Em vez de depender somente de `setInterval`, a aplicação deve calcular o tempo restante comparando o horário final da sessão com o horário atual.

Exemplo lógico:

```js
tempoRestante = horarioFinal - Date.now();
```

Isso evita problemas quando a aba fica em segundo plano, o navegador reduz a execução do JavaScript ou o usuário bloqueia a tela do dispositivo.

---

## Estrutura de arquivos

```text
/
  docs/
    00-guia-de-documentacao-e-arquitetura.md
    01-visao-do-projeto.md
    02-requisitos-e-escopo.md
    03-fluxos-e-telas.md
    04-dados-e-arquitetura.md
    05-roadmap.md
    06-testes.md
    07-changelog.md

  public/
    favicon.ico
    manifest.json

  src/
    assets/
      fonts/
      icons/
      images/

    scripts/
      core/
      features/
      shared/
      app.js
      main.js

    styles/
      base/
      components/
      layout/
      pages/
        home.css
      themes/
        dark.css
        light.css
      utilities/
        helpers.css
        responsive.css
      main.css

  tests/
    manual-tests.md

  .gitignore
  index.html
  README.md
```

---

## Organização dos scripts

Sugestão de responsabilidade dos arquivos e pastas:

### `src/scripts/main.js`

Arquivo de entrada da aplicação.

Responsabilidades:
- Carregar a aplicação quando a página estiver pronta.
- Inicializar eventos principais.
- Chamar a função principal do app.

### `src/scripts/app.js`

Arquivo central de controle.

Responsabilidades:
- Coordenar os módulos principais.
- Inicializar estado da aplicação.
- Integrar timer, microtarefas, armazenamento e interface.

### `src/scripts/core/`

Pasta para regras centrais da aplicação.

Possíveis arquivos:
- `timer.js`: lógica do timer.
- `storage.js`: leitura e gravação no `localStorage`.
- `state.js`: controle do estado atual da sessão.
- `validation.js`: validações de formulário.

### `src/scripts/features/`

Pasta para funcionalidades principais.

Possíveis arquivos:
- `mission.js`: criação e controle da missão.
- `tasks.js`: criação, edição e conclusão das microtarefas.
- `session.js`: início, pausa, continuação e finalização da sessão.
- `history.js`: histórico de sessões em versões futuras.

### `src/scripts/shared/`

Pasta para recursos reutilizáveis.

Possíveis arquivos:
- `helpers.js`: funções auxiliares.
- `constants.js`: constantes do projeto.
- `formatters.js`: formatação de tempo, data e textos.

---

## Organização dos estilos

### `src/styles/main.css`

Arquivo principal de estilos.

Responsabilidades:
- Importar os demais arquivos CSS.
- Centralizar a entrada visual da aplicação.

### `src/styles/base/`

Pasta para estilos básicos.

Exemplos:
- reset.
- variáveis globais.
- tipografia.
- estilos base do documento.

### `src/styles/components/`

Pasta para componentes reutilizáveis.

Exemplos:
- botões.
- cards.
- inputs.
- checkboxes.
- modais.

### `src/styles/layout/`

Pasta para estrutura geral da interface.

Exemplos:
- cabeçalho.
- container principal.
- grid.
- seções.

### `src/styles/pages/`

Pasta para estilos específicos de telas.

Exemplo:
- `home.css`: estilos da tela principal.

### `src/styles/themes/`

Pasta para temas visuais.

Exemplos:
- `light.css`: tema claro.
- `dark.css`: tema escuro.

### `src/styles/utilities/`

Pasta para classes e ajustes auxiliares.

Exemplos:
- responsividade.
- espaçamentos.
- estados visuais.
- classes utilitárias.

---

## Fluxo geral da aplicação

1. Usuário acessa o Time-Task.
2. A aplicação carrega configurações e sessão em andamento, se existir.
3. Usuário cria uma missão com título, tempo e microtarefas.
4. Sistema valida as informações.
5. Usuário inicia a sessão.
6. Timer começa a contar regressivamente.
7. Usuário marca microtarefas como concluídas.
8. Sistema atualiza progresso e salva o estado localmente.
9. Usuário finaliza a sessão ou o tempo chega ao fim.
10. Sistema exibe o resultado e salva o registro da sessão.

---

## Limites arquiteturais da versão inicial

- Sem backend.
- Sem autenticação.
- Sem banco de dados externo.
- Sem sincronização entre dispositivos.
- Sem dependência obrigatória de bibliotecas externas.
- Sem sistema complexo de calendário.
- Sem notificações avançadas na primeira versão.

---

## Observações

A arquitetura deve priorizar simplicidade, clareza e manutenção fácil.

Como o Time-Task é uma aplicação de foco imediato, a estrutura técnica precisa ajudar a manter a experiência rápida: abrir, configurar, iniciar e executar.
