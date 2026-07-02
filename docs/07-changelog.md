# Changelog

Todas as mudanças importantes deste projeto serão registradas aqui.

O formato segue uma organização simples por versão, separando mudanças adicionadas, alteradas, corrigidas, refatoradas e removidas.

---

## [v0.1] - 02/07/2026

Status: concluída

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
- Marcação e desmarcação de microtarefas como concluídas.
- Limite recomendado de microtarefas.
- Validação para impedir missão sem título.
- Validação para impedir missão sem tempo válido.
- Validação para impedir missão sem microtarefas preenchidas.
- Timer regressivo funcional.
- Pré-visualização do tempo no timer.
- Estado de missão em execução.
- Estado de missão pausada.
- Estado de missão finalizada.
- Pausa e retomada do timer.
- Reinício de missão.
- Cancelamento de missão.
- Finalização manual da missão.
- Confirmação antes de finalizar missão manualmente.
- Pausa temporária do timer enquanto o modal de confirmação de finalização está aberto.
- Retomada automática do timer quando a finalização é cancelada.
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
- Bloqueio do uso de modelos durante missão em execução ou pausada.
- Exclusão de modelo salvo.
- Modal de confirmação para ações perigosas.
- Fechamento de modais por botão, clique fora e tecla Esc.
- Modal “Sobre o Time-Task”.
- Frase de apresentação abaixo do título da aplicação.
- Botão de acesso ao modal “Sobre”.
- Favicon da aplicação.
- Título dinâmico da página com tempo restante da missão.
- Título da página indicando missão finalizada ou tempo encerrado.
- Limite máximo de tempo para missões.
- Formatação de tempo em minutos e horas.
- Exibição do timer em `MM:SS` e `HH:MM:SS`.
- Exibição de tempo planejado e tempo usado no histórico.
- Salvamento local do histórico.
- Salvamento local de modelos.
- Salvamento local da missão ativa.
- Recuperação da missão em execução após recarregar a página.
- Recuperação da missão pausada após recarregar a página.
- Recuperação da missão finalizada após recarregar a página.
- Travamento de scroll da página quando modais reais estão abertos.
- Responsividade inicial em arquivo separado.
- Layout responsivo para desktop, tablet e mobile.
- Histórico adaptado para painel sobreposto em telas menores.
- Scroll interno para histórico e modais.
- Estilização das barras de rolagem.
- Correção visual para autofill do navegador.

### Alterado

- Nome provisório da aplicação definido como Time-Task.
- Botão principal da tela inicial ajustado para “Começar Missão”.
- Botão principal muda de função conforme o estado da aplicação.
- Mensagens de orientação passaram a mudar dinamicamente conforme ações do usuário.
- Painel de ações extras passou a exibir botões diferentes conforme o estado da missão.
- Ações perigosas deixaram de depender de confirmação dupla por mensagem e passaram a usar modal.
- O campo de tempo passou a normalizar minutos para horas quando necessário.
- Histórico passou a mostrar tempo planejado e tempo realmente usado.
- Tela finalizada passou a oferecer ações como nova missão, repetir missão e salvar modelo.
- Modal de modelos passou a impedir uso de modelos durante missão ativa.
- Modal de modelos passou a ter rolagem interna ajustada.
- Modal Sobre passou a concentrar informações de versão, criador, objetivo e dados locais.
- Estrutura visual passou a priorizar responsividade sem misturar regras comuns com regras responsivas.
- Scroll da página passou a ser travado somente quando há overlay real aberto.

### Corrigido

- Corrigido vazamento do botão “Salvar Modelo” para fora do painel de ações extras.
- Corrigido desalinhamento visual dos botões do painel de ações extras.
- Corrigida variação de posição do painel de ações extras conforme quantidade de botões.
- Corrigida variação de altura do painel de orientações conforme tamanho da mensagem.
- Corrigido histórico que não atualizava quando estava aberto durante a finalização de uma missão.
- Corrigido fundo branco em campos causado pelo preenchimento automático do navegador.
- Corrigida leitura incorreta de tempo em horas, que interpretava “2 horas” como “2 minutos”.
- Ajustada exibição de timer para comportar horas sem quebrar visualmente.
- Corrigida recuperação da missão ativa após recarregamento.
- Corrigida recuperação da missão pausada após recarregamento.
- Corrigida recuperação da missão finalizada após recarregamento.
- Corrigido painel de histórico que podia estourar verticalmente em telas menores.
- Corrigida trava de scroll aplicada indevidamente em telas intermediárias.
- Corrigido scroll duplo no modal de modelos.
- Corrigido espaçamento desalinhado da barra de rolagem do modal de modelos.
- Corrigida mensagem invisível ao tentar usar modelo durante missão em execução.
- Corrigida inconsistência visual das barras de rolagem.
- Corrigidos ajustes de responsividade em telas menores.

### Refatorado

- CSS da página inicial organizado em seções.
- Variáveis visuais centralizadas no `:root`.
- Gradientes, sombras, raios e dimensões principais padronizados.
- Regras repetidas de botões, tarefas, estados e painéis consolidadas.
- Estrutura visual da página reorganizada para facilitar manutenção.
- Painéis laterais estabilizados.
- Regras de estados da aplicação agrupadas.
- Responsividade movida para `responsive.css`.
- JavaScript principal organizado por seções.
- Seletores DOM agrupados em um objeto `dom`.
- Estado global agrupado em um objeto `state`.
- Estados da aplicação centralizados em constantes.
- Chaves de armazenamento centralizadas.
- Funções de tempo, missão, tarefas, histórico, modelos, modais e armazenamento reorganizadas.

### Removido

- Confirmação dupla textual para ações perigosas, substituída por modal de confirmação.
- Regras CSS duplicadas após refatoração do arquivo `home.css`.
- Scroll duplo do modal de modelos.
- Comportamentos visuais que causavam variação brusca nos painéis laterais.

---

## [v0.1-inicial] - 30/06/2026

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
