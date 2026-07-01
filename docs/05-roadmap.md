# Roadmap

## Versão atual

### v0.1 - Núcleo de foco

Status: Em desenvolvimento

Objetivo:
Criar a primeira versão funcional do Time-Task, permitindo que o usuário crie uma missão simples, defina um tempo, adicione microtarefas e acompanhe a execução pelo timer.

Funcionalidades:
- Criar uma missão com título.
- Definir o tempo total da sessão.
- Adicionar microtarefas curtas.
- Iniciar o timer regressivo.
- Pausar e continuar a sessão.
- Finalizar a sessão manualmente.
- Marcar microtarefas como concluídas.
- Exibir progresso da sessão.
- Salvar a sessão atual no armazenamento local.
- Construir layout responsivo para computador e celular.

Critérios para fechar a versão:
- O usuário consegue criar uma missão válida.
- O timer funciona corretamente.
- A pausa e a continuação preservam o tempo restante.
- As microtarefas podem ser marcadas como concluídas.
- O progresso da sessão é atualizado visualmente.
- A sessão não é perdida ao recarregar a página.
- A interface funciona bem em tela desktop e mobile.

---

## Próximas versões

### v0.2 - Histórico e repetição

Objetivo:
Adicionar persistência mais útil ao projeto, permitindo que o usuário consulte sessões anteriores e repita missões já realizadas.

Funcionalidades planejadas:
- Histórico de sessões finalizadas.
- Registro de duração, data e quantidade de microtarefas concluídas.
- Botão para repetir uma sessão anterior.
- Opção para limpar o histórico.
- Mensagem de confirmação antes de apagar dados.
- Melhor organização visual da tela de resultado.

---

### v0.3 - Modelos e experiência de foco

Objetivo:
Melhorar a experiência de uso e reduzir o tempo necessário para iniciar uma sessão.

Funcionalidades planejadas:
- Criar modelos de sessão.
- Reutilizar modelos salvos.
- Sons ao iniciar, pausar e finalizar.
- Modo tela cheia ou modo foco.
- Tema claro e escuro.
- Ajustes finos de acessibilidade visual.
- Feedback final mais completo da sessão.

---

### v0.4 - Organização e estatísticas simples

Objetivo:
Adicionar uma camada leve de organização sem transformar o projeto em um gerenciador complexo de tarefas.

Funcionalidades planejadas:
- Categorias simples para as sessões.
- Estatísticas básicas de uso.
- Total de sessões realizadas.
- Tempo total focado.
- Média de conclusão das microtarefas.
- Filtro de histórico por categoria.
- Aviso quando houver muitas microtarefas para pouco tempo.

---

### v1.0 - Primeira versão estável

Objetivo:
Considerar o Time-Task minimamente completo como aplicação web de foco imediato, com boa experiência em computador e celular.

Critérios para fechar a versão:
- Timer confiável mesmo com a aba em segundo plano.
- Interface responsiva e confortável em dispositivos móveis.
- Sessões, microtarefas, histórico, modelos e configurações funcionando.
- Dados salvos corretamente no armazenamento local.
- Experiência visual consistente.
- Testes manuais principais concluídos.
- Documentação atualizada.
- README completo.
- Changelog atualizado.
- Possibilidade de instalação como PWA avaliada ou implementada.

---

## Ideias futuras

- Transformar a aplicação em PWA instalável.
- Funcionamento offline mais completo.
- Notificações simples ao finalizar o timer.
- Vibração em dispositivos móveis.
- Exportação e importação de dados.
- Cronômetro progressivo além do timer regressivo.
- Modo Pomodoro.
- Sessões recorrentes.
- Atalhos rápidos para iniciar missões comuns.
- Frases curtas de foco durante a sessão.
- Integração futura com uma aplicação maior de estudos.
- Sugestão automática de tempo com base em sessões anteriores.
- Comparação entre tempo planejado e tempo realmente usado.
