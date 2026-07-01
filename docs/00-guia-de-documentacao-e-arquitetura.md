# Guia de Documentação e Arquitetura do Projeto

Este guia define **quando utilizar cada documento** do projeto e apresenta uma **arquitetura padrão expansível** para novas aplicações.

---

# 1. Quando utilizar cada documento

## README.md

**Quando usar:**
No início do projeto e sempre que quiser apresentar a aplicação de forma geral.

**Serve para:**
Explicar rapidamente o que é o projeto, qual seu objetivo, tecnologias usadas, status atual e próximos passos.

**Atualizar quando:**

* O objetivo do projeto mudar.
* Uma nova versão importante for criada.
* A estrutura principal do projeto mudar.
* O projeto for publicado no GitHub ou online.

---

## 01-visao-do-projeto.md

**Quando usar:**
Antes de começar a desenvolver.

**Serve para:**
Definir a ideia central da aplicação, o problema que ela resolve, o público-alvo e o objetivo principal.

**Atualizar quando:**

* A ideia principal mudar.
* O público-alvo mudar.
* O propósito do projeto ficar mais claro.
* O projeto ganhar uma nova direção.

---

## 02-requisitos-e-escopo.md

**Quando usar:**
Antes de programar uma versão nova.

**Serve para:**
Listar o que a aplicação deve fazer e separar o que entra agora do que fica para depois.

**Atualizar quando:**

* Uma nova funcionalidade for planejada.
* Uma funcionalidade sair do projeto.
* O escopo da versão atual mudar.
* Surgirem ideias futuras.

**Regra prática:**
Se uma funcionalidade vai ser desenvolvida, ela deve aparecer aqui antes.

---

## 03-fluxos-e-telas.md

**Quando usar:**
Antes de criar ou alterar telas importantes.

**Serve para:**
Descrever como o usuário navega pela aplicação, quais telas existem, quais ações ele pode fazer e quais estados a tela pode ter.

**Atualizar quando:**

* Uma tela nova for criada.
* Um fluxo de uso mudar.
* Um modal, painel ou formulário novo for adicionado.
* A experiência do usuário for reorganizada.

**Exemplos de fluxo:**

* Criar uma tarefa.
* Iniciar um timer.
* Cadastrar uma questão.
* Editar uma anotação.
* Excluir um item.

---

## 04-dados-e-arquitetura.md

**Quando usar:**
Antes de organizar o código e sempre que o projeto crescer.

**Serve para:**
Definir quais dados a aplicação usa e como os arquivos do projeto estão organizados.

**Atualizar quando:**

* Uma nova entidade for criada.
* Uma estrutura de dados mudar.
* Um novo módulo for adicionado.
* A organização de pastas mudar.
* Uma responsabilidade for separada em outro arquivo.

**Exemplos de dados:**

* Usuário.
* Tarefa.
* Sessão.
* Matéria.
* Tema.
* Assunto.
* Questão.
* Anotação.

---

## 05-roadmap.md

**Quando usar:**
Durante todo o projeto.

**Serve para:**
Organizar o desenvolvimento por versões.

**Atualizar quando:**

* Uma versão começar.
* Uma versão for finalizada.
* Uma funcionalidade for movida para outra versão.
* Surgirem ideias futuras.

**Regra prática:**
O roadmap responde:
“O que estou fazendo agora, o que vem depois e para onde o projeto pode crescer?”

---

## 06-testes.md

**Quando usar:**
Antes de fechar uma versão.

**Serve para:**
Registrar testes manuais ou automatizados que verificam se a aplicação está funcionando corretamente.

**Atualizar quando:**

* Uma funcionalidade nova for testada.
* Um bug for encontrado.
* Um bug for corrigido.
* Uma versão estiver pronta para fechamento.

**Regra prática:**
Antes de fechar uma versão, passar pelo documento de testes.

---

## 07-changelog.md

**Quando usar:**
Depois de finalizar mudanças relevantes.

**Serve para:**
Registrar o histórico do projeto por versão.

**Atualizar quando:**

* Uma funcionalidade for adicionada.
* Algo for alterado.
* Um bug for corrigido.
* Algo for removido.

**Categorias recomendadas:**

* Adicionado.
* Alterado.
* Corrigido.
* Removido.

---

# 2. Ordem recomendada de uso dos documentos

## Antes de desenvolver

1. `01-visao-do-projeto.md`
2. `02-requisitos-e-escopo.md`
3. `03-fluxos-e-telas.md`
4. `04-dados-e-arquitetura.md`
5. `05-roadmap.md`

## Durante o desenvolvimento

1. `02-requisitos-e-escopo.md`
2. `03-fluxos-e-telas.md`
3. `04-dados-e-arquitetura.md`
4. `05-roadmap.md`

## Antes de fechar uma versão

1. `06-testes.md`
2. `07-changelog.md`
3. `README.md`
4. `05-roadmap.md`

---

# 3. Arquitetura padrão expansível

Esta arquitetura foi pensada para projetos web em HTML, CSS e JavaScript, mas pode crescer futuramente para projetos com back-end, banco de dados, API ou framework.

