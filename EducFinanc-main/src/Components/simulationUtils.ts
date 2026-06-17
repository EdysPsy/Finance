import type { FormData } from './types';

export function buildPrompt(data: FormData): string {
  const available = data.monthlyIncome - data.essentialExpenses - data.debts;
  const monthlyNeeded = Math.ceil(data.goalCost / data.goalMonths);
  const commitmentPct =
    data.monthlyIncome > 0
      ? Math.round(((data.essentialExpenses + data.debts) / data.monthlyIncome) * 100)
      : 0;

  return `Você é um educador financeiro experiente. Analise o planejamento financeiro abaixo e gere um relatório detalhado em português brasileiro.

## Dados do usuário

- **Renda mensal:** R$ ${data.monthlyIncome.toLocaleString('pt-BR')}
- **Despesas essenciais:** R$ ${data.essentialExpenses.toLocaleString('pt-BR')}
- **Dívidas/compromissos mensais:** R$ ${data.debts.toLocaleString('pt-BR')}
- **Valor disponível por mês (calculado):** R$ ${available.toLocaleString('pt-BR')}
- **Comprometimento da renda:** ${commitmentPct}%

## Objetivo financeiro

- **Sonho/objetivo:** ${data.goal}
- **Custo total:** R$ ${data.goalCost.toLocaleString('pt-BR')}
- **Prazo desejado:** ${data.goalMonths} meses
- **Economia mensal necessária:** R$ ${monthlyNeeded.toLocaleString('pt-BR')}

## Relatório solicitado

Gere um relatório com as seguintes seções, usando marcações Markdown (##, **negrito**, listas com -):

1. **Diagnóstico geral** – avalie a saúde financeira atual do usuário.
2. **Viabilidade da meta** – indique se o objetivo é viável, desafiador ou inviável no prazo definido, com justificativa clara.
3. **Pontos de atenção** – identifique riscos ou problemas no planejamento.
4. **Estratégia de economia** – sugira como o usuário pode atingir a economia mensal necessária.
5. **Sugestões de investimento** – recomende produtos financeiros adequados ao prazo e perfil.
6. **Como aumentar a renda** – dê sugestões práticas e realistas para o contexto brasileiro.
7. **Mensagem motivacional** – encerre com uma mensagem encorajadora e personalizada para o objetivo do usuário.

Seja direto, didático e empático. Use linguagem acessível, sem jargões excessivos.`;
}