# Testes

## Informações

Projeto: Time-Task  
Versão testada: v0.1  
Data: 02/07/2026  
Tipo de teste: Manual  
Ambiente principal: Navegador desktop  
Ambientes complementares: DevTools com larguras de tablet e mobile  

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
11. Recuperar estados após recarregamento.
12. Validar responsividade.
13. Validar modais, barras de rolagem e travamento de scroll.

---

## Resultado geral

Status geral da v0.1: Aprovada nos testes manuais principais.

Observação:
Os testes foram executados manualmente durante o desenvolvimento e fechamento da versão. Os bugs encontrados foram corrigidos antes do fechamento da v0.1.

---

## Testes principais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| T01 | Abrir a aplicação | A tela principal deve carregar sem erros visuais graves ou mensagens críticas no console | Aprovado |
| T02 | Criar missão com título, tempo e tarefa válidos | A missão deve entrar em estado de execução | Aprovado |
| T03 | Tentar criar missão sem título | Sistema deve impedir e exibir orientação | Aprovado |
| T04 | Tentar criar missão sem tempo | Sistema deve impedir e exibir orientação | Aprovado |
| T05 | Tentar criar missão com tempo zero | Sistema deve impedir e orientar o usuário | Aprovado |
| T06 | Tentar criar missão sem tarefas preenchidas | Sistema deve impedir e focar/orientar a tarefa vazia | Aprovado |
| T07 | Adicionar microtarefa | Nova microtarefa deve aparecer na lista | Aprovado |
| T08 | Remover microtarefa | Microtarefa deve sair da lista | Aprovado |
| T09 | Tentar passar do limite de microtarefas | Sistema deve impedir e orientar o usuário | Aprovado |
| T10 | Iniciar o timer | Timer deve começar a contagem regressiva | Aprovado |
| T11 | Pausar o timer | Contagem deve parar e preservar tempo restante | Aprovado |
| T12 | Retomar timer pausado | Contagem deve continuar do tempo restante | Aprovado |
| T13 | Reiniciar missão | Deve pedir confirmação e restaurar tempo/tarefas | Aprovado |
| T14 | Cancelar missão | Deve pedir confirmação e voltar para tela inicial | Aprovado |
| T15 | Marcar microtarefa como concluída | Tarefa deve mudar visualmente e progresso deve atualizar | Aprovado |
| T16 | Desmarcar microtarefa concluída | Tarefa deve voltar ao estado pendente e progresso deve recalcular | Aprovado |
| T17 | Finalizar missão manualmente | Missão deve pedir confirmação, parar, mudar para finalizada e salvar histórico | Aprovado |
| T18 | Deixar timer chegar a zero | Missão deve finalizar automaticamente e salvar histórico | Aprovado |
| T19 | Criar nova missão após finalização | Tela deve voltar ao estado inicial | Aprovado |
| T20 | Limpar missão atual | Deve pedir confirmação e limpar a tela | Aprovado |

---

## Testes de tempo

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| TM01 | Digitar `30` no tempo | Timer deve mostrar `30:00` e campo deve normalizar para `30 minutos` | Aprovado |
| TM02 | Digitar `60` no tempo | Timer deve mostrar `01:00:00` e campo deve mostrar `1 hora` | Aprovado |
| TM03 | Digitar `90` no tempo | Timer deve mostrar `01:30:00` e campo deve mostrar `1 hora e 30 minutos` | Aprovado |
| TM04 | Digitar `120` no tempo | Timer deve mostrar `02:00:00` e campo deve mostrar `2 horas` | Aprovado |
| TM05 | Iniciar missão com `120` minutos normalizado como `2 horas` | Timer deve iniciar com `02:00:00`, não com `02:00` | Aprovado |
| TM06 | Digitar valor acima do limite máximo | Sistema deve limitar ao máximo permitido e orientar o usuário | Aprovado |
| TM07 | Finalizar missão antes do tempo | Histórico deve registrar tempo usado corretamente | Aprovado |
| TM08 | Finalizar por tempo encerrado | Histórico deve registrar tempo usado como duração total | Aprovado |
| TM09 | Abrir modal de confirmação para finalizar missão em execução | Timer deve pausar temporariamente | Aprovado |
| TM10 | Cancelar finalização manual | Timer deve retomar de onde parou | Aprovado |

---