```text
/
  README.md
  index.html

  /docs
    00-guia-de-documentacao-e-arquitetura.md
    01-visao-do-projeto.md
    02-requisitos-e-escopo.md
    03-fluxos-e-telas.md
    04-dados-e-arquitetura.md
    05-roadmap.md
    06-testes.md
    07-changelog.md

  /src
    /assets
      /images
      /icons
      /fonts

    /styles
      main.css

      /base
        reset.css
        variables.css
        typography.css

      /layout
        header.css
        sidebar.css
        footer.css
        grid.css

      /components
        buttons.css
        cards.css
        modals.css
        forms.css
        alerts.css

      /pages
        home.css

      /themes
        light.css
        dark.css

      /utilities
        helpers.css
        responsive.css

    /scripts
      main.js
      app.js

      /core
        config.js
        constants.js
        state.js
        events.js
        router.js

      /shared
        dom.js
        storage.js
        validators.js
        formatters.js
        helpers.js

      /features
        /example-feature
          example.model.js
          example.service.js
          example.controller.js
          example.ui.js

  /tests
    manual-tests.md

  /public
    favicon.ico
```

---

# 4. Função de cada pasta

## /docs

Guarda a documentação leve do projeto.

Use para registrar:

* ideia;
* requisitos;
* escopo;
* telas;
* arquitetura;
* roadmap;
* testes;
* histórico de versões.

---

## /src

Guarda o código-fonte principal da aplicação.

É a pasta mais importante do desenvolvimento.

---

## /src/assets

Guarda arquivos visuais e estáticos.

Use para:

* imagens;
* ícones;
* fontes;
* ilustrações;
* arquivos visuais usados na interface.

---

## /src/styles

Guarda os arquivos CSS.

A ideia é evitar um único CSS gigante e difícil de manter.

---

## /src/styles/base

Guarda estilos fundamentais.

Use para:

* reset;
* variáveis;
* fontes;
* estilos globais.

---

## /src/styles/layout

Guarda estilos de estrutura da página.

Use para:

* cabeçalho;
* menu lateral;
* rodapé;
* grids;
* containers;
* estrutura geral.

---

## /src/styles/components

Guarda estilos de componentes reutilizáveis.

Use para:

* botões;
* cards;
* modais;
* formulários;
* alertas;
* badges;
* tooltips.

---

## /src/styles/pages

Guarda estilos específicos de páginas.

Use quando uma tela tiver estilos próprios que não servem para o resto do sistema.

---

## /src/styles/themes

Guarda estilos de tema.

Use para:

* tema claro;
* tema escuro;
* variações visuais da aplicação.

---

## /src/styles/utilities

Guarda classes auxiliares.

Use para:

* espaçamentos rápidos;
* responsividade;
* classes utilitárias;
* pequenos ajustes reutilizáveis.

---

## /src/scripts

Guarda os arquivos JavaScript.

A ideia é separar lógica, interface, dados e funcionalidades.

---

## /src/scripts/core

Guarda o núcleo da aplicação.

Use para:

* configurações globais;
* constantes;
* estado global;
* eventos principais;
* rotas;
* inicialização estrutural.

---

## /src/scripts/shared

Guarda funções reutilizáveis por várias partes do sistema.

Use para:

* manipulação do DOM;
* localStorage;
* validações;
* formatação de datas;
* funções auxiliares.

---

## /src/scripts/features

Guarda as funcionalidades principais da aplicação.

Cada funcionalidade deve ter sua própria pasta.

Exemplos:

```text
/features
  /tasks
  /timer
  /notes
  /subjects
  /questions
  /dashboard
```

---

# 5. Estrutura recomendada para uma funcionalidade

Cada funcionalidade pode seguir este padrão:

```text
/features
  /tasks
    task.model.js
    task.service.js
    task.controller.js
    task.ui.js
```

## model.js

**Serve para:**
Definir o formato dos dados.

Exemplo:

```js
const task = {
  id: '',
  title: '',
  completed: false,
  createdAt: ''
};
```

---

## service.js

**Serve para:**
Cuidar das regras e operações da funcionalidade.

Exemplos:

* criar tarefa;
* editar tarefa;
* excluir tarefa;
* buscar tarefa;
* salvar tarefa.

---

## controller.js

**Serve para:**
Conectar a interface com a lógica.

Exemplos:

* capturar clique de botão;
* receber dados do formulário;
* chamar funções do service;
* atualizar a tela.

---

## ui.js

**Serve para:**
Renderizar elementos visuais da funcionalidade.

Exemplos:

* montar cards;
* atualizar listas;
* exibir mensagens;
* abrir e fechar modais.

---

# 6. Regra simples de separação

## HTML

Responsável pela estrutura da página.

## CSS

Responsável pela aparência.

## JavaScript

Responsável pelo comportamento.

## Model

Responsável pelo formato dos dados.

## Service

Responsável pelas regras da funcionalidade.

## Controller

Responsável por ligar ações do usuário com a lógica.

## UI

Responsável por atualizar a tela.

---

# 7. Exemplo de funcionalidade: Timer

```text
/features
  /timer
    timer.model.js
    timer.service.js
    timer.controller.js
    timer.ui.js
```

