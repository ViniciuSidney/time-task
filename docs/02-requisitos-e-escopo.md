# Requisitos e Escopo

## Requisitos funcionais

- RF01 - O sistema deve permitir criar uma missão com título.
- RF02 - O sistema deve permitir definir o tempo total da missão.
- RF03 - O sistema deve permitir adicionar microtarefas à missão.
- RF04 - O sistema deve permitir remover microtarefas antes de iniciar a missão.
- RF05 - O sistema deve permitir iniciar o timer da missão.
- RF06 - O sistema deve permitir pausar e continuar o timer.
- RF07 - O sistema deve permitir marcar microtarefas como concluídas durante a execução.
- RF08 - O sistema deve exibir o tempo restante da missão de forma clara.
- RF09 - O sistema deve exibir o progresso da missão com base nas microtarefas concluídas.
- RF10 - O sistema deve permitir finalizar a missão manualmente.
- RF11 - O sistema deve exibir uma tela ou painel de resultado ao final da missão.
- RF12 - O sistema deve salvar localmente a missão atual para evitar perda de dados em recarregamentos simples.
- RF13 - O sistema deve registrar um histórico básico das missões finalizadas.
- RF14 - O sistema deve permitir limpar ou excluir dados salvos localmente com confirmação.

## Requisitos não funcionais

- RNF01 - A aplicação deve ser responsiva.
- RNF02 - A interface deve ser simples e clara.
- RNF03 - Os dados devem ser salvos localmente.
- RNF04 - A aplicação deve carregar rapidamente.
- RNF05 - A aplicação deve funcionar bem em dispositivos móveis e computadores.
- RNF06 - O timer deve ser confiável e calcular o tempo com base no horário real, não apenas em intervalos visuais.
- RNF07 - A aplicação deve ter baixo atrito de uso, permitindo iniciar uma missão rapidamente.
- RNF08 - A interface deve evitar excesso de informações durante a execução da missão.
- RNF09 - A aplicação deve funcionar sem necessidade de conta de usuário na versão inicial.
- RNF10 - Os dados locais devem ser organizados de forma simples para facilitar manutenção futura.

## Escopo da versão atual

### Entra nesta versão

- Criação de uma missão com título.
- Definição de tempo total da missão.
- Cadastro de microtarefas.
- Início do timer.
- Pausa e continuação do timer.
- Marcação de microtarefas concluídas.
- Exibição do tempo restante.
- Exibição de progresso simples.
- Finalização da missão.
- Resultado final da sessão.
- Salvamento local da missão atual.
- Histórico simples das missões concluídas.
- Layout responsivo básico para mobile e desktop.

### Fica para versões futuras

- Templates de missões reutilizáveis.
- Categorias de missão, como estudo, casa, trabalho e pessoal.
- Modo escuro e modo claro.
- Sons e vibração ao finalizar a missão.
- Estatísticas de produtividade.
- Sugestão automática de tempo.
- Aviso de excesso de microtarefas para pouco tempo.
- Modo tela cheia ou modo foco.
- PWA instalável.
- Funcionamento offline mais completo.
- Sincronização entre dispositivos.
- Login e banco de dados.

### Fora do escopo

- Sistema completo de agenda.
- Calendário detalhado.
- Gerenciador avançado de projetos.
- Chat, rede social ou ranking entre usuários.
- Controle rígido de bloqueio de aplicativos externos.
- Integração obrigatória com conta de usuário.
- Dashboard complexo na primeira versão.
- Uso de banco de dados na versão inicial.
