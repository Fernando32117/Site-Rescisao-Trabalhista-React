// CalculoHorasExtras.js
import React, { useState } from 'react';

function CalculoHorasExtras() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [horasPorSemana, setHorasPorSemana] = useState(0);
  const [adicionalHoraExtra, setAdicionalHoraExtra] = useState(0);
  const [quantidadeHorasExtras, setQuantidadeHorasExtras] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularHorasExtras = async () => {
    const body = {
      salarioBruto: parseFloat(salarioBruto),
      horasPorSemana: parseInt(horasPorSemana),
      adicionalHoraExtra: parseFloat(adicionalHoraExtra),
      quantidadeHorasExtras: parseFloat(quantidadeHorasExtras)
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculoHorasExtras', {
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
      <h1>Calcular Horas Extras</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularHorasExtras(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} required />
        </label>

        <label>
          Horas por Semana:
          <input type="number" value={horasPorSemana} onChange={(e) => setHorasPorSemana(e.target.value)} required />
        </label>

        <label>
          Adicional Hora Extra (%):
          <input type="number" value={adicionalHoraExtra} onChange={(e) => setAdicionalHoraExtra(e.target.value)} required />
        </label>

        <label>
          Quantidade de Horas Extras:
          <input type="number" value={quantidadeHorasExtras} onChange={(e) => setQuantidadeHorasExtras(e.target.value)} required />
        </label>

        <button type="submit">Calcular Horas Extras</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Horas Extras:</h2>
          <p>R$ {resultado.horasExtras}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoHorasExtras;
