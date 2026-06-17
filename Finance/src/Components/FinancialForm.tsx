import React, { useState } from 'react';
import type { FormData } from './types';
import { FormInput } from './FormInputs';

interface Props {
  onGenerateSimulation: (data: FormData) => void;
}

const FinancialForm: React.FC<Props> = ({ onGenerateSimulation }) => {
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: 0,
    essentialExpenses: 0,
    debts: 0,
    goal: '',
    goalCost: 0,
    goalMonths: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'goal' ? String(value) : Number(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goal || formData.goalCost <= 0 || formData.goalMonths <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
    onGenerateSimulation(formData);
  };

  return (
    <div className="form-container">
      <h2>Educador Financeiro Inteligente</h2>
      <p className="subtitle">Responda as perguntas abaixo para gerar sua simulação personalizada</p>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>📊 Informações Financeiras Mensais</h3>

          <FormInput
            label="1. Qual é a sua renda mensal total?"
            name="monthlyIncome"
            type="number"
            placeholder="R$ 0,00"
            value={formData.monthlyIncome}
            onChange={handleChange}
            required
          />

          <FormInput
            label="2. Quanto você gasta com despesas essenciais?"
            name="essentialExpenses"
            type="number"
            placeholder="R$ 0,00"
            value={formData.essentialExpenses}
            onChange={handleChange}
            required
          />

          <FormInput
            label="3. Você tem dívidas ou compromissos financeiros?"
            name="debts"
            type="number"
            placeholder="R$ 0,00 (parcelas mensais)"
            value={formData.debts}
            onChange={handleChange}
            required
          />
        </div>

        <div className="section">
          <h3>🎯 Seu Objetivo Financeiro</h3>

          <FormInput
            label="4. Qual é o seu sonho ou objetivo financeiro?"
            name="goal"
            type="textarea"
            placeholder="Ex: Comprar um carro, fazer uma viagem para a Europa..."
            value={formData.goal}
            onChange={handleChange}
            required
            rows={3}
          />

          <FormInput
            label="5. Quanto custa realizar esse sonho?"
            name="goalCost"
            type="number"
            placeholder="R$ 0,00"
            value={formData.goalCost}
            onChange={handleChange}
            required
          />

          <FormInput
            label="6. Em quantos meses você quer alcançar esse objetivo?"
            name="goalMonths"
            type="number"
            placeholder="Ex: 12"
            value={formData.goalMonths}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <button type="submit" className="generate-btn">
          Gerar Simulação com IA
        </button>
      </form>
    </div>
  );
};

export default FinancialForm;
