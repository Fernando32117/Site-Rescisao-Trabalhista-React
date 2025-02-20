// CalculoFerias.js
import React, { useState } from 'react';

function CalculoFerias() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [diasFerias, setDiasFerias] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularFerias = async () => {
    const body = {
      salarioBruto: parseFloat(salarioBruto),
      dependentes: parseInt(dependentes),
      diasFerias: parseInt(diasFerias)
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculoFerias', {
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
      <h1>Calcular Férias</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularFerias(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Nº de Dependentes:
          <input type="number" value={dependentes} onChange={(e) => setDependentes(e.target.value)} required />
        </label>

        <label>
          Dias de Férias:
          <input type="number" value={diasFerias} onChange={(e) => setDiasFerias(e.target.value)} required />
        </label>

        <button type="submit">Calcular Férias</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Férias:</h2>
          <p>R$ {resultado.ferias}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoFerias;
