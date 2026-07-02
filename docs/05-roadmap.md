# Roadmap

## Versão atual

### v0.1 - Núcleo funcional da missão

Status: Concluída / pronta para fechamento

Objetivo:
Criar a primeira versão funcional do Time-Task, permitindo que o usuário crie uma missão simples, defina um tempo, adicione microtarefas, acompanhe a execução pelo timer, finalize a sessão e reutilize missões por histórico ou modelos.

A v0.1 representa o núcleo inicial da aplicação: uma experiência direta de foco imediato, com timer, microtarefas, histórico, modelos, persistência local e interface responsiva básica.

---

## Funcionalidades implementadas na v0.1

### Missões

- Criar missão com título.
- Definir tempo total da missão.
- Limitar tempo máximo da missão.
- Exibir tempo em minutos ou horas.
- Normalizar o campo de tempo para formatos como `30 minutos`, `1 hora` e `1 hora e 30 minutos`.
- Exibir o timer em `MM:SS` ou `HH:MM:SS`.
- Iniciar timer regressivo.
- Pausar missão.
- Retomar missão pausada.
- Reiniciar missão com confirmação.
- Cancelar missão com confirmação.
- Finalizar missão manualmente com confirmação.
- Pausar temporariamente o timer enquanto o modal de confirmação de finalização está aberto.
- Retomar o timer caso o usuário cancele a finalização.
- Finalizar missão automaticamente quando o tempo chega a zero.
- Limpar missão atual após finalização.

### Microtarefas

- Adicionar microtarefas dinamicamente.
- Remover microtarefas.
- Limitar quantidade de microtarefas.
- Marcar microtarefas como concluídas.
- Desmarcar microtarefas concluídas.
- Exibir progresso da sessão com base nas tarefas concluídas.
- Bloquear edição funcional das tarefas no estado finalizado.

### Histórico

- Registrar missões finalizadas no histórico local.
- Abrir e fechar painel de histórico.
- Atualizar histórico automaticamente quando ele está aberto.
- Exibir data, horário, tempo planejado, tempo usado e progresso da missão.
- Repetir missão pelo histórico.
- Excluir item individual do histórico com confirmação.
- Apagar histórico completo com confirmação.
- Ajustar painel de histórico para desktop, tablet e mobile.
- Limitar altura do histórico em telas menores e usar rolagem interna.

### Modelos

- Salvar missão finalizada como modelo.
- Abrir modal de modelos salvos.
- Listar modelos salvos.
- Usar modelo salvo para preencher uma nova missão.
- Excluir modelo salvo com confirmação.
- Desativar o botão de usar modelo durante missão em execução ou pausada.
- Exibir orientação no próprio botão bloqueado quando houver missão ativa.

### Persistência local

- Salvar histórico em `localStorage`.
- Salvar modelos em `localStorage`.
- Salvar missão ativa durante execução.
- Recuperar missão em execução após recarregar a página.
- Recuperar missão pausada após recarregar a página.
- Recuperar tela de missão finalizada após recarregar a página.
- Limpar snapshots locais quando uma nova missão é iniciada, cancelada ou limpa.
- Preservar dados principais sem exigir login ou banco de dados externo.

### Interface e experiência

- Criar layout visual inicial da aplicação.
- Definir identidade visual escura com tons verde/azulados.
- Organizar layout desktop em painéis.
- Criar painel de orientações.
- Criar painel de ações extras.
- Criar painel central da missão.
- Criar painel/modal de histórico responsivo.
- Criar modal de confirmação.
- Criar modal de modelos.
- Criar modal “Sobre o Time-Task”.
- Adicionar frase curta abaixo do título da aplicação.
- Adicionar botão de acesso ao modal “Sobre”.
- Adicionar favicon.
- Adicionar título dinâmico da página com tempo restante.
- Atualizar título da página quando a missão termina.
- Estilizar barras de rolagem da página, histórico, tarefas e modais.
- Ajustar scroll interno dos modais.
- Impedir rolagem da página por trás quando modais reais estão abertos.
- Ajustar comportamento de scroll em telas intermediárias.
- Garantir responsividade básica para desktop, tablet e mobile.

### Organização do código

- Refatorar e organizar o CSS da página principal.
- Separar responsividade em arquivo dedicado.
- Refatorar e organizar o JavaScript principal por seções.
- Centralizar estado da aplicação em um objeto `state`.
- Agrupar seletores DOM no objeto `dom`.
- Criar constantes para estados, motivos de finalização e chaves de armazenamento.
- Melhorar funções de formatação de tempo.
- Melhorar funções de armazenamento local.
- Reduzir duplicações de CSS.

