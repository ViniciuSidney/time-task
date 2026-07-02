# Testes

## Informações

Projeto: Time-Task  
Versão testada: v0.1  
Data: 01/07/2026  
Tipo de teste: Manual  
Ambiente principal: Navegador desktop  

---

## Objetivo dos testes

Validar se o fluxo principal da aplicação funciona corretamente:

1. Criar missão.
2. Definir tempo.
3. Adicionar microtarefas.
4. Iniciar timer.
5. Pausar, retomar, reiniciar, cancelar ou finalizar.
6. Registrar histórico.
7. Repetir missões.
8. Salvar e usar modelos.
9. Confirmar ações perigosas.
10. Verificar limites e formatações de tempo.

---

## Testes principais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| T01 | Abrir a aplicação | A tela principal deve carregar sem erros visuais graves ou mensagens críticas no console | Pendente |
| T02 | Criar missão com título, tempo e tarefa válidos | A missão deve entrar em estado de execução | Pendente |
| T03 | Tentar criar missão sem título | Sistema deve impedir e exibir orientação | Pendente |
| T04 | Tentar criar missão sem tempo | Sistema deve impedir e exibir orientação | Pendente |
| T05 | Tentar criar missão com tempo zero | Sistema deve impedir e orientar o usuário | Pendente |
| T06 | Tentar criar missão sem tarefas preenchidas | Sistema deve impedir e focar/orientar a tarefa vazia | Pendente |
| T07 | Adicionar microtarefa | Nova microtarefa deve aparecer na lista | Pendente |
| T08 | Remover microtarefa | Microtarefa deve sair da lista | Pendente |
| T09 | Tentar passar do limite de microtarefas | Sistema deve impedir e orientar o usuário | Pendente |
| T10 | Iniciar o timer | Timer deve começar a contagem regressiva | Pendente |
| T11 | Pausar o timer | Contagem deve parar e preservar tempo restante | Pendente |
| T12 | Retomar timer pausado | Contagem deve continuar do tempo restante | Pendente |
| T13 | Reiniciar missão | Deve pedir confirmação e restaurar tempo/tarefas | Pendente |
| T14 | Cancelar missão | Deve pedir confirmação e voltar para tela inicial | Pendente |
| T15 | Marcar microtarefa como concluída | Tarefa deve mudar visualmente e progresso deve atualizar | Pendente |
| T16 | Desmarcar microtarefa concluída | Tarefa deve voltar ao estado pendente e progresso deve recalcular | Pendente |
| T17 | Finalizar missão manualmente | Missão deve parar, mudar para finalizada e salvar histórico | Pendente |
| T18 | Deixar timer chegar a zero | Missão deve finalizar automaticamente e salvar histórico | Pendente |
| T19 | Criar nova missão após finalização | Tela deve voltar ao estado inicial | Pendente |
| T20 | Limpar missão atual | Deve pedir confirmação e limpar a tela | Pendente |

---

## Testes de tempo

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| TM01 | Digitar `30` no tempo | Timer deve mostrar `30:00` e campo deve normalizar para `30 minutos` | Pendente |
| TM02 | Digitar `60` no tempo | Timer deve mostrar `01:00:00` e campo deve mostrar `1 hora` | Pendente |
| TM03 | Digitar `90` no tempo | Timer deve mostrar `01:30:00` e campo deve mostrar `1 hora e 30 minutos` | Pendente |
| TM04 | Digitar `120` no tempo | Timer deve mostrar `02:00:00` e campo deve mostrar `2 horas` | Pendente |
| TM05 | Iniciar missão com `120` minutos normalizado como `2 horas` | Timer deve iniciar com `02:00:00`, não com `02:00` | Pendente |
| TM06 | Digitar valor acima do limite máximo | Sistema deve limitar ao máximo permitido e orientar o usuário | Pendente |
| TM07 | Finalizar missão antes do tempo | Histórico deve registrar tempo usado corretamente | Pendente |
| TM08 | Finalizar por tempo encerrado | Histórico deve registrar tempo usado como duração total | Pendente |

---

## Testes de histórico

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| H01 | Finalizar missão | Missão deve aparecer no histórico | Pendente |
| H02 | Abrir histórico vazio | Deve aparecer mensagem de histórico vazio | Pendente |
| H03 | Abrir histórico com dados | Deve listar missões finalizadas | Pendente |
| H04 | Finalizar missão com histórico aberto | Lista deve atualizar automaticamente | Pendente |
| H05 | Repetir missão pelo histórico | Deve iniciar nova missão com mesmo título, tempo e tarefas | Pendente |
| H06 | Excluir item do histórico | Deve abrir confirmação e remover apenas o item escolhido | Pendente |
| H07 | Apagar histórico | Deve abrir confirmação e remover todos os registros | Pendente |
| H08 | Conferir tempo planejado no histórico | Deve aparecer em minutos ou horas corretamente | Pendente |
| H09 | Conferir tempo usado no histórico | Deve aparecer corretamente em segundos/minutos | Pendente |

---

