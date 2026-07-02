# Time-Task

Aplicação web simples de **timer com microtarefas** para organizar sessões de foco imediato.

O Time-Task ajuda o usuário a transformar uma intenção ampla em uma pequena missão com tempo definido, tarefas claras e acompanhamento visual do progresso.

---

## Objetivo

O objetivo do projeto é ajudar o usuário a executar uma tarefa no momento presente, combinando:

- Um timer regressivo;
- Uma missão principal;
- Uma lista curta de microtarefas;
- Um histórico de sessões finalizadas;
- Modelos reutilizáveis;
- Persistência local no navegador.

A aplicação funciona como uma sessão de foco: o usuário define uma missão, escolhe um tempo limite, adiciona microtarefas e acompanha seu progresso até finalizar a execução.

---

## Status do projeto

Versão atual: `v0.1` — núcleo funcional da missão.

Status: concluída.

A v0.1 já possui o fluxo principal funcionando, incluindo criação de missão, timer, microtarefas, histórico, modelos, persistência local, responsividade básica, modais de confirmação, modal Sobre, favicon e título dinâmico da página.

---

## Funcionalidades

### Missões

- Criar uma missão de foco com título e tempo definido.
- Limitar o tempo máximo da missão.
- Exibir tempo em minutos ou horas.
- Iniciar, pausar, retomar, reiniciar, cancelar e finalizar uma missão.
- Confirmar antes de finalizar manualmente.
- Pausar temporariamente o timer durante o modal de confirmação de finalização.
- Retomar o timer caso a finalização seja cancelada.
- Finalizar automaticamente quando o timer chega a zero.
- Recuperar missão em execução após recarregar a página.
- Recuperar missão pausada após recarregar a página.
- Recuperar missão finalizada após recarregar a página.
- Visualizar mensagens de orientação durante o uso.
- Exibir título dinâmico da aba com tempo restante.

### Microtarefas

- Adicionar microtarefas curtas.
- Remover microtarefas.
- Limitar quantidade de microtarefas.
- Marcar microtarefas como concluídas.
- Desmarcar microtarefas.
- Visualizar progresso com base nas tarefas concluídas.

### Histórico

- Salvar missões finalizadas localmente.
- Visualizar histórico em painel lateral ou painel adaptado para telas menores.
- Ver data, hora, tempo planejado, tempo usado e progresso.
- Repetir missão a partir do histórico.
- Excluir item individual do histórico.
- Apagar histórico com confirmação.

### Modelos

- Salvar missão como modelo.
- Abrir modal com modelos salvos.
- Usar modelo salvo para preencher uma nova missão.
- Bloquear uso de modelo durante missão ativa.
- Excluir modelo com confirmação.

### Interface

- Layout visual com identidade escura e tons verde/azulados.
- Painel de orientações.
- Painel de ações extras.
- Painel central da missão.
- Modal de confirmação.
- Modal de modelos.
- Modal “Sobre o Time-Task”.
- Frase de apresentação abaixo do título.
- Favicon.
- Responsividade inicial para desktop, tablet e mobile.
- Barras de rolagem estilizadas.
- Scroll interno em painéis e modais.

### Segurança de ações

- Modal de confirmação para ações perigosas:
  - Reiniciar missão;
  - Cancelar missão;
  - Finalizar missão;
  - Limpar missão atual;
  - Excluir item do histórico;
  - Apagar histórico;
  - Excluir modelo.

---

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- LocalStorage

---

## Armazenamento local

A aplicação usa `localStorage` para persistir dados no navegador.

Chaves principais:

- `time-task:history`: histórico de missões finalizadas.
- `time-task:templates`: modelos salvos.
- `time-task:active-mission`: missão em execução ou pausada.
- `time-task:finished-mission`: última missão finalizada exibida na tela.

A versão inicial não utiliza login, banco de dados externo ou sincronização em nuvem.

---

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
    favicon.svg
    manifest.json

  src/
    assets/
      fonts/
      icons/
      images/
      layouts/
        prototipos/
        finais/

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

---

## Documentação

A documentação do projeto fica na pasta `docs/`.

Principais documentos:

- `01-visao-do-projeto.md`: visão geral da aplicação.
- `02-requisitos-e-escopo.md`: requisitos e limites do projeto.
- `03-fluxos-e-telas.md`: telas, estados e fluxos principais.
- `04-dados-e-arquitetura.md`: dados, armazenamento e arquitetura.
- `05-roadmap.md`: planejamento de versões.
- `06-testes.md`: testes manuais.
- `07-changelog.md`: histórico de mudanças.

---

## Próximos passos

A v0.1 está fechada como núcleo funcional. As próximas melhorias devem ser planejadas para versões futuras.

Possíveis focos para a v0.2:

- Limpeza geral de todos os dados locais com confirmação.
- Tratamento de dados locais inválidos ou corrompidos.
- Exportação/importação simples de dados.
- Melhorias de acessibilidade em modais.
- Evitar ou alertar sobre modelos duplicados.
- Refinamento das mensagens de interface.
- Preparação para modularização futura do JavaScript.

---

## Como executar

Como o projeto é feito com HTML, CSS e JavaScript puro, basta abrir o arquivo `index.html` no navegador.

Durante o desenvolvimento, recomenda-se usar uma extensão de servidor local, como Live Server, para facilitar testes e recarregamento da página.

---

## Autor

Desenvolvido por Vinícius Sidney.
