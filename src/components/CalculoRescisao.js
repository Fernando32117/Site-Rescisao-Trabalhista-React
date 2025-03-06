import React, { useState } from 'react';

function CalculoRescisao() {
  const [salario, setSalario] = useState(0);
  const [dataContratacao, setDataContratacao] = useState('');
  const [dataDemissao, setDataDemissao] = useState('');
  const [motivo, setMotivo] = useState('Dispensa sem justa causa');
  const [avisoPre, setAvisoPre] = useState('Trabalhado');
  const [feriasVencidas, setFeriasVencidas] = useState(0);
  const [temFeriasVencidas, setTemFeriasVencidas] = useState(false);
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

    let tempoServicoMeses = anos * 12 + meses;

    // Considera o mês adicional se trabalhou 15 dias ou mais no último mês
    if (dias >= 15) {
      tempoServicoMeses += 1;
    }

    return tempoServicoMeses;
  };

  // Função para calcular os valores de rescisão
  const calcularRescisao = () => {
    const salarioMensal = parseFloat(salario);
    const tempoServicoMeses = calcularTempoServico();

    // FGTS Acumulado
    const fgtsMensal = salarioMensal * 0.08;
    const fgtsTotal = fgtsMensal * tempoServicoMeses;

    // Aviso Prévio
    const avisoPrevio = avisoPre === 'Indenizado' ? salarioMensal : 0;

    // 13º Salário Proporcional
    const decimoTerceiro = (salarioMensal / 12) * tempoServicoMeses;

    // Férias Proporcionais
    const feriasProporcionais = (salarioMensal / 12) * tempoServicoMeses;

    // 1/3 Constitucional de Férias
    const umTercoFerias = feriasProporcionais / 3;

    // Férias Vencidas (se aplicável)
    const feriasVencidasValor = temFeriasVencidas
      ? (salarioMensal / 30) * parseInt(feriasVencidas)
      : 0;

    // Multa FGTS (40%)
    const multaFGTS = fgtsTotal * 0.4;

    // Total a Receber
    const total =
      avisoPrevio +
      decimoTerceiro +
      feriasProporcionais +
      umTercoFerias +
      feriasVencidasValor +
      multaFGTS;

    // Atualiza o resultado
    setResultado({
      fgtsTotal: fgtsTotal.toFixed(2),
      avisoPrevio: avisoPrevio.toFixed(2),
      decimoTerceiro: decimoTerceiro.toFixed(2),
      feriasProporcionais: feriasProporcionais.toFixed(2),
      feriasVencidasValor: feriasVencidasValor.toFixed(2),
      umTercoFerias: umTercoFerias.toFixed(2),
      multaFGTS: multaFGTS.toFixed(2),
      total: total.toFixed(2),
    });
  };

  return (
    <div>
      <h1>Calculadora de Rescisão Trabalhista</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calcularRescisao();
        }}
      >
        <label>
          Salário Bruto:
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            required
          />
        </label>

        <label>
          Data de Contratação:
          <input
            type="date"
            value={dataContratacao}
            onChange={(e) => setDataContratacao(e.target.value)}
            required
          />
        </label>

        <label>
          Data de Demissão:
          <input
            type="date"
            value={dataDemissao}
            onChange={(e) => setDataDemissao(e.target.value)}
            required
          />
        </label>

        <label>
          Motivo:
          <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
            <option value="Dispensa sem justa causa">
              Dispensa sem justa causa
            </option>
            <option value="Demissão de comum acordo">
              Demissão de comum acordo
            </option>
            <option value="Dispensa com justa causa">
              Dispensa com justa causa
            </option>
            <option value="Pedido de demissão">Pedido de demissão</option>
          </select>
        </label>

        <label>
          Aviso Prévio:
          <select
            value={avisoPre}
            onChange={(e) => setAvisoPre(e.target.value)}
          >
            <option value="Trabalhado">Trabalhado</option>
            <option value="Indenizado">Indenizado</option>
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
            <input
              type="number"
              value={feriasVencidas}
              onChange={(e) => setFeriasVencidas(e.target.value)}
            />
          </label>
        )}

        <button type="submit">Calcular</button>
      </form>

      {resultado && (
        <div className="resultado">
          <h2>Resumo do Cálculo:</h2>
          <p><strong>FGTS Total:</strong> R$ {resultado.fgtsTotal}</p>
          <p><strong>Aviso Prévio:</strong> R$ {resultado.avisoPrevio}</p>
          <p><strong>13º Salário Proporcional:</strong> R$ {resultado.decimoTerceiro}</p>
          <p><strong>Férias Proporcionais:</strong> R$ {resultado.feriasProporcionais}</p>
          <p><strong>1/3 de Férias:</strong> R$ {resultado.umTercoFerias}</p>
          <p><strong>Férias Vencidas:</strong> R$ {resultado.feriasVencidasValor}</p>
          <p><strong>Multa FGTS:</strong> R$ {resultado.multaFGTS}</p>
          <h3><strong>Total a Receber:</strong> R$ {resultado.total}</h3>
        </div>
      )}
    </div>
  );
}

export default CalculoRescisao;
