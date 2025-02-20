// SalarioLiquido.js
import React, { useState } from 'react';

function CalculoSalarioLiquido() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [outrosDescontos, setOutrosDescontos] = useState(0);
  const [mesAno, setMesAno] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularSalarioLiquido = async () => {
    const body = {
      salarioBruto: parseFloat(salarioBruto),
      dependentes: parseInt(dependentes),
      outrosDescontos: parseFloat(outrosDescontos),
      mesAno
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculoSalarioLiquido', {
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
      <h1>Calcular Salário Líquido</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularSalarioLiquido(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Nº de Dependentes:
          <input type="number" value={dependentes} onChange={(e) => setDependentes(e.target.value)} required />
        </label>

        <label>
          Outros Descontos:
          <input type="number" value={outrosDescontos} onChange={(e) => setOutrosDescontos(e.target.value)} required />
        </label>

        <label>
          Mês/Ano:
          <input type="month" value={mesAno} onChange={(e) => setMesAno(e.target.value)} required />
        </label>

        <button type="submit">Calcular Salário Líquido</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Salário Líquido:</h2>
          <p>R$ {resultado.salarioLiquido}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoSalarioLiquido;
