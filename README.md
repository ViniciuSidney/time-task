# Time Task

Aplicação web simples de timer com microtarefas para organizar sessões de foco imediato.

## Objetivo

O objetivo do projeto é ajudar o usuário a executar uma tarefa no momento presente, combinando um tempo definido com uma pequena lista de ações curtas.

A aplicação funciona como uma sessão de foco: o usuário define uma missão, escolhe um tempo limite, adiciona microtarefas e acompanha seu progresso até finalizar a sessão.

## Funcionalidades

- Criar uma missão de foco com título e tempo definido.
- Adicionar microtarefas curtas para cumprir durante o timer.
- Iniciar, pausar, continuar e finalizar uma sessão.
- Marcar microtarefas como concluídas durante a execução.
- Visualizar o progresso da sessão atual.
- Salvar informações localmente no navegador.
- Utilizar a aplicação em dispositivos móveis e computadores.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript

## Estrutura do projeto

```text
/
  docs/
    00-guia-de-documentacao-e-arquitetura.md
    01-visao-do-projeto.md
    02-requisitos-e-escopo.md
    03-fluxos-e-telas.md
    04-dados-e-arquitetura.md
    05-roadmap.md
    06-testes.md
    07-changelog.md

  public/
    favicon.ico
    manifest.json

  src/
    assets/
      fonts/
      icons/
      images/

    scripts/
      core/
      features/
      shared/
      app.js
      main.js

    styles/
      base/
      components/
      layout/
      pages/
        home.css
      themes/
        dark.css
        light.css
      utilities/
        helpers.css
        responsive.css
      main.css

  tests/
    manual-tests.md

  .gitignore
  index.html
  README.md
```

## Status do projeto

Em desenvolvimento.

Versão atual planejada: `v0.1` — núcleo inicial da aplicação.

## Próximos passos

- Finalizar a documentação inicial do projeto.
- Criar a estrutura visual da tela principal.
- Implementar o formulário de criação da missão.
- Implementar o timer regressivo.
- Implementar a lista de microtarefas com marcação de conclusão.
- Salvar a sessão atual no armazenamento local do navegador.
- Refinar a responsividade para dispositivos móveis.
- Preparar a primeira versão funcional da aplicação.

## Autor

Desenvolvido por Vinícius Sidney.