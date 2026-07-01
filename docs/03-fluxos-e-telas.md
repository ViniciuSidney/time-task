# Fluxos e Telas

## Telas principais

### Tela 1 - Início / Criar missão

Objetivo:
Permitir que o usuário crie rapidamente uma nova missão de foco, definindo o que será feito, quanto tempo terá e quais microtarefas devem ser cumpridas.

Elementos:
- Campo para nome da missão.
- Campo ou seletor para tempo total.
- Campo para adicionar microtarefas.
- Lista de microtarefas adicionadas.
- Botão para iniciar missão.
- Atalho para acessar o histórico.
- Mensagem de orientação para o usuário.

Ações do usuário:
- Informar o nome da missão.
- Definir o tempo total.
- Adicionar uma microtarefa.
- Remover uma microtarefa antes de iniciar.
- Iniciar a missão.
- Acessar histórico.

Estados importantes:
- Estado vazio: aparece uma mensagem orientando o usuário a criar uma missão e adicionar pelo menos uma microtarefa.
- Estado com dados: aparece a missão montada, com tempo definido e lista de microtarefas.
- Estado de erro: aparece aviso caso o usuário tente iniciar sem título, sem tempo válido ou sem microtarefas.

---

### Tela 2 - Execução da missão

Objetivo:
Acompanhar a missão em andamento, mostrando o tempo restante, a tarefa principal e a lista de microtarefas que devem ser concluídas.

Elementos:
- Nome da missão.
- Timer em destaque.
- Lista de microtarefas com checkbox.
- Indicador de progresso.
- Botão de pausar.
- Botão de continuar.
- Botão de finalizar.
- Aviso visual quando o tempo estiver perto de acabar.

Ações do usuário:
- Marcar microtarefas como concluídas.
- Desmarcar microtarefas se necessário.
- Pausar o timer.
- Continuar o timer.
- Finalizar a missão antes do tempo.
- Aguardar o fim automático do tempo.

Estados importantes:
- Estado vazio: não deve aparecer diretamente; caso não exista missão ativa, o sistema deve voltar para a tela de criação.
- Estado com dados: aparece a missão em andamento com tempo e microtarefas.
- Estado pausado: o timer fica congelado e o usuário pode continuar ou finalizar.
- Estado de erro: aparece aviso se houver falha ao recuperar os dados da missão.

---

### Tela 3 - Resultado da missão

Objetivo:
Mostrar ao usuário um resumo simples da sessão finalizada, reforçando o progresso e permitindo uma próxima ação.

Elementos:
- Nome da missão concluída.
- Tempo planejado.
- Tempo utilizado.
- Quantidade de microtarefas concluídas.
- Lista final das microtarefas.
- Botão para criar nova missão.
- Botão para repetir missão.
- Botão para salvar como modelo futuramente, caso essa função exista.

Ações do usuário:
- Ver o resultado.
- Criar uma nova missão.
- Repetir a missão.
- Voltar ao início.
- Ver histórico.

Estados importantes:
- Estado vazio: se não houver resultado, o sistema volta para a tela inicial.
- Estado com dados: aparece o resumo da missão finalizada.
- Estado de erro: aparece aviso se o resultado não puder ser carregado.

---

### Tela 4 - Histórico simples

Objetivo:
Permitir que o usuário visualize sessões já finalizadas e acompanhe seu uso recente da aplicação.

Elementos:
- Lista de missões finalizadas.
- Data e horário da sessão.
- Tempo definido.
- Quantidade de microtarefas concluídas.
- Botão para repetir uma missão.
- Botão para apagar histórico, com confirmação.

Ações do usuário:
- Visualizar missões anteriores.
- Repetir uma missão antiga.
- Apagar item do histórico.
- Apagar todo o histórico.
- Voltar para a tela inicial.

Estados importantes:
- Estado vazio: aparece uma mensagem informando que nenhuma missão foi concluída ainda.
- Estado com dados: aparece a lista de missões finalizadas.
- Estado de erro: aparece aviso caso o histórico não possa ser carregado.

---

## Fluxos principais

### Fluxo 1 - Criar e iniciar missão

1. Usuário acessa a tela inicial.
2. Usuário informa o nome da missão.
3. Usuário define o tempo total.
4. Usuário adiciona uma ou mais microtarefas.
5. Sistema valida se os dados mínimos foram preenchidos.
6. Usuário clica em iniciar.
7. Sistema cria a missão ativa e abre a tela de execução.

---

### Fluxo 2 - Executar missão

1. Usuário está na tela de execução.
2. Sistema inicia a contagem regressiva.
3. Usuário realiza as ações no mundo real.
4. Usuário marca microtarefas como concluídas.
5. Sistema atualiza o progresso da missão.
6. Usuário pode pausar, continuar ou finalizar.
7. Quando o tempo termina, o sistema abre a tela de resultado.

---

### Fluxo 3 - Pausar e continuar missão

1. Usuário está com uma missão em andamento.
2. Usuário clica em pausar.
3. Sistema interrompe temporariamente a contagem.
4. Usuário clica em continuar.
5. Sistema recalcula o tempo restante e retoma a missão.
6. Usuário continua a execução normalmente.

---

### Fluxo 4 - Finalizar missão manualmente

1. Usuário está com uma missão em andamento.
2. Usuário clica em finalizar.
3. Sistema pede confirmação para evitar encerramento acidental.
4. Usuário confirma a finalização.
5. Sistema salva o resultado da missão.
6. Sistema mostra a tela de resultado.

---

### Fluxo 5 - Ver histórico e repetir missão

1. Usuário acessa a tela de histórico.
2. Sistema lista as missões finalizadas.
3. Usuário escolhe uma missão antiga.
4. Usuário clica em repetir.
5. Sistema carrega título, tempo e microtarefas da missão escolhida.
6. Usuário pode ajustar os dados ou iniciar novamente.
