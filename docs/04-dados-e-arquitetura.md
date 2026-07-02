# Dados e Arquitetura

## Visão geral técnica

O Time-Task é uma aplicação web feita inicialmente com:

- HTML;
- CSS;
- JavaScript puro;
- `localStorage` para persistência local.

A versão atual ainda concentra a lógica principal em `src/scripts/main.js`. Essa escolha é aceitável durante o desenvolvimento inicial, pois facilita testar rapidamente o fluxo principal. Porém, conforme o projeto crescer, a tendência é separar o código em módulos menores.

A arquitetura deve priorizar:

- Simplicidade;
- Clareza;
- Baixo acoplamento;
- Fácil manutenção;
- Evolução gradual.

---

## Dados principais

### Entidade: Missão ativa

Representa a missão que está sendo executada ou acabou de ser criada pelo usuário.

Campos atuais usados na aplicação:

- id: identificador único da missão.
- title: nome da missão.
- durationMinutes: duração planejada em minutos.
- totalSeconds: duração total convertida para segundos.
- remainingSeconds: tempo restante em segundos.
- startedAt: data e hora de início da missão.
- finishedAt: data e hora de finalização.
- finishReason: motivo da finalização (`manual` ou `time-ended`).
- savedToHistory: indica se a missão já foi salva no histórico.
- completedTasks: quantidade de tarefas concluídas.
- totalTasks: quantidade total de tarefas.
- elapsedSeconds: tempo realmente usado.
- tasks: lista de microtarefas da missão.

Observação:
A missão ativa atualmente existe em memória durante o uso da página. A recuperação automática após recarregar a página ainda é uma melhoria pendente.

---

### Entidade: Microtarefa

Representa uma ação curta dentro de uma missão.

Campos atuais:

- id: identificador único da microtarefa.
- name: nome/descrição da microtarefa.
- completed: indica se a microtarefa foi concluída.

Exemplo:

```json
{
  "id": "task-123",
  "name": "Resolver 3 questões",
  "completed": false
}
```

---

### Entidade: Item de histórico

Representa uma missão finalizada e salva no navegador.

Campos atuais:

- id: identificador da missão.
- title: nome da missão.
- durationMinutes: duração planejada em minutos.
- totalSeconds: duração total em segundos.
- remainingSeconds: tempo restante ao finalizar.
- elapsedSeconds: tempo realmente usado.
- completedTasks: quantidade de tarefas concluídas.
- totalTasks: quantidade total de tarefas.
- tasks: lista de microtarefas com seus estados finais.
- startedAt: data e hora de início.
- finishedAt: data e hora de finalização.
- finishReason: motivo da finalização.

Exemplo lógico:

```json
{
  "id": "mission-123",
  "title": "Revisar Matemática",
  "durationMinutes": 30,
  "totalSeconds": 1800,
  "remainingSeconds": 240,
  "elapsedSeconds": 1560,
  "completedTasks": 2,
  "totalTasks": 3,
  "finishReason": "manual"
}
```

---

### Entidade: Modelo de missão

Representa uma missão reutilizável salva pelo usuário.

Campos atuais:

- id: identificador único do modelo.
- title: título do modelo.
- durationMinutes: duração padrão em minutos.
- tasks: lista de microtarefas padrão.
- createdAt: data e hora de criação do modelo.

Exemplo lógico:

```json
{
  "id": "template-123",
  "title": "Revisão rápida",
  "durationMinutes": 25,
  "tasks": [
    {
      "id": "task-1",
      "name": "Ler resumo",
      "completed": false
    }
  ],
  "createdAt": "2026-07-01T12:00:00.000Z"
}
```

---

### Entidade futura: Configurações

Representará preferências simples do usuário.

Campos possíveis:

- theme: tema visual selecionado (`light` ou `dark`).
- soundEnabled: indica se sons estão ativados.
- vibrationEnabled: indica se vibração está ativada.
- maxMissionMinutes: limite de tempo preferido pelo usuário.
- lastSessionId: identificador da última sessão acessada.

