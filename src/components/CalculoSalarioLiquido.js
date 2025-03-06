import React, { useState } from 'react';

function CalculoSalarioLiquido() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [outrosDescontos, setOutrosDescontos] = useState(0);
  const [mesAno, setMesAno] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularSalarioLiquido = async () => {
    const inss = salarioBruto * 0.08; // Supondo 8% de INSS
    const irrf = salarioBruto * 0.075; // Supondo 7.5% de IRRF (ajuste conforme a tabela real)
    const descontosDependentes = dependentes * 189.59; // Desconto padrão por dependente
    const salarioLiquido = salarioBruto - inss - irrf - descontosDependentes - parseFloat(outrosDescontos);

    setResultado({ salarioLiquido });
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
          <p>R$ {resultado.salarioLiquido.toFixed(2)}</p>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoSalarioLiquido;
