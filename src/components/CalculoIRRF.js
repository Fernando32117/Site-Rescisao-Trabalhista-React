import React, { useState } from 'react';

function CalculoIRRF() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularIRRF = async () => {
    const baseCalculo = salarioBruto - (dependentes * 189.59);
    let irrf = 0;
    if (baseCalculo <= 1903.98) {
      irrf = 0;
    } else if (baseCalculo <= 2826.65) {
      irrf = baseCalculo * 0.075 - 142.80;
    } else if (baseCalculo <= 3751.05) {
      irrf = baseCalculo * 0.15 - 354.80;
    } else if (baseCalculo <= 4664.68) {
      irrf = baseCalculo * 0.225 - 636.13;
    } else {
      irrf = baseCalculo * 0.275 - 869.36;
    }
    setResultado({ irrf });
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
          <p>R$ {resultado.irrf.toFixed(2)}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoIRRF;