Essa entidade ainda não é prioridade na v0.1.

---

## Relações entre dados

- Uma missão possui várias microtarefas.
- Uma microtarefa pertence ao contexto de uma missão.
- Um item de histórico representa uma missão finalizada.
- Um modelo de missão pode gerar uma nova missão.
- Um modelo possui várias microtarefas padrão.
- O histórico e os modelos pertencem ao usuário local do navegador.

---

## Armazenamento local

Na versão atual, os dados persistidos são salvos no navegador usando `localStorage`.

Chaves atuais usadas:

- `time-task:history`: armazena o histórico de missões finalizadas.
- `time-task:templates`: armazena modelos de missão salvos.

Formato esperado:

```js
localStorage["time-task:history"] = JSON.stringify([...]);
localStorage["time-task:templates"] = JSON.stringify([...]);
```

### Chaves futuras possíveis

- `time-task:current-mission`: missão ativa para recuperação após recarregar a página.
- `time-task:settings`: preferências do usuário.
- `time-task:version`: versão interna do formato dos dados.

---

## Regras de armazenamento

- O histórico deve manter apenas uma quantidade limitada de registros.
- Atualmente, a aplicação limita o histórico aos registros mais recentes.
- Os modelos também devem ter limite para evitar acúmulo desnecessário.
- A exclusão de histórico, item de histórico e modelo deve exigir confirmação.
- Dados locais não são sincronizados entre dispositivos.
- Ao limpar dados do navegador, os registros serão perdidos.

---

## Regras de tempo

### Limite máximo

A missão deve respeitar um limite máximo de duração.

Valor atual sugerido:

```js
MAX_MISSION_MINUTES = 120;
```

Isso equivale a 2 horas.

Motivo:
O Time-Task é focado em execução imediata. Sessões longas demais fogem da proposta da aplicação.

### Formatação de tempo

A aplicação deve aceitar entrada em minutos, mas exibir valores maiores que 59 minutos em horas.

Exemplos:

- `30` → `30 minutos`
- `60` → `1 hora`
- `90` → `1 hora e 30 minutos`
- `120` → `2 horas`

### Timer

O timer deve exibir:

- `MM:SS` para tempos abaixo de 1 hora;
- `HH:MM:SS` para tempos iguais ou superiores a 1 hora.

Exemplos:

- `25 minutos` → `25:00`
- `1 hora` → `01:00:00`
- `2 horas` → `02:00:00`

---

## Regra técnica importante do timer

O timer deve ser calculado com base em datas reais, não apenas em decrementos visuais.

Em vez de depender somente de subtrair 1 segundo a cada intervalo, a aplicação calcula um prazo final e compara com o horário atual.

Exemplo lógico:

```js
countdownDeadline = Date.now() + remainingSeconds * 1000;
remainingSeconds = Math.ceil((countdownDeadline - Date.now()) / 1000);
```

Isso reduz problemas quando:

- A aba fica em segundo plano;
- O navegador reduz a frequência do JavaScript;
- O computador fica lento;
- O usuário alterna entre janelas.

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
      layouts/
        prototipos/
        finais/

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

## Organização atual dos scripts

### `src/scripts/main.js`

Arquivo que atualmente concentra a lógica principal da aplicação.

Responsabilidades atuais:

- Selecionar elementos do DOM;
- Controlar estado da aplicação;
- Criar, editar e remover microtarefas;
- Validar missão;
- Iniciar, pausar, retomar, reiniciar e finalizar timer;
- Salvar histórico;
- Renderizar painel de histórico;
- Salvar e carregar modelos;
- Controlar modais;
- Exibir mensagens de orientação.

Essa concentração é aceitável no protótipo funcional, mas deve ser revista futuramente.

---

## Organização futura dos scripts

Sugestão para refatoração futura:

### `src/scripts/main.js`

Arquivo de entrada.

Responsabilidades:
- Inicializar a aplicação.
- Importar módulos principais.
- Chamar função de inicialização.

### `src/scripts/app.js`

