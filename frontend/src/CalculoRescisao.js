import React, { useState } from 'react';

function CalculoRescisao() {
  const [salario, setSalario] = useState(0);
  const [dataContratacao, setDataContratacao] = useState('');
  const [dataDemissao, setDataDemissao] = useState('');
  const [motivo, setMotivo] = useState('Dispensa sem justa causa');
  const [avisoPre, setAvisoPre] = useState('Trabalhado');
  const [feriasVencidas, setFeriasVencidas] = useState(0);
  const [temFeriasVencidas, setTemFeriasVencidas] = useState(false);
  const [saldoFGTS, setSaldoFGTS] = useState(0);
  const [resultado, setResultado] = useState(null);

  // Função para calcular o tempo de serviço em meses
  const calcularTempoServico = () => {
    const dataInicio = new Date(dataContratacao);
    const dataFim = new Date(dataDemissao);

    let anos = dataFim.getFullYear() - dataInicio.getFullYear();
    let meses = dataFim.getMonth() - dataInicio.getMonth();
    let dias = dataFim.getDate() - dataInicio.getDate();

    if (dias < 0) {
      meses -= 1;
      dias += new Date(dataFim.getFullYear(), dataFim.getMonth(), 0).getDate();
    }

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    let tempoServicoMeses = (anos * 12) + meses;

    // Considera o mês adicional se trabalhou 15 dias ou mais no último mês
    if (dias >= 15) {
      tempoServicoMeses += 1;
    }

    return tempoServicoMeses;
  };

  // Função para calcular os dias trabalhados no mês de demissão
  const calcularDiasTrabalhadosNoMes = () => {
    const dataFim = new Date(dataDemissao);
    const diaDemissao = dataFim.getDate();

    return diaDemissao;
  };

  // Função para calcular os valores
  const calcularVerbas = async () => {
    const salarioMensal = parseFloat(salario);

    // Calcula o tempo de serviço e os dias trabalhados no mês
    const tempoServicoMeses = calcularTempoServico();
    const diasTrabalhadosNoMes = calcularDiasTrabalhadosNoMes();

    const body = {
      salario: salarioMensal,
      mesesTrabalhados: tempoServicoMeses,
      diasTrabalhadosNoMes: diasTrabalhadosNoMes,
      motivo,
      avisoPre,
      feriasVencidas: temFeriasVencidas ? parseInt(feriasVencidas) : 0,
      saldoFGTS: saldoFGTS || 0,
    };

    try {
      const response = await fetch('http://localhost:3001/api/calculo', {
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
      <h1>Calculadora de Rescisão Trabalhista</h1>
      <form onSubmit={(e) => { e.preventDefault(); calcularVerbas(); }}>
        <label>
          Salário Bruto:
          <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} required />
        </label>

        <label>
          Data de Contratação:
          <input type="date" value={dataContratacao} onChange={(e) => setDataContratacao(e.target.value)} required />
        </label>

        <label>
          Data de Demissão:
          <input type="date" value={dataDemissao} onChange={(e) => setDataDemissao(e.target.value)} required />
        </label>

        <label>
          Motivo:
          <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
            <option value="Dispensa sem justa causa">Dispensa sem justa causa</option>
            <option value="Demissão de comum acordo">Demissão de comum acordo</option>
            <option value="Dispensa com justa causa">Dispensa com justa causa</option>
            <option value="Pedido de demissão">Pedido de demissão</option>
          </select>
        </label>

        <label>
          Aviso Prévio:
          <select value={avisoPre} onChange={(e) => setAvisoPre(e.target.value)}>
            <option value="Trabalhado">Trabalhado</option>
            <option value="Indenizado">Indenizado</option>
            <option value="Não cumprido pelo empregador">Não cumprido pelo empregador</option>
            <option value="Dispensado">Dispensado</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={temFeriasVencidas}
            onChange={() => setTemFeriasVencidas(!temFeriasVencidas)}
          />
          Possui férias vencidas?
        </label>

        {temFeriasVencidas && (
          <label>
            Férias Vencidas (em dias):
            <input type="number" value={feriasVencidas} onChange={(e) => setFeriasVencidas(e.target.value)} />
          </label>
        )}

        <button type="submit">Calcular</button>
      </form>

      {resultado && !resultado.error && (
        <div className="resultado">
          <h2>Resumo do Cálculo:</h2>
          <p><strong>Salário Bruto:</strong> R$ {parseFloat(salario).toFixed(2)}</p>
          <p><strong>Aviso Prévio:</strong> R$ {resultado.avisoPrevio}</p>
          <p><strong>13º Salário Proporcional:</strong> R$ {resultado.decimoTerceiro}</p>
          <p><strong>Férias Proporcionais:</strong> R$ {resultado.feriasProporcionais}</p>
          <p><strong>Férias Vencidas:</strong> R$ {resultado.feriasVencidasValor}</p>
          <p><strong>Saldo FGTS:</strong> R$ {resultado.fgtsSaldo}</p>
          <p><strong>Multa FGTS:</strong> R$ {resultado.multaFGTS}</p>
          <h3><strong>Total a Receber:</strong> R$ {resultado.total}</h3>
        </div>
      )}

      {resultado?.error && <h2>{resultado.error}</h2>}
    </div>
  );
}

export default CalculoRescisao;