## Testes de modelos

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| M01 | Abrir modal de modelos sem dados | Deve mostrar mensagem de nenhum modelo salvo | Pendente |
| M02 | Salvar missão como modelo | Modelo deve ser salvo no `localStorage` | Pendente |
| M03 | Abrir modal de modelos com dados | Deve listar modelos salvos | Pendente |
| M04 | Usar modelo salvo | Tela inicial deve ser preenchida com título, tempo e tarefas | Pendente |
| M05 | Excluir modelo salvo | Deve abrir confirmação e remover o modelo | Pendente |
| M06 | Tentar usar modelo durante missão em execução | Sistema deve impedir e orientar o usuário | Pendente |

---

## Testes de modais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| MD01 | Clicar em ação perigosa | Modal de confirmação deve abrir | Pendente |
| MD02 | Cancelar no modal | Ação não deve ser executada | Pendente |
| MD03 | Confirmar no modal | Ação deve ser executada | Pendente |
| MD04 | Fechar modal pelo X | Ação não deve ser executada | Pendente |
| MD05 | Fechar modal clicando fora | Ação não deve ser executada | Pendente |
| MD06 | Fechar modal com tecla Esc | Ação não deve ser executada | Pendente |

---

## Testes de armazenamento local

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| S01 | Finalizar sessão | Registro deve ser gravado em `time-task:history` | Pendente |
| S02 | Salvar modelo | Registro deve ser gravado em `time-task:templates` | Pendente |
| S03 | Excluir item do histórico | `localStorage` deve ser atualizado | Pendente |
| S04 | Apagar histórico | `time-task:history` deve ficar vazio | Pendente |
| S05 | Excluir modelo | `time-task:templates` deve ser atualizado | Pendente |
| S06 | Recarregar página com histórico existente | Histórico deve continuar disponível | Pendente |
| S07 | Recarregar página com modelos existentes | Modelos devem continuar disponíveis | Pendente |
| S08 | Recarregar página durante missão ativa | Atualmente é pendente: a missão ativa ainda não é recuperada | Pendente |

---

## Testes de interface desktop

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| D01 | Verificar alinhamento dos painéis laterais | Orientações e ações extras devem permanecer estáveis | Pendente |
| D02 | Verificar painel de ações com poucos botões | Painel não deve subir ou mudar bruscamente de posição | Pendente |
| D03 | Verificar painel de ações com muitos botões | Botões devem caber sem vazar | Pendente |
| D04 | Abrir histórico lateral | Painel deve aparecer alinhado à direita | Pendente |
| D05 | Abrir modal de confirmação | Modal deve centralizar corretamente | Pendente |
| D06 | Abrir modal de modelos | Modal deve listar itens com boa leitura | Pendente |
| D07 | Testar campo com autofill do navegador | Campo não deve ficar branco visualmente | Pendente |

---

## Testes de responsividade

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| R01 | Testar em largura de celular | Layout deve ficar em coluna única, sem cortes horizontais | Pendente |
| R02 | Testar em largura de tablet | Layout deve manter boa leitura e espaçamento | Pendente |
| R03 | Testar em desktop | Layout deve aproveitar o espaço sem ficar espalhado demais | Pendente |
| R04 | Testar campos e botões no mobile | Elementos devem ter tamanho confortável para toque | Pendente |
| R05 | Testar histórico no mobile | Histórico deve virar modal/painel adequado ou não quebrar layout | Pendente |
| R06 | Testar modal no mobile | Modal deve caber na tela e permitir rolagem se necessário | Pendente |

---

## Bugs encontrados

### Bug 1 - Botão “Salvar Modelo” vazando do painel

Descrição:
Ao finalizar uma missão, o botão “Salvar Modelo” ultrapassava o limite do painel de ações extras.

Status:
Corrigido.

### Bug 2 - Botões do painel de ações desalinhados

Descrição:
Alguns botões do painel de ações extras pareciam descentralizados, principalmente “Limpar Missão Atual”.

Status:
Corrigido.

### Bug 3 - Painel de ações extras mudando de posição

Descrição:
O painel de ações extras aumentava ou diminuía conforme a quantidade de botões, causando variação visual na lateral.

Status:
Corrigido.

### Bug 4 - Painel de orientações variando com o texto

Descrição:
O painel de orientações podia variar conforme a quantidade de linhas da mensagem.

Status:
Corrigido.

### Bug 5 - Histórico aberto não atualizava ao finalizar missão

Descrição:
Quando o painel de histórico estava aberto e uma missão era finalizada, a nova missão não aparecia imediatamente na lista.

Status:
Corrigido.

### Bug 6 - Campos ficavam brancos com autofill

Descrição:
O preenchimento automático do navegador deixava campos com fundo branco, quebrando a identidade visual.

Status:
Corrigido.

### Bug 7 - Tempo em horas era interpretado como minutos

Descrição:
Ao digitar 120 minutos, o campo normalizava para “2 horas”. Ao iniciar, a leitura antiga interpretava apenas o número 2 e iniciava missão com 2 minutos.

Status:
Corrigido ou em correção.

---

## Observações

- Os testes desta versão ainda são manuais.
- O timer deve continuar sendo testado com atenção.
- A recuperação da missão ativa após recarregamento ainda é pendente.
- A responsividade completa ainda é pendente.
- Histórico e modelos já possuem persistência local.
- O foco atual é estabilizar a v0.1 antes de ampliar funcionalidades.
