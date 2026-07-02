# Fluxos e Telas

## Visão geral da interface

O Time-Task funciona como uma aplicação de página única, organizada em estados visuais.

A estrutura principal é composta por:

- Cabeçalho com o nome da aplicação.
- Painel lateral esquerdo de orientações.
- Painel lateral esquerdo de ações extras.
- Painel central da missão.
- Painel lateral direito de histórico, quando aberto.
- Modais sobrepostos para confirmação e modelos.

A aplicação não precisa trocar de página para mudar de etapa. Ela altera o estado visual conforme a missão avança.

Estados principais:

- `initial`: criação de missão.
- `running`: missão em execução.
- `paused`: missão pausada.
- `finished`: missão finalizada.
- `history=open`: histórico lateral aberto.
- modal de confirmação aberto.
- modal de modelos aberto.

---

## Telas principais

### Tela 1 - Início / Criar missão

Objetivo:
Permitir que o usuário crie rapidamente uma nova missão de foco, definindo o que será feito, quanto tempo terá e quais microtarefas devem ser cumpridas.

Elementos:
- Timer zerado ou pré-visualização do tempo.
- Campo para nome da missão.
- Campo para tempo da missão.
- Lista de microtarefas.
- Botão para adicionar microtarefa.
- Botão para começar missão.
- Painel de orientações.
- Painel de ações extras.
- Botão para abrir histórico.
- Botão para abrir modelos.

Ações do usuário:
- Informar o nome da missão.
- Definir o tempo total.
- Adicionar microtarefas.
- Remover microtarefas.
- Carregar um modelo salvo.
- Iniciar a missão.
- Abrir histórico.
- Abrir modelos.

Estados importantes:
- Estado vazio: campos sem dados e lista inicial de microtarefas vazias.
- Estado com dados: nome, tempo e microtarefas preenchidos.
- Estado de erro: aviso se o usuário tentar iniciar sem título, sem tempo válido ou sem microtarefas.
- Estado de limite: aviso se o tempo ultrapassar o máximo permitido ou se o número máximo de microtarefas for atingido.

Observações:
- O campo de tempo pode receber minutos.
- Quando o valor for maior que 59 minutos, a aplicação exibe o tempo em horas.
- O tempo máximo atual é limitado para evitar missões exageradas.

---

### Tela 2 - Execução da missão

Objetivo:
Acompanhar a missão em andamento, mostrando o tempo restante, a missão principal e a lista de microtarefas que devem ser concluídas.

Elementos:
- Timer em destaque.
- Nome da missão.
- Tempo planejado.
- Lista de microtarefas com checkbox.
- Contador de tarefas concluídas.
- Botão para adicionar tarefa.
- Botão para finalizar missão.
- Botão para pausar.
- Botão para reiniciar.
- Botão para cancelar.
- Botões para histórico e modelos.
- Mensagem de orientação dinâmica.

Ações do usuário:
- Marcar microtarefas como concluídas.
- Desmarcar microtarefas.
- Adicionar tarefa durante a execução.
- Pausar o timer.
- Retomar o timer.
- Reiniciar a missão.
- Cancelar a missão.
- Finalizar a missão manualmente.
- Aguardar o fim automático do tempo.

Estados importantes:
- Estado com dados: missão em andamento.
- Estado pausado: timer congelado e botão alterado para retomar.
- Estado perto do fim: timer muda visualmente quando resta pouco tempo.
- Estado de confirmação: ações perigosas usam modal antes de executar.
- Estado de erro: mensagem de orientação em caso de ação inválida.

---

### Tela 3 - Missão pausada

Objetivo:
Permitir que o usuário interrompa temporariamente uma missão sem perder o tempo restante.

Elementos:
- Timer congelado.
- Missão atual.
- Lista de microtarefas.
- Botão de retomar.
- Botão de finalizar.
- Botões de reiniciar e cancelar.
- Mensagem de orientação informando que a missão está pausada.

Ações do usuário:
- Retomar missão.
- Finalizar missão.
- Reiniciar missão.
- Cancelar missão.
- Marcar ou desmarcar tarefas, se permitido.

Estados importantes:
- Estado pausado: não há contagem regressiva.
- Estado retomado: contagem volta do tempo restante.
- Estado cancelado: volta para a tela inicial.
- Estado finalizado: salva no histórico.

---

### Tela 4 - Finalização / Resultado da missão

Objetivo:
Mostrar o estado final da missão e permitir a próxima ação do usuário.

Elementos:
- Timer parado.
- Nome da missão.
- Tempo planejado.
- Lista final das microtarefas.
- Quantidade de microtarefas concluídas.
- Botão para nova missão.
- Botão para limpar missão atual.
- Botão para repetir missão.
- Botão para salvar modelo.
- Botão para acessar histórico.

Ações do usuário:
- Criar nova missão.
- Repetir a missão finalizada.
- Salvar a missão como modelo.
- Abrir histórico.
- Limpar a missão atual.
- Excluir dados com confirmação, quando aplicável.

Estados importantes:
- Estado concluído manualmente: missão salva no histórico.
- Estado finalizado por tempo encerrado: missão salva no histórico.
- Estado com tarefas parcialmente concluídas: histórico registra o progresso real.
- Estado de confirmação: limpar missão atual exige confirmação.

---

### Tela 5 - Histórico aberto

Objetivo:
Permitir que o usuário visualize sessões finalizadas e reutilize missões anteriores.

Elementos:
- Painel lateral direito.
- Título “Histórico”.
- Botão de fechar painel.
- Lista de cards de missões finalizadas.
- Nome da missão.
- Data e hora da finalização.
- Quantidade de tarefas concluídas.
- Tempo planejado.
- Tempo realmente usado.
- Botão de repetir missão.
- Botão de excluir item.
- Botão de apagar histórico.

