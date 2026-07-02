# Requisitos e Escopo

## Requisitos funcionais

### Missões

- RF01 - O sistema deve permitir criar uma missão com título.
- RF02 - O sistema deve permitir definir o tempo total da missão.
- RF03 - O sistema deve limitar o tempo máximo permitido para uma missão.
- RF04 - O sistema deve exibir o tempo em minutos ou em horas, quando o valor for maior que 59 minutos.
- RF05 - O sistema deve validar se a missão possui título, tempo válido e pelo menos uma microtarefa antes de iniciar.
- RF06 - O sistema deve permitir iniciar uma missão válida.
- RF07 - O sistema deve permitir finalizar uma missão manualmente.
- RF08 - O sistema deve finalizar a missão automaticamente quando o timer chegar a zero.
- RF09 - O sistema deve permitir limpar a missão atual e voltar ao estado inicial.

### Timer

- RF10 - O sistema deve exibir o timer em destaque.
- RF11 - O sistema deve iniciar uma contagem regressiva a partir do tempo definido.
- RF12 - O sistema deve permitir pausar o timer.
- RF13 - O sistema deve permitir retomar o timer pausado.
- RF14 - O sistema deve permitir reiniciar a missão atual, restaurando o tempo inicial.
- RF15 - O sistema deve indicar visualmente quando o tempo estiver próximo do fim.
- RF16 - O sistema deve calcular o tempo restante com base no horário real, reduzindo problemas quando a aba estiver em segundo plano.

### Microtarefas

- RF17 - O sistema deve permitir adicionar microtarefas à missão.
- RF18 - O sistema deve permitir remover microtarefas.
- RF19 - O sistema deve limitar a quantidade máxima de microtarefas por missão.
- RF20 - O sistema deve permitir marcar uma microtarefa como concluída.
- RF21 - O sistema deve permitir desmarcar uma microtarefa concluída.
- RF22 - O sistema deve exibir visualmente o estado concluído de uma microtarefa.
- RF23 - O sistema deve exibir o progresso da missão com base nas microtarefas concluídas.

### Histórico

- RF24 - O sistema deve salvar missões finalizadas no histórico local.
- RF25 - O sistema deve exibir uma lista de missões finalizadas.
- RF26 - O sistema deve mostrar no histórico: nome da missão, data, hora, tempo planejado, tempo usado e quantidade de microtarefas concluídas.
- RF27 - O sistema deve permitir repetir uma missão a partir do histórico.
- RF28 - O sistema deve permitir excluir um item individual do histórico.
- RF29 - O sistema deve permitir apagar todo o histórico com confirmação.
- RF30 - O sistema deve atualizar a listagem do histórico quando uma missão for finalizada enquanto o painel estiver aberto.

### Modelos

- RF31 - O sistema deve permitir salvar uma missão finalizada como modelo.
- RF32 - O sistema deve listar os modelos salvos.
- RF33 - O sistema deve permitir carregar um modelo salvo na tela inicial.
- RF34 - O sistema deve permitir excluir um modelo salvo com confirmação.
- RF35 - O sistema deve salvar modelos localmente no navegador.

### Interface e modais

- RF36 - O sistema deve exibir mensagens de orientação dinâmicas ao usuário.
- RF37 - O sistema deve exibir ações extras de acordo com o estado atual da missão.
- RF38 - O sistema deve exibir modal de confirmação para ações perigosas.
- RF39 - O sistema deve exibir modal de modelos salvos.
- RF40 - O sistema deve permitir fechar modais por botão, clique fora ou tecla `Esc`.

## Requisitos não funcionais

- RNF01 - A aplicação deve ser responsiva.
- RNF02 - A interface deve ser simples, clara e direta.
- RNF03 - Os dados devem ser salvos localmente no navegador.
- RNF04 - A aplicação deve carregar rapidamente.
- RNF05 - A aplicação deve funcionar bem em computadores e dispositivos móveis.
- RNF06 - O timer deve ser confiável e calcular o tempo com base no horário real, não apenas em intervalos visuais.
- RNF07 - A aplicação deve ter baixo atrito de uso, permitindo iniciar uma missão rapidamente.
- RNF08 - A interface deve evitar excesso de informações durante a execução da missão.
- RNF09 - A aplicação deve funcionar sem necessidade de conta de usuário na versão inicial.
- RNF10 - Os dados locais devem ser organizados de forma simples para facilitar manutenção futura.
- RNF11 - A aplicação deve evitar ações destrutivas sem confirmação.
- RNF12 - O layout deve preservar consistência visual entre estados: inicial, execução, pausado, finalizado, histórico e modais.
- RNF13 - Os campos devem evitar problemas visuais causados pelo preenchimento automático do navegador.
- RNF14 - O CSS deve ser organizado por responsabilidade para facilitar manutenção.
- RNF15 - A aplicação deve priorizar HTML, CSS e JavaScript puros na versão inicial.

## Escopo da versão atual

### Entra nesta versão

- Criação de missão com título.
- Definição de tempo total.
- Limite máximo de tempo por missão.
- Formatação de tempo em minutos e horas.
- Cadastro dinâmico de microtarefas.
- Remoção de microtarefas.
- Marcação de microtarefas concluídas.
- Timer regressivo.
- Pausa e retomada.
- Reinício de missão.
- Cancelamento de missão.
- Finalização manual.
- Finalização automática quando o tempo acaba.
- Mensagens dinâmicas de orientação.
- Progresso por microtarefas concluídas.
- Histórico local de missões finalizadas.
- Painel lateral de histórico.
- Repetição de missão pelo histórico.
- Exclusão de item do histórico.
- Exclusão total do histórico.
- Modelos de missão salvos localmente.
- Modal de modelos.
- Modal de confirmação para ações perigosas.
- Refatoração e organização do CSS da tela inicial.
- Layout desktop funcional.

### Pendente ainda dentro da v0.1

- Testes manuais completos.
- Ajuste completo da responsividade mobile.
- Melhorias de acessibilidade.
- Recuperação da missão ativa após recarregar a página.
- Revisão final de textos e mensagens de orientação.
- Revisão geral do `main.js` para reduzir duplicações e preparar modularização futura.
- Pequenos ajustes visuais finais antes do fechamento da versão.

### Fica para versões futuras

- Separação completa do JavaScript em módulos.
- Configurações gerais da aplicação.
- Tema claro e escuro.
- Sons ao iniciar, pausar e finalizar.
- Vibração em dispositivos móveis.
- Estatísticas de produtividade.
- Categorias de missão.
- Filtros no histórico.
- Exportação e importação de dados.
- Modo tela cheia ou modo foco.
- PWA instalável.
- Funcionamento offline mais completo.
- Sincronização entre dispositivos.
- Login e banco de dados.
- Integração com outras aplicações de estudo ou produtividade.

### Fora do escopo

- Sistema completo de agenda.
- Calendário detalhado.
- Gerenciador avançado de projetos.
- Chat, rede social ou ranking entre usuários.
- Bloqueio real de aplicativos externos.
- Integração obrigatória com conta de usuário.
- Dashboard complexo na primeira versão.
- Banco de dados externo na versão inicial.
- Sistema colaborativo multiusuário.
