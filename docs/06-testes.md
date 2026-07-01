# Testes

## Informações

Projeto: Time-Task  
Versão testada: v0.1  
Data: 30/06/2026

---

## Testes principais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| T01 | Abrir a aplicação | A tela principal deve carregar sem erros visuais ou mensagens no console | Pendente |
| T02 | Criar missão com título e tempo válidos | A missão deve ser criada e exibida na tela de execução | Pendente |
| T03 | Tentar criar missão sem título | O sistema deve impedir a criação e exibir uma mensagem de validação | Pendente |
| T04 | Tentar criar missão sem tempo definido | O sistema deve impedir a criação e exibir uma mensagem de validação | Pendente |
| T05 | Tentar criar missão com tempo igual ou menor que zero | O sistema deve impedir a criação e orientar o usuário | Pendente |
| T06 | Adicionar uma microtarefa | A microtarefa deve aparecer na lista da missão | Pendente |
| T07 | Adicionar várias microtarefas | Todas as microtarefas devem aparecer na ordem correta | Pendente |
| T08 | Iniciar o timer | O timer deve começar a contagem regressiva | Pendente |
| T09 | Pausar o timer | A contagem deve parar e preservar o tempo restante | Pendente |
| T10 | Continuar o timer pausado | A contagem deve continuar a partir do tempo restante | Pendente |
| T11 | Marcar microtarefa como concluída | A microtarefa deve mudar de estado visual e o progresso deve ser atualizado | Pendente |
| T12 | Desmarcar microtarefa concluída | A microtarefa deve voltar ao estado pendente e o progresso deve ser recalculado | Pendente |
| T13 | Finalizar sessão manualmente | O sistema deve encerrar a sessão e exibir o resultado | Pendente |
| T14 | Deixar o timer chegar a zero | O sistema deve finalizar a sessão automaticamente | Pendente |
| T15 | Recarregar a página durante uma sessão | A aplicação deve recuperar a sessão em andamento, se houver salvamento local | Pendente |
| T16 | Abrir a aplicação em tela pequena | A interface deve se adaptar corretamente ao mobile | Pendente |
| T17 | Usar botões em dispositivo móvel | Os botões devem ser fáceis de tocar e não devem ficar cortados | Pendente |
| T18 | Finalizar sessão sem concluir todas as microtarefas | O resultado deve mostrar quantas tarefas foram concluídas | Pendente |

---

## Testes de armazenamento local

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| S01 | Criar sessão e atualizar dados | Os dados devem ser gravados no `localStorage` | Pendente |
| S02 | Recarregar a página após criar uma sessão | Os dados salvos devem ser recuperados | Pendente |
| S03 | Finalizar sessão | A sessão atual deve ser removida ou marcada como finalizada corretamente | Pendente |
| S04 | Limpar dados locais, quando a função existir | Os dados devem ser apagados apenas após confirmação | Pendente |

---

## Testes de responsividade

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| R01 | Testar em largura de celular | Layout deve ficar em coluna única, sem cortes horizontais | Pendente |
| R02 | Testar em largura de tablet | Layout deve manter boa leitura e espaçamento | Pendente |
| R03 | Testar em desktop | Layout deve aproveitar o espaço sem ficar espalhado demais | Pendente |
| R04 | Testar campos e botões no mobile | Elementos devem ter tamanho confortável para toque | Pendente |

---

## Bugs encontrados

### Nenhum bug registrado

Descrição:
Nenhum bug foi registrado até o momento.

Como reproduzir:
Não se aplica.

Status:
Sem ocorrência registrada.

---

## Observações

- Os testes desta versão são manuais.
- A prioridade inicial é validar o fluxo principal: criar missão, iniciar timer, marcar microtarefas e finalizar sessão.
- O timer deve ser testado com atenção, principalmente em pausa, continuação e recarregamento da página.
- Em dispositivos móveis, é importante verificar se o navegador mantém o comportamento correto quando a aba fica em segundo plano.
- A interface deve continuar simples e direta, sem exigir muitos passos para iniciar uma sessão.