## Testes de histórico

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| H01 | Finalizar missão | Missão deve aparecer no histórico | Aprovado |
| H02 | Abrir histórico vazio | Deve aparecer mensagem de histórico vazio | Aprovado |
| H03 | Abrir histórico com dados | Deve listar missões finalizadas | Aprovado |
| H04 | Finalizar missão com histórico aberto | Lista deve atualizar automaticamente | Aprovado |
| H05 | Repetir missão pelo histórico | Deve iniciar nova missão com mesmo título, tempo e tarefas | Aprovado |
| H06 | Excluir item do histórico | Deve abrir confirmação e remover apenas o item escolhido | Aprovado |
| H07 | Apagar histórico | Deve abrir confirmação e remover todos os registros | Aprovado |
| H08 | Conferir tempo planejado no histórico | Deve aparecer em minutos ou horas corretamente | Aprovado |
| H09 | Conferir tempo usado no histórico | Deve aparecer corretamente em segundos/minutos | Aprovado |
| H10 | Abrir histórico em tela menor | Painel deve limitar altura e rolar internamente | Aprovado |
| H11 | Abrir histórico em tela maior que mobile | Página deve continuar rolável quando necessário | Aprovado |

---

## Testes de modelos

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| M01 | Abrir modal de modelos sem dados | Deve mostrar mensagem de nenhum modelo salvo | Aprovado |
| M02 | Salvar missão como modelo | Modelo deve ser salvo no `localStorage` | Aprovado |
| M03 | Abrir modal de modelos com dados | Deve listar modelos salvos | Aprovado |
| M04 | Usar modelo salvo | Tela inicial deve ser preenchida com título, tempo e tarefas | Aprovado |
| M05 | Excluir modelo salvo | Deve abrir confirmação e remover o modelo | Aprovado |
| M06 | Tentar usar modelo durante missão em execução | Botão deve ficar desativado e orientar que a missão atual precisa ser finalizada ou cancelada | Aprovado |
| M07 | Abrir modal de modelos com muitos itens | Modal deve ter apenas uma barra de rolagem e não estourar a tela | Aprovado |

---

## Testes de modais

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| MD01 | Clicar em ação perigosa | Modal de confirmação deve abrir | Aprovado |
| MD02 | Cancelar no modal | Ação não deve ser executada | Aprovado |
| MD03 | Confirmar no modal | Ação deve ser executada | Aprovado |
| MD04 | Fechar modal pelo X | Ação não deve ser executada | Aprovado |
| MD05 | Fechar modal clicando fora | Ação não deve ser executada | Aprovado |
| MD06 | Fechar modal com tecla Esc | Ação não deve ser executada | Aprovado |
| MD07 | Abrir modal Sobre | Modal deve exibir versão, criador, objetivo e dados da aplicação | Aprovado |
| MD08 | Abrir modal com conteúdo maior que a tela | Modal deve rolar internamente sem rolar a página de fundo | Aprovado |

---

## Testes de armazenamento local

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| S01 | Finalizar sessão | Registro deve ser gravado em `time-task:history` | Aprovado |
| S02 | Salvar modelo | Registro deve ser gravado em `time-task:templates` | Aprovado |
| S03 | Excluir item do histórico | `localStorage` deve ser atualizado | Aprovado |
| S04 | Apagar histórico | `time-task:history` deve ficar vazio | Aprovado |
| S05 | Excluir modelo | `time-task:templates` deve ser atualizado | Aprovado |
| S06 | Recarregar página com histórico existente | Histórico deve continuar disponível | Aprovado |
| S07 | Recarregar página com modelos existentes | Modelos devem continuar disponíveis | Aprovado |
| S08 | Recarregar página durante missão ativa | Missão ativa deve ser recuperada em execução | Aprovado |
| S09 | Recarregar página durante missão pausada | Missão deve ser recuperada pausada | Aprovado |
| S10 | Recarregar página após missão finalizada | Tela deve voltar no estado finalizado | Aprovado |
| S11 | Cancelar ou limpar missão | Snapshot da missão ativa/finalizada deve ser removido quando necessário | Aprovado |

---

## Testes de interface desktop

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| D01 | Verificar alinhamento dos painéis laterais | Orientações e ações extras devem permanecer estáveis | Aprovado |
| D02 | Verificar painel de ações com poucos botões | Painel não deve subir ou mudar bruscamente de posição | Aprovado |
| D03 | Verificar painel de ações com muitos botões | Botões devem caber sem vazar | Aprovado |
| D04 | Abrir histórico lateral | Painel deve aparecer alinhado à direita | Aprovado |
| D05 | Abrir modal de confirmação | Modal deve centralizar corretamente | Aprovado |
| D06 | Abrir modal de modelos | Modal deve listar itens com boa leitura | Aprovado |
| D07 | Testar campo com autofill do navegador | Campo não deve ficar branco visualmente | Aprovado |
| D08 | Verificar favicon | Ícone deve aparecer na aba do navegador | Aprovado |
| D09 | Verificar título dinâmico da página | Aba deve exibir tempo restante durante a missão | Aprovado |
| D10 | Verificar barras de rolagem | Scrollbars devem seguir o estilo visual da aplicação | Aprovado |

