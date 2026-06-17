import React, { useState } from 'react';
import FinancialForm from './Components/FinancialForm';
import SimulationCard from './Components/SimulationCard';
import type { FormData } from './Components/types';


const App: React.FC = () => {
  const [simulationData, setSimulationData] = useState<FormData | null>(null);

  const handleGenerate = (data: FormData) => {
    setSimulationData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => setSimulationData(null);

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Educador Financeiro Inteligente</h1>
        <p>Planeje seu futuro com inteligência e disciplina</p>
      </header>

      <main>
        {!simulationData ? (
          <FinancialForm onGenerateSimulation={handleGenerate} />
        ) : (
          <SimulationCard data={simulationData} onReset={handleReset} />
        )}
      </main>

      <footer>
        <p>Desenvolvido para ajudar você a conquistar seus sonhos financeiros</p>
      </footer>
    </div>
  );
};

export default App;
