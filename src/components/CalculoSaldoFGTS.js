import React, { useState } from 'react';

function CalculoSaldoFGTS() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [meses, setMeses] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularSaldoFGTS = async () => {
    const fgtsMensal = salarioBruto * 0.08;
    const saldoFGTS = fgtsMensal * meses;
    setResultado({ saldoFGTS });
  };

  return (
    <div>
      <h1>Calcular Saldo FGTS</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularSaldoFGTS(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Meses:
          <input type="number" value={meses} onChange={(e) => setMeses(e.target.value)} required />
        </label>

        <button type="submit">Calcular FGTS</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Saldo FGTS:</h2>
          <p>R$ {resultado.saldoFGTS.toFixed(2)}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoSaldoFGTS;
