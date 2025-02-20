// CalculoIRRF.js
import React, { useState } from 'react';

function CalculoIRRF() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularIRRF = async () => {
    const body = {
      salarioBruto: parseFloat(salarioBruto),
      dependentes: parseInt(dependentes)
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculoIRRF', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      setResultado({ error: 'Erro ao calcular!' });
    }
  };

  return (
    <div>
      <h1>Calcular IRRF</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularIRRF(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Nº de Dependentes:
          <input type="number" value={dependentes} onChange={(e) => setDependentes(e.target.value)} required />
        </label>

        <button type="submit">Calcular IRRF</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>IRRF:</h2>
          <p>R$ {resultado.irrf}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoIRRF;