---

## Critérios de fechamento da v0.1

Status: atendidos após os testes manuais principais.

- O usuário consegue criar uma missão válida.
- O sistema impede criação de missão inválida.
- O timer funciona corretamente.
- A pausa e a retomada preservam o tempo restante.
- A confirmação de finalização pausa o timer temporariamente.
- A finalização manual salva a missão no histórico.
- A finalização automática salva a missão no histórico.
- O histórico pode ser consultado, atualizado, repetido e limpo.
- Modelos podem ser salvos, usados e excluídos.
- Ações perigosas usam confirmação.
- O limite de tempo funciona corretamente.
- O tempo em horas é interpretado corretamente.
- A missão ativa é recuperada após recarregamento.
- A missão pausada é recuperada após recarregamento.
- A missão finalizada é recuperada após recarregamento.
- A interface desktop está visualmente estável.
- A interface mobile possui comportamento aceitável.
- Os modais cabem na tela e usam rolagem interna quando necessário.
- As barras de rolagem estão estilizadas e consistentes.
- Os testes manuais principais foram executados.
- A documentação foi atualizada.
- O changelog foi atualizado.
- O README foi atualizado.

---

## Próximas versões

### v0.2 - Dados locais, manutenção e lapidação

Objetivo:
Melhorar a robustez do armazenamento local, facilitar manutenção e preparar o projeto para crescimento sem aumentar demais a complexidade da aplicação.

Funcionalidades planejadas:
- Criar opção para limpar todos os dados locais da aplicação com confirmação.
- Detectar e tratar dados locais inválidos ou corrompidos.
- Revisar limites do histórico e modelos.
- Evitar ou alertar sobre modelos duplicados.
- Adicionar exportação simples dos dados locais.
- Adicionar importação simples dos dados locais.
- Melhorar mensagens quando histórico ou modelos estiverem vazios.
- Criar testes específicos para persistência local.
- Revisar acessibilidade básica dos modais.
- Melhorar foco inicial e navegação por teclado em modais.
- Refinar textos finais da interface.

---

### v0.3 - Experiência de foco

Objetivo:
Adicionar pequenos recursos de experiência sem transformar o Time-Task em um sistema complexo de produtividade.

Funcionalidades planejadas:
- Sons opcionais ao iniciar, pausar e finalizar.
- Vibração em dispositivos compatíveis.
- Modo tela cheia ou modo foco.
- Mensagens motivacionais curtas.
- Aviso quando houver muitas microtarefas para pouco tempo.
- Melhor feedback final da sessão.
- Opção de ocultar ações extras durante a execução.
- Atalhos rápidos para iniciar missões comuns.

---

### v0.4 - Organização interna e modularização

Objetivo:
Refatorar a estrutura interna do JavaScript e do CSS para facilitar manutenção e evolução futura.

Funcionalidades planejadas:
- Separar `main.js` em módulos.
- Criar módulo de timer.
- Criar módulo de tarefas.
- Criar módulo de histórico.
- Criar módulo de modelos.
- Criar módulo de armazenamento.
- Criar módulo de validação.
- Criar módulo de modais.
- Separar melhor CSS em base, componentes, layout, página e utilitários.
- Criar constantes reutilizáveis.
- Melhorar nomes de funções e responsabilidades.
- Criar uma documentação técnica mais detalhada da arquitetura real.

---

### v0.5 - Organização e estatísticas simples

Objetivo:
Adicionar uma camada leve de acompanhamento de uso sem transformar o projeto em um gerenciador complexo de tarefas.

Funcionalidades planejadas:
- Categorias simples para missões.
- Total de sessões realizadas.
- Tempo total focado.
- Média de conclusão das microtarefas.
- Melhor tempo médio por missão.
- Filtro de histórico por categoria.
- Separação visual entre missões completas, parciais e canceladas.
- Comparação entre tempo planejado e tempo realmente usado.

---

### v1.0 - Primeira versão estável

Objetivo:
Considerar o Time-Task uma aplicação web de foco imediato minimamente completa, estável, documentada e pronta para uso contínuo.

Critérios para fechar a versão:
- Timer confiável.
- Interface responsiva.
- Missões, microtarefas, histórico, modelos e configurações funcionando.
- Dados salvos corretamente no armazenamento local.
- Recuperação de sessão ativa implementada e testada.
- Histórico e modelos estáveis.
- Ações perigosas protegidas por confirmação.
- Acessibilidade básica revisada.
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
- Estatísticas por período.
- Sincronização futura entre dispositivos.