## timer.model.js

Define os dados do timer.

Exemplo:

* id;
* título;
* duração;
* tempo restante;
* status.

## timer.service.js

Controla as regras do timer.

Exemplo:

* iniciar;
* pausar;
* reiniciar;
* finalizar;
* calcular tempo restante.

## timer.controller.js

Liga os botões com a lógica.

Exemplo:

* botão iniciar chama a função de iniciar;
* botão pausar chama a função de pausar;
* botão reiniciar chama a função de reiniciar.

## timer.ui.js

Atualiza a interface.

Exemplo:

* mostra o tempo na tela;
* muda o status visual;
* exibe aviso de timer finalizado.

---

# 8. Quando criar uma nova pasta em /features

Crie uma nova pasta dentro de `/features` quando a funcionalidade:

* tiver seus próprios dados;
* tiver suas próprias regras;
* tiver interface própria;
* puder crescer no futuro;
* não for apenas uma função auxiliar.

Exemplos bons:

```text
/features/tasks
/features/timer
/features/notes
/features/questions
/features/dashboard
/features/settings
```

Evite criar feature para coisas pequenas demais, como:

```text
/features/button
/features/input
/features/date-format
```

Esses casos pertencem a `/shared` ou `/components`.

---

# 9. Versão mais simples da arquitetura

Para projetos bem pequenos, usar:

```text
/
  README.md
  index.html

  /docs
    requisitos.md
    roadmap.md
    testes.md
    changelog.md

  /src
    /styles
      main.css

    /scripts
      main.js
      storage.js
      ui.js
      app.js
```

Use essa versão quando:

* o projeto for pequeno;
* tiver poucas telas;
* tiver poucas funcionalidades;
* for um protótipo inicial.

---

# 10. Versão recomendada para projetos médios

Para aplicações que podem crescer, usar:

```text
/
  README.md
  index.html

  /docs

  /src
    /assets
    /styles
      /base
      /layout
      /components
      /pages
      /themes
      /utilities
      main.css

    /scripts
      /core
      /shared
      /features
      main.js
      app.js

  /tests
```

Use essa versão quando:

* o projeto tiver várias funcionalidades;
* você pretende criar versões futuras;
* o código pode crescer bastante;
* a aplicação terá telas, modais, cards, filtros ou dados salvos.

---

# 11. Regra de ouro da arquitetura

Comece simples, mas já deixe espaço para crescer.

A arquitetura deve ajudar o projeto, não travar o desenvolvimento.

Se o projeto estiver pequeno, não complique.
Se o projeto começar a crescer, separe melhor os arquivos.

A ordem ideal é:

1. Fazer funcionar.
2. Organizar.
3. Refatorar.
4. Documentar.
5. Evoluir.

---

# 12. Checklist para iniciar um novo projeto

Antes de programar:

* [ ] Criar `README.md`.
* [ ] Criar pasta `/docs`.
* [ ] Criar `01-visao-do-projeto.md`.
* [ ] Criar `02-requisitos-e-escopo.md`.
* [ ] Criar `05-roadmap.md`.
* [ ] Criar estrutura inicial de `/src`.
* [ ] Definir funcionalidades principais.
* [ ] Definir primeira versão.
* [ ] Criar estrutura base de CSS.
* [ ] Criar estrutura base de JavaScript.

Durante o desenvolvimento:

* [ ] Atualizar requisitos quando algo mudar.
* [ ] Atualizar fluxos quando uma tela mudar.
* [ ] Atualizar arquitetura quando novos módulos surgirem.
* [ ] Registrar bugs encontrados.
* [ ] Testar antes de fechar versão.

Ao fechar uma versão:

* [ ] Rodar checklist de testes.
* [ ] Atualizar changelog.
* [ ] Atualizar roadmap.
* [ ] Atualizar README se necessário.
* [ ] Criar commit ou release da versão.

---

# 13. Padrão recomendado de nomes

## Pastas

Usar nomes em inglês ou português, mas manter consistência.

Exemplo em inglês:

```text
features
shared
core
styles
components
```

Exemplo em português:

```text
funcionalidades
compartilhado
nucleo
estilos
componentes
```

Recomendação: usar inglês para nomes técnicos, porque combina melhor com padrões de código.

---

## Arquivos

Usar nomes claros e separados por ponto ou hífen.

Exemplos:

```text
task.service.js
task.controller.js
task.ui.js
task.model.js
```

ou:

```text
task-service.js
task-controller.js
task-ui.js
task-model.js
```

Recomendação: usar o padrão com ponto:

```text
nome.model.js
nome.service.js
nome.controller.js
nome.ui.js
```

---

# 14. Modelo mental do projeto

A aplicação deve ser pensada como uma construção:

```text
/docs        -> planta e histórico da construção
/src         -> construção real
/core        -> fundação do sistema
/shared      -> ferramentas reutilizáveis
/features    -> cômodos principais da aplicação
/styles      -> aparência e acabamento
/tests       -> vistoria antes da entrega
```

A documentação não deve ser um peso.
Ela deve funcionar como memória, mapa e proteção contra bagunça.
