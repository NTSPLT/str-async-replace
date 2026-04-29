# Revisão rápida da base de código: problemas encontrados e tarefas sugeridas

## 1) Erro de digitação / nomenclatura inconsistente
**Problema observado**
- O parâmetro do callback de `replace` está documentado como `substring`, mas a implementação passa o *match* inteiro e o índice (padrão de `String.prototype.replace`). Isso gera nomenclatura confusa na API e na documentação.

**Tarefa sugerida**
- Padronizar a nomenclatura para `match` (ou `matchedSubstring`) em JSDoc, README e tipos de callback, mantendo consistência entre código e docs.

---

## 2) Bug funcional
**Problema observado**
- Em `replaceMany` e `replaceAllMany`, a validação `if (!search || !replace)` rejeita valores válidos e úteis, como `search: ""` e `replace: ""`, porque string vazia é tratada como *falsy*.
- O texto do erro diz "undefined or null", mas a validação atual também rejeita outros valores falsy.

**Tarefa sugerida**
- Trocar para validação explícita contra `null`/`undefined` (ex.: `search == null || replace == null`) e alinhar o comportamento ao texto da exceção.

---

## 3) Comentário de código / documentação divergente
**Problema observado**
- O construtor afirma lançar `TypeError` quando `inputString` "não é string", mas a checagem real é apenas `if (!inputString)`, que não bloqueia tipos truthy não-string (ex.: `{}`) e bloqueia string vazia por falsy.

**Tarefa sugerida**
- Escolher uma regra única e consistente:
  1. **Ou** atualizar o código para validar tipo explicitamente (`typeof inputString === "string"`),
  2. **Ou** corrigir a documentação para refletir com precisão o comportamento atual.

---

## 4) Melhoria de teste
**Problema observado**
- Não há teste garantindo que valores "falsy mas válidos" em `replaceMany`/`replaceAllMany` funcionem após o ajuste de validação.
- Também falta caso cobrindo mismatch entre documentação e construtor (entrada não-string truthy).

**Tarefa sugerida**
- Adicionar testes de regressão para:
  - aceitar `replace: ""` (substituição por string vazia);
  - comportamento com `search: ""` (definir e documentar expectativa);
  - comportamento do construtor com valor não-string truthy (por exemplo `{}`), alinhado à regra desejada.