Coordenação geral.

Responsabilidades:
- Inicializar estado.
- Conectar eventos.
- Integrar módulos.

### `src/scripts/core/timer.js`

Responsabilidades:
- Criar timer;
- Pausar;
- Retomar;
- Reiniciar;
- Calcular tempo restante;
- Formatar tempo.

### `src/scripts/core/storage.js`

Responsabilidades:
- Ler `localStorage`;
- Salvar `localStorage`;
- Validar dados;
- Controlar chaves.

### `src/scripts/core/formatters.js`

Responsabilidades:
- Formatar minutos;
- Formatar duração;
- Formatar data e hora.

### `src/scripts/core/validation.js`

Responsabilidades:
- Validar título;
- Validar tempo;
- Validar tarefas;
- Validar limites.

### `src/scripts/features/tasks.js`

Responsabilidades:
- Criar tarefa;
- Remover tarefa;
- Atualizar tarefa;
- Marcar como concluída;
- Renderizar lista.

### `src/scripts/features/history.js`

Responsabilidades:
- Salvar histórico;
- Renderizar painel;
- Excluir item;
- Apagar histórico;
- Repetir missão.

### `src/scripts/features/templates.js`

Responsabilidades:
- Salvar modelo;
- Listar modelos;
- Usar modelo;
- Excluir modelo.

### `src/scripts/features/modals.js`

Responsabilidades:
- Abrir modal;
- Fechar modal;
- Controlar confirmação.

---

## Organização atual dos estilos

### `src/styles/pages/home.css`

Atualmente concentra os estilos principais da tela inicial e seus estados.

Responsabilidades atuais:

- Variáveis visuais da página;
- Layout desktop;
- Painéis laterais;
- Painel da missão;
- Tarefas;
- Botões;
- Estados da aplicação;
- Histórico;
- Modais;
- Modelos;
- Correções específicas.

O arquivo foi refatorado em seções comentadas para facilitar manutenção.

---

## Organização futura dos estilos

Com o crescimento do projeto, os estilos poderão ser separados em:

### `src/styles/base/`

- Reset;
- Variáveis;
- Tipografia;
- Estilos globais.

### `src/styles/components/`

- Botões;
- Inputs;
- Tarefas;
- Modais;
- Cards de histórico;
- Cards de modelo.

### `src/styles/layout/`

- Estrutura principal;
- Grid da página;
- Painéis laterais;
- Painel central.

### `src/styles/pages/`

- Ajustes específicos da tela principal.

### `src/styles/utilities/`

- Classes utilitárias;
- Responsividade;
- Estados auxiliares.

---

## Fluxo geral da aplicação

1. Usuário acessa o Time-Task.
2. Aplicação carrega estado inicial.
3. Usuário cria uma missão com título, tempo e microtarefas.
4. Sistema valida os dados.
5. Usuário inicia a missão.
6. Timer começa a contagem regressiva.
7. Usuário marca microtarefas como concluídas.
8. Sistema atualiza progresso.
9. Usuário pode pausar, retomar, reiniciar, cancelar ou finalizar.
10. Ao finalizar, sistema calcula resultado.
11. Missão é salva no histórico local.
12. Usuário pode repetir missão ou salvar modelo.
13. Modelos e histórico ficam disponíveis para reutilização.

---

## Limites arquiteturais da versão inicial

- Sem backend.
- Sem autenticação.
- Sem banco de dados externo.
- Sem sincronização entre dispositivos.
- Sem dependência obrigatória de bibliotecas externas.
- Sem calendário.
- Sem notificações avançadas.
- Sem dashboard complexo.
- JavaScript ainda não modularizado completamente.
- Persistência da missão ativa após recarregamento ainda pendente.

---

## Observações

A arquitetura do Time-Task deve respeitar a proposta do produto:

> **Abrir, definir, executar e finalizar.**

Toda decisão técnica deve evitar transformar a aplicação em um sistema pesado demais.

A evolução deve ocorrer por pequenas versões, sempre mantendo a experiência simples e rápida.
