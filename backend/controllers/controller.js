// Controlador para cálculo de verbas rescisórias
export function calcularVerbas(req, res) {
  const {
    salario,
    mesesTrabalhados,
    diasTrabalhadosNoMes,
    motivo,
    avisoPre,
    feriasVencidas,
    saldoFGTS,
  } = req.body;

  // Log dos dados recebidos
  console.log("Dados recebidos:", req.body);

  // Conversões e validações
  const salarioMensal = parseFloat(salario);
  const totalMesesTrabalhados = parseInt(mesesTrabalhados);
  const diasNoMes = parseInt(diasTrabalhadosNoMes) || 0;
  const feriasVencidasDias = parseInt(feriasVencidas) || 0;
  const saldoFgtsInformado = parseFloat(saldoFGTS) || 0;

  // Validações iniciais dos dados recebidos
  if (!salarioMensal || isNaN(salarioMensal) || salarioMensal <= 0) {
    return res.status(400).json({ error: "Salário inválido." });
  }

  if (isNaN(totalMesesTrabalhados) || totalMesesTrabalhados < 0) {
    return res.status(400).json({ error: "Meses trabalhados inválido." });
  }

  if (isNaN(diasNoMes) || diasNoMes < 0) {
    return res.status(400).json({ error: "Dias trabalhados no mês inválido." });
  }

  if (!motivo) {
    return res.status(400).json({ error: "Motivo da rescisão é obrigatório." });
  }

  const fgtsCalculado = salarioMensal * 0.08 * totalMesesTrabalhados;
  const fgtsSaldo = saldoFgtsInformado > 0 ? saldoFgtsInformado : fgtsCalculado;

  let avisoPrevio = 0;
  let decimoTerceiro = 0;
  let feriasProporcionais = 0;
  let feriasVencidasValor = 0;
  let multaFGTS = 0;
  let total = 0;

  // Cálculo do aviso prévio 
  if (motivo !== "Dispensa com justa causa" && motivo !== "Pedido de demissão") { 
    if (avisoPre === "Trabalhado") { 
        avisoPrevio = salarioMensal; 
    } 
    else if (avisoPre === "Indenizado" || avisoPre === "Não cumprido pelo empregador") { 
        avisoPrevio = salarioMensal; } 
    };

  // Ajuste nos meses trabalhados para o 13º salário proporcional
  let mesesConsideradosParaDecimoTerceiro = totalMesesTrabalhados;

  // Se trabalhou 15 dias ou mais no último mês, adiciona 1 ao total de meses
  if (diasNoMes >= 15) {
    mesesConsideradosParaDecimoTerceiro += 1;
  }

  // Garantir que não exceda 12 meses dentro de um ano
  if (mesesConsideradosParaDecimoTerceiro > 12) {
    mesesConsideradosParaDecimoTerceiro = 12;
  }

  // 13º salário proporcional
  decimoTerceiro = (salarioMensal / 12) * mesesConsideradosParaDecimoTerceiro;

  // Cálculo das férias proporcionais
  const feriasBase = (salarioMensal / 12) * totalMesesTrabalhados;
  const tercoConstitucional = feriasBase * (1 / 3);

  feriasProporcionais = feriasBase + tercoConstitucional;

  //Férias proporcionais (com 1/3 adicional) 
  feriasProporcionais = (salarioMensal / 12) * mesesTrabalhados + ((salarioMensal / 3) / 12) * mesesTrabalhados;

  // Férias vencidas (com 1/3 adicional)
  if (feriasVencidasDias > 0) {
    const feriasVencidasBase = (salarioMensal / 30) * feriasVencidasDias;
    const tercoConstitucionalVencidas = feriasVencidasBase * (1 / 3);

    feriasVencidasValor = feriasVencidasBase + tercoConstitucionalVencidas;
  }

  // Multa do FGTS
  if (motivo === "Dispensa sem justa causa") {
    multaFGTS = fgtsSaldo * 0.4;
  } else if (motivo === "Demissão de comum acordo") {
    multaFGTS = fgtsSaldo * 0.2;
  }

  // Total a receber
  total =
    avisoPrevio +
    decimoTerceiro +
    feriasProporcionais +
    feriasVencidasValor +
    multaFGTS;

    res.json({  
        total: total.toFixed(2),  
        avisoPrevio: !isNaN(avisoPrevio) ? avisoPrevio.toFixed(2) : 0,  
        decimoTerceiro: !isNaN(decimoTerceiro) ? decimoTerceiro.toFixed(2) : 0,  
        feriasProporcionais: !isNaN(feriasProporcionais) ? feriasProporcionais.toFixed(2) : 0,  
        feriasVencidasValor: !isNaN(feriasVencidasValor) ? feriasVencidasValor.toFixed(2) : 0,  
        multaFGTS: !isNaN(multaFGTS) ? multaFGTS.toFixed(2) : 0,  
        fgtsCalculado: !isNaN(fgtsCalculado) ? fgtsCalculado.toFixed(2) : 0,  
        fgtsSaldo: !isNaN(fgtsSaldo) ? fgtsSaldo.toFixed(2) : 0
    });
    
}
