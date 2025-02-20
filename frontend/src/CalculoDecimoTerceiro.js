import React, { useState } from 'react';

function CalculoDecimoTerceiro() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [mesesTrabalhados, setMesesTrabalhados] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularDecimoTerceiro = async () => {
    const body = {
      salarioBruto: parseFloat(salarioBruto),
      dependentes: parseInt(dependentes),
      mesesTrabalhados: parseInt(mesesTrabalhados)
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculoDecimoTerceiro', {
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
      <h1>Calcular 13º Salário</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularDecimoTerceiro(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Nº de Dependentes:
          <input type="number" value={dependentes} onChange={(e) => setDependentes(e.target.value)} required />
        </label>

        <label>
          Meses Trabalhados no Ano:
          <input type="number" value={mesesTrabalhados} onChange={(e) => setMesesTrabalhados(e.target.value)} required />
        </label>

        <button type="submit">Calcular Décimo Terceiro</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Décimo Terceiro:</h2>
          <p>R$ {resultado.decimoTerceiro}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoDecimoTerceiro;
