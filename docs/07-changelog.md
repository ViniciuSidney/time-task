# Changelog

Todas as mudanças importantes deste projeto serão registradas aqui.

O formato segue uma organização simples por versão, separando mudanças adicionadas, alteradas, corrigidas, refatoradas e removidas.

---

## [v0.1] - Em desenvolvimento

### Adicionado

- Definição inicial do projeto Time-Task.
- Documentação inicial da aplicação.
- Descrição da visão geral do projeto.
- Definição dos requisitos funcionais e não funcionais.
- Definição dos fluxos principais e telas iniciais.
- Definição dos dados principais e da arquitetura inicial.
- Criação do roadmap inicial.
- Criação do documento de testes manuais.
- Estrutura inicial do changelog.
- Layout visual inicial da tela principal.
- Identidade visual escura com tons verde/azulados.
- Painel lateral de orientações.
- Painel lateral de ações extras.
- Painel central da missão.
- Campo para nome da missão.
- Campo para tempo da missão.
- Lista de microtarefas.
- Criação dinâmica de microtarefas.
- Remoção de microtarefas.
- Marcação de microtarefas como concluídas.
- Limite recomendado de microtarefas.
- Validação para impedir missão sem título.
- Validação para impedir missão sem tempo válido.
- Validação para impedir missão sem microtarefas preenchidas.
- Timer regressivo funcional.
- Pré-visualização do tempo no timer.
- Estado de missão em execução.
- Estado de missão pausada.
- Pausa e retomada do timer.
- Reinício de missão.
- Cancelamento de missão.
- Finalização manual da missão.
- Finalização automática quando o tempo chega a zero.
- Exibição de progresso por tarefas concluídas.
- Registro de missões finalizadas no histórico local.
- Painel lateral de histórico.
- Repetição de missão pelo histórico.
- Exclusão individual de item do histórico.
- Exclusão completa do histórico.
- Atualização automática do histórico quando aberto.
- Salvamento de missões como modelos.
- Modal de modelos salvos.
- Uso de modelo salvo na tela inicial.
- Exclusão de modelo salvo.
- Modal de confirmação para ações perigosas.
- Fechamento de modais por botão, clique fora e tecla Esc.
- Limite máximo de tempo para missões.
- Formatação de tempo em minutos e horas.
- Exibição do timer em `MM:SS` e `HH:MM:SS`.
- Exibição de tempo planejado e tempo usado no histórico.
- Correção visual para autofill do navegador.

### Alterado

- Nome provisório da aplicação definido como Time-Task.
- Botão principal da tela inicial ajustado para “Começar Missão”.
- Mensagens de orientação passaram a mudar dinamicamente conforme ações do usuário.
- Painel de ações extras passou a exibir botões diferentes conforme o estado da missão.
- Ações perigosas deixaram de depender de confirmação dupla por mensagem e passaram a usar modal.
- O campo de tempo passou a normalizar minutos para horas quando necessário.
- Histórico passou a mostrar tempo planejado e tempo realmente usado.
- Tela finalizada passou a oferecer ações como nova missão, repetir missão e salvar modelo.

### Corrigido

- Corrigido vazamento do botão “Salvar Modelo” para fora do painel de ações extras.
- Corrigido desalinhamento visual dos botões do painel de ações extras.
- Corrigida variação de posição do painel de ações extras conforme quantidade de botões.
- Corrigida variação de altura do painel de orientações conforme tamanho da mensagem.
- Corrigido histórico que não atualizava quando estava aberto durante a finalização de uma missão.
- Corrigido fundo branco em campos causado pelo preenchimento automático do navegador.
- Corrigida leitura incorreta de tempo em horas, que interpretava “2 horas” como “2 minutos”.
- Ajustada exibição de timer para comportar horas sem quebrar visualmente.

### Refatorado

- CSS da página inicial organizado em seções.
- Variáveis visuais centralizadas no `:root`.
- Gradientes, sombras, raios e dimensões principais padronizados.
- Regras repetidas de botões, tarefas, estados e painéis consolidadas.
- Estrutura visual da página reorganizada para facilitar manutenção.
- Painéis laterais estabilizados com altura fixa.
- Regras de estados da aplicação agrupadas.

### Removido

- Confirmação dupla textual para ações perigosas, substituída por modal de confirmação.
- Regras CSS duplicadas após refatoração do arquivo `home.css`.

---

## [v0.1] - 30/06/2026

### Adicionado

- Definição inicial do projeto Time-Task.
- Documentação inicial da aplicação.
- Descrição da visão geral do projeto.
- Definição dos requisitos funcionais e não funcionais.
- Definição dos fluxos principais e telas iniciais.
- Definição dos dados principais e da arquitetura inicial.
- Criação do roadmap inicial.
- Criação do documento de testes manuais.
- Estrutura inicial do changelog.

### Alterado

- Nome provisório da aplicação definido como Time-Task.

### Corrigido

- Nenhuma correção registrada neste momento inicial.

### Removido

- Nenhuma remoção registrada neste momento inicial.
