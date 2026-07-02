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
- Modelos reutilizáveis.

A aplicação funciona como uma sessão de foco: o usuário define uma missão, escolhe um tempo limite, adiciona microtarefas e acompanha seu progresso até finalizar a execução.

---

## Funcionalidades

### Missões

- Criar uma missão de foco com título e tempo definido.
- Limitar o tempo máximo da missão.
- Exibir tempo em minutos ou horas.
- Iniciar, pausar, retomar, reiniciar, cancelar e finalizar uma missão.
- Finalizar automaticamente quando o timer chega a zero.
- Visualizar mensagens de orientação durante o uso.

### Microtarefas

- Adicionar microtarefas curtas.
- Remover microtarefas.
- Marcar microtarefas como concluídas.
- Desmarcar microtarefas.
- Visualizar progresso com base nas tarefas concluídas.

### Histórico

- Salvar missões finalizadas localmente.
- Visualizar histórico em painel lateral.
- Ver data, hora, tempo planejado, tempo usado e progresso.
- Repetir missão a partir do histórico.
- Excluir item individual do histórico.
- Apagar histórico com confirmação.

### Modelos

- Salvar missão como modelo.
- Abrir modal com modelos salvos.
- Usar modelo salvo para preencher uma nova missão.
- Excluir modelo com confirmação.

### Segurança de ações

- Modal de confirmação para ações perigosas:
  - Reiniciar missão;
  - Cancelar missão;
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

## Status do projeto

Em desenvolvimento.

Versão atual: `v0.1` — núcleo funcional da missão.

A aplicação já possui o fluxo principal funcionando em desktop, incluindo criação de missão, timer, microtarefas, histórico, modelos e modais de confirmação.

Ainda estão pendentes:

- Responsividade completa para mobile;
- Recuperação da missão ativa após recarregar a página;
- Testes manuais completos;
- Melhorias de acessibilidade;
- Refatoração futura do JavaScript em módulos.

---

## Próximos passos

- Finalizar testes manuais da v0.1.
- Corrigir bugs encontrados durante os testes.
- Refinar responsividade para dispositivos móveis.
- Implementar recuperação de missão ativa após recarregar a página.
- Melhorar acessibilidade dos modais e controles.
- Revisar textos de orientação.
- Organizar futuramente o JavaScript em módulos.
- Preparar fechamento da versão v0.1.

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

## Autor

Desenvolvido por Vinícius Sidney.