Ações do usuário:
- Abrir histórico.
- Fechar histórico.
- Ver missões finalizadas.
- Repetir missão antiga.
- Excluir item do histórico.
- Apagar todo o histórico.

Estados importantes:
- Estado vazio: mensagem informando que não há missões no histórico.
- Estado com dados: lista de missões.
- Estado atualizado: se uma missão for finalizada com o histórico aberto, a lista atualiza automaticamente.
- Estado de confirmação: excluir item ou apagar tudo exige modal de confirmação.

---

### Tela 6 - Modal de confirmação

Objetivo:
Evitar que ações perigosas sejam executadas por acidente.

Elementos:
- Fundo escurecido.
- Caixa modal.
- Título da ação.
- Mensagem explicando a consequência.
- Botão de voltar/cancelar.
- Botão de confirmação.
- Botão de fechar.

Ações que usam confirmação:
- Reiniciar missão.
- Cancelar missão.
- Limpar missão atual.
- Excluir item do histórico.
- Apagar todo o histórico.
- Excluir modelo salvo.

Estados importantes:
- Estado aberto: ação fica aguardando confirmação.
- Estado cancelado: modal fecha sem executar ação.
- Estado confirmado: ação é executada e o modal fecha.
- Estado fechado por `Esc` ou clique fora: ação não é executada.

---

### Tela 7 - Modal de modelos

Objetivo:
Permitir que o usuário acesse missões salvas como modelos e reutilize rapidamente uma estrutura pronta.

Elementos:
- Fundo escurecido.
- Caixa modal maior.
- Título “Modelos Salvos”.
- Lista de modelos.
- Nome do modelo.
- Data de criação.
- Tempo planejado.
- Quantidade de tarefas.
- Botão de usar modelo.
- Botão de excluir modelo.
- Botão de fechar.

Ações do usuário:
- Abrir modelos.
- Usar modelo.
- Excluir modelo.
- Fechar modal.

Estados importantes:
- Estado vazio: mensagem informando que nenhum modelo foi salvo.
- Estado com dados: lista de modelos.
- Estado carregado: modelo preenche a tela inicial.
- Estado bloqueado: se houver missão em andamento, o usuário deve finalizar ou cancelar antes de usar modelo.
- Estado de confirmação: excluir modelo exige confirmação.

---

## Fluxos principais

### Fluxo 1 - Criar e iniciar missão

1. Usuário acessa a tela inicial.
2. Usuário informa o nome da missão.
3. Usuário define o tempo total.
4. Sistema atualiza a prévia do timer.
5. Usuário adiciona uma ou mais microtarefas.
6. Sistema valida título, tempo e tarefas.
7. Usuário clica em começar missão.
8. Sistema cria a missão ativa.
9. Sistema trava os campos principais.
10. Sistema altera o estado para execução.
11. Timer começa a contagem regressiva.

### Fluxo 2 - Executar missão

1. Usuário está na tela de execução.
2. Sistema exibe tempo restante.
3. Usuário realiza as ações no mundo real.
4. Usuário marca microtarefas como concluídas.
5. Sistema atualiza o progresso.
6. Usuário pode adicionar nova tarefa, se ainda estiver dentro do limite.
7. Usuário pode pausar, reiniciar, cancelar ou finalizar.
8. Sistema atualiza as mensagens de orientação conforme as ações.

### Fluxo 3 - Pausar e retomar missão

1. Usuário clica em pausar.
2. Sistema interrompe a contagem regressiva.
3. Sistema altera o estado para pausado.
4. Mensagem informa que a missão está pausada.
5. Usuário clica em retomar.
6. Sistema recalcula o prazo com base no tempo restante.
7. Timer continua a partir do ponto pausado.

### Fluxo 4 - Finalizar missão manualmente

1. Usuário clica em finalizar missão.
2. Sistema encerra o timer.
3. Sistema calcula tarefas concluídas.
4. Sistema calcula tempo realmente usado.
5. Sistema salva o registro no histórico.
6. Sistema altera o estado para finalizado.
7. Sistema exibe ações de nova missão, repetir, salvar modelo e limpar missão atual.

### Fluxo 5 - Finalizar missão por tempo encerrado

1. Timer chega a zero.
2. Sistema encerra automaticamente a missão.
3. Sistema calcula tarefas concluídas.
4. Sistema registra a missão no histórico.
5. Sistema informa que o tempo foi encerrado.
6. Sistema mantém o resultado disponível na tela.

### Fluxo 6 - Abrir histórico e repetir missão

1. Usuário clica em histórico.
2. Sistema abre o painel lateral direito.
3. Sistema carrega os registros do `localStorage`.
4. Usuário escolhe uma missão.
5. Usuário clica em repetir missão.
6. Sistema cria uma nova missão com mesmo título, tempo e tarefas.
7. Timer inicia uma nova execução.

### Fluxo 7 - Salvar e usar modelo

1. Usuário finaliza uma missão.
2. Usuário clica em salvar modelo.
3. Sistema grava o modelo no `localStorage`.
4. Sistema abre o modal de modelos.
5. Em outro momento, usuário clica em modelos.
6. Sistema lista modelos salvos.
7. Usuário clica em usar modelo.
8. Sistema carrega título, tempo e tarefas na tela inicial.
9. Usuário revisa e inicia a missão.

### Fluxo 8 - Executar ação perigosa

1. Usuário clica em uma ação perigosa.
2. Sistema abre o modal de confirmação.
3. Usuário lê a mensagem.
4. Usuário pode voltar/cancelar.
5. Se confirmar, o sistema executa a ação.
6. Modal é fechado.
7. Interface é atualizada.
