import React, { useEffect, useState } from 'react';
import type { FormData } from './types';
import { buildPrompt } from './simulationUtils';

interface Props {
  data: FormData;
  onReset: () => void;
}

// Converte Markdown simples (##, **, listas) para HTML
function markdownToHtml(text: string): string {
  return text
    .split('\n')
    .map(line => {
      if (/^## (.+)/.test(line)) return `<h3>${line.replace(/^## /, '')}</h3>`;
      if (/^# (.+)/.test(line)) return `<h2>${line.replace(/^# /, '')}</h2>`;
      if (/^- (.+)/.test(line)) return `<li>${applyInline(line.replace(/^- /, ''))}</li>`;
      if (line.trim() === '') return '<br/>';
      return `<p>${applyInline(line)}</p>`;
    })
    .join('')
    .replace(/(<li>.*<\/li>)+/g, match => `<ul>${match}</ul>`);
}

function applyInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

const SimulationCard: React.FC<Props> = ({ data, onReset }) => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError('');
      setReport('');

      try {
        const prompt = buildPrompt(data);

        const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'a4f9a848a39e4f24a3768ee9d9ea56a1.efct47cryP577Xu3' // Substitua pela sua chave real, idealmente via variável de ambiente
          },
          body: JSON.stringify({
            model: 'glm-4.5-flash',
            max_tokens: 10000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Erro na API GLM: ${response.status}`);
        }

        const json = await response.json();
        const text: string = json.choices?.[0]?.message?.content ?? '';

        setReport(text);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro desconhecido ao consultar a IA.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [data]);

  return (
    <div className="simulation-card">
      <div className="card-header">
        <h2>📈 Relatório de Viabilidade Financeira</h2>
        <button onClick={onReset} className="reset-btn">Nova Simulação</button>
      </div>

      <div className="result-section">
        <h3>Objetivo</h3>
        <p><strong>Sonho:</strong> {data.goal}</p>
        <p><strong>Valor:</strong> R$ {data.goalCost.toLocaleString('pt-BR')}</p>
        <p><strong>Prazo:</strong> {data.goalMonths} meses</p>
      </div>

      {loading && (
        <div className="result-section ai-loading">
          <p>🤖 Consultando GLM-4.5-Flash e gerando seu relatório...</p>
          <div className="loading-bar" />
        </div>
      )}

      {error && (
        <div className="result-section">
          <p className="warning">❌ {error}</p>
          <p>Verifique sua chave de API ou conexão.</p>
        </div>
      )}

      {!loading && !error && report && (
        <div className="ai-report-container">
          <div className="ai-response-card">
            <div className="ai-card-header">
              <span className="ai-badge">Análise Inteligente</span>
              <h4>🧠 Diagnóstico de Viabilidade</h4>
            </div>

            <div className="ai-meta-summary">
              <div className="meta-item">
                <span className="meta-label">Meta Mensal Estimada:</span>
                <span className="meta-value">R$ {Math.round(data.goalCost / data.goalMonths).toLocaleString('pt-BR')} /mês</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Complexidade do Plano:</span>
                <span className={`meta-badge ${data.goalMonths < 12 ? 'high' : 'medium'}`}>
                  {data.goalMonths < 12 ? '⚡ Curto Prazo' : '📅 Estruturado'}
                </span>
              </div>
            </div>

            <hr className="divider" />

            <div
              className="ai-report-content"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(report) }}
            />

            <div className="ai-card-footer">
              <p>💡 <em>Relatório gerado via IA. Revise os aportes de acordo com seu orçamento real.</em></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationCard;