---

## Testes de responsividade

| Código | Teste | Resultado esperado | Status |
|---|---|---|---|
| R01 | Testar em largura de celular | Layout deve ficar em coluna única, sem cortes horizontais | Aprovado |
| R02 | Testar em largura de tablet | Layout deve manter boa leitura e espaçamento | Aprovado |
| R03 | Testar em desktop | Layout deve aproveitar o espaço sem ficar espalhado demais | Aprovado |
| R04 | Testar campos e botões no mobile | Elementos devem ter tamanho confortável para toque | Aprovado |
| R05 | Testar histórico no mobile | Histórico deve virar painel adequado e não quebrar layout | Aprovado |
| R06 | Testar modal no mobile | Modal deve caber na tela e permitir rolagem se necessário | Aprovado |
| R07 | Testar travamento de scroll com modal aberto | Página de fundo não deve rolar indevidamente | Aprovado |
| R08 | Testar histórico em largura intermediária | Página deve continuar rolável quando histórico não for overlay | Aprovado |

---

## Bugs encontrados e corrigidos

### Bug 1 - Botão “Salvar Modelo” vazando do painel

Descrição:
Ao finalizar uma missão, o botão “Salvar Modelo” ultrapassava o limite do painel de ações extras.

Status:
Corrigido.

---

### Bug 2 - Botões do painel de ações desalinhados

Descrição:
Alguns botões do painel de ações extras pareciam descentralizados, principalmente “Limpar Missão Atual”.

Status:
Corrigido.

---

### Bug 3 - Painel de ações extras mudando de posição

Descrição:
O painel de ações extras aumentava ou diminuía conforme a quantidade de botões, causando variação visual na lateral.

Status:
Corrigido.

---

### Bug 4 - Painel de orientações variando com o texto

Descrição:
O painel de orientações podia variar conforme a quantidade de linhas da mensagem.

Status:
Corrigido.

---

### Bug 5 - Histórico aberto não atualizava ao finalizar missão

Descrição:
Quando o painel de histórico estava aberto e uma missão era finalizada, a nova missão não aparecia imediatamente na lista.

Status:
Corrigido.

---

### Bug 6 - Campos ficavam brancos com autofill

Descrição:
O preenchimento automático do navegador deixava campos com fundo branco, quebrando a identidade visual.

Status:
Corrigido.

---

### Bug 7 - Tempo em horas era interpretado como minutos

Descrição:
Ao digitar 120 minutos, o campo normalizava para “2 horas”. Ao iniciar, a leitura antiga interpretava apenas o número 2 e iniciava missão com 2 minutos.

Status:
Corrigido.

---

### Bug 8 - Missão finalizada não era recuperada após recarregar

Descrição:
Após finalizar uma missão e recarregar a página, a aplicação voltava para a tela inicial em vez de manter o estado finalizado.

Status:
Corrigido.

---

### Bug 9 - Página ficava sem rolagem em telas intermediárias com histórico aberto

Descrição:
A trava de scroll era aplicada quando o histórico estava aberto, mesmo quando o histórico não estava em formato de overlay.

Status:
Corrigido.

---

### Bug 10 - Histórico podia estourar verticalmente em telas menores

Descrição:
Com muitos itens, o painel de histórico aumentava de altura e saía da tela.

Status:
Corrigido.

---

### Bug 11 - Modal de modelos exibia duas barras de rolagem

Descrição:
O modal de modelos possuía rolagem no corpo e na lista interna, criando scroll duplo.

Status:
Corrigido.

---

### Bug 12 - Barra de rolagem do modal de modelos ficava desalinhada

Descrição:
A barra de rolagem do modal de modelos ficava visualmente afastada do lado direito em comparação com os demais painéis e modais.

Status:
Corrigido.

---

### Bug 13 - Mensagem ao tentar usar modelo durante missão ativa ficava escondida

Descrição:
Ao tentar usar um modelo durante uma missão em execução, a orientação era exibida atrás do modal, ficando invisível para o usuário.

Status:
Corrigido.

---

## Observações

- Os testes desta versão são manuais.
- O núcleo funcional da v0.1 foi validado.
- A responsividade básica foi validada.
- Histórico e modelos possuem persistência local.
- Missões em execução, pausadas e finalizadas são recuperadas após recarregamento.
- Os bugs encontrados durante os testes foram corrigidos antes do fechamento da versão.
