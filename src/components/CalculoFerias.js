import React, { useState } from 'react';

function CalculoFerias() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [diasFerias, setDiasFerias] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularFerias = async () => {
    const feriasBase = (salarioBruto / 30) * diasFerias;
    const tercoConstitucional = feriasBase / 3;
    const salarioFerias = feriasBase + tercoConstitucional;

    setResultado({ salarioFerias });
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
          <p>R$ {resultado.salarioFerias.toFixed(2)}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoFerias;
