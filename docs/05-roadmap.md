# Roadmap

## Versão atual

### v0.1 - Núcleo funcional da missão

Status: Em desenvolvimento avançado

Objetivo:
Criar a primeira versão funcional do Time-Task, permitindo que o usuário crie uma missão simples, defina um tempo, adicione microtarefas, acompanhe a execução pelo timer, finalize a sessão e reutilize missões por histórico ou modelos.

Funcionalidades implementadas:
- Criar missão com título.
- Definir tempo total.
- Limitar tempo máximo da missão.
- Exibir tempo em minutos ou horas.
- Adicionar microtarefas dinamicamente.
- Remover microtarefas.
- Limitar quantidade de microtarefas.
- Iniciar timer regressivo.
- Pausar e retomar missão.
- Reiniciar missão.
- Cancelar missão.
- Finalizar missão manualmente.
- Finalizar missão automaticamente ao chegar em zero.
- Marcar e desmarcar microtarefas concluídas.
- Exibir progresso da sessão.
- Registrar missões finalizadas no histórico local.
- Abrir e fechar painel lateral de histórico.
- Atualizar histórico quando estiver aberto.
- Repetir missão pelo histórico.
- Excluir item individual do histórico.
- Apagar histórico completo com confirmação.
- Salvar missão como modelo.
- Abrir modal de modelos salvos.
- Usar modelo salvo.
- Excluir modelo salvo com confirmação.
- Exibir modal de confirmação para ações perigosas.
- Refatorar e organizar o CSS da tela principal.
- Criar layout desktop funcional.

Pendências para fechar a v0.1:
- Finalizar testes manuais principais.
- Corrigir bugs encontrados nos testes.
- Ajustar responsividade mobile.
- Validar acessibilidade básica.
- Recuperar missão ativa após recarregar a página.
- Revisar textos finais da interface.
- Atualizar documentação final da v0.1.
- Atualizar README.
- Registrar changelog completo.
- Criar tag da versão, se desejado.

Critérios para fechar a versão:
- O usuário consegue criar uma missão válida.
- O timer funciona corretamente.
- A pausa e a retomada preservam o tempo restante.
- A finalização salva o histórico corretamente.
- O histórico pode ser consultado, atualizado e limpo.
- Modelos podem ser salvos, usados e excluídos.
- Ações perigosas usam confirmação.
- O limite de tempo funciona corretamente.
- A interface desktop está visualmente estável.
- A interface mobile possui comportamento aceitável.
- Os testes manuais principais foram executados.
- A documentação foi atualizada.

---

## Próximas versões

### v0.2 - Persistência e segurança dos dados locais

Objetivo:
Melhorar o armazenamento local e reduzir risco de perda de dados durante o uso.

Funcionalidades planejadas:
- Salvar missão ativa no `localStorage`.
- Recuperar missão ativa após recarregar a página.
- Detectar dados locais inválidos ou corrompidos.
- Criar opção de limpar todos os dados com confirmação.
- Adicionar exportação/importação simples de dados.
- Revisar limites do histórico e modelos.
- Melhorar mensagens quando não houver dados.
- Criar testes específicos para persistência local.

---

### v0.3 - Responsividade e experiência mobile

Objetivo:
Adaptar a aplicação para uso confortável em celulares e tablets.

Funcionalidades planejadas:
- Layout mobile em coluna única.
- Histórico como modal ou painel em tela cheia no mobile.
- Botões maiores para toque.
- Ajuste de tamanho do timer em telas pequenas.
- Ajuste de altura da lista de tarefas.
- Evitar rolagem horizontal.
- Melhorar espaçamento entre painéis.
- Testar em diferentes larguras de tela.
- Revisar comportamento de teclado virtual em campos.

---

### v0.4 - Organização interna e manutenção

Objetivo:
Refatorar o JavaScript e o CSS para facilitar crescimento do projeto.

Funcionalidades planejadas:
- Separar `main.js` em módulos.
- Criar módulo de timer.
- Criar módulo de tarefas.
- Criar módulo de histórico.
- Criar módulo de modelos.
- Criar módulo de armazenamento.
- Criar módulo de validação.
- Separar CSS em base, componentes, layout, página e utilitários.
- Criar constantes reutilizáveis.
- Melhorar nomes de funções e responsabilidades.

---

### v0.5 - Experiência de foco

Objetivo:
Adicionar pequenos recursos de experiência sem transformar o projeto em um sistema complexo.

Funcionalidades planejadas:
- Sons opcionais ao iniciar, pausar e finalizar.
- Vibração em dispositivos compatíveis.
- Modo tela cheia ou modo foco.
- Mensagens motivacionais curtas.
- Aviso quando houver muitas microtarefas para pouco tempo.
- Melhor feedback final da sessão.
- Opção de ocultar ações extras durante a execução.

---

### v0.6 - Organização e estatísticas simples

Objetivo:
Adicionar uma camada leve de acompanhamento de uso.

Funcionalidades planejadas:
- Categorias simples para missões.
- Total de sessões realizadas.
- Tempo total focado.
- Média de conclusão das microtarefas.
- Melhor tempo médio por missão.
- Filtro de histórico por categoria.
- Separação visual entre missões completas, parciais e canceladas.

---

### v1.0 - Primeira versão estável

Objetivo:
Considerar o Time-Task minimamente completo como aplicação web de foco imediato.

Critérios para fechar a versão:
- Timer confiável.
- Interface responsiva.
- Missões, microtarefas, histórico, modelos e configurações funcionando.
- Dados salvos corretamente no armazenamento local.
- Recuperação de sessão ativa implementada.
- Histórico e modelos estáveis.
- Ações perigosas protegidas por confirmação.
- Testes manuais concluídos.
- Documentação atualizada.
- README completo.
- Changelog atualizado.
- Código organizado o suficiente para manutenção.
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
- Integração futura com aplicação maior de estudos.
- Sugestão automática de tempo com base em sessões anteriores.
- Comparação entre tempo planejado e tempo realmente usado.
- Tema claro/escuro.
- Configurações de limite de tempo.
- Atalhos de teclado.
