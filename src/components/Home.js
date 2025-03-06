import React, { useState } from "react";

function Home({ setActiveMenu }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleAccordion = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="home-container">
      <div className="main-content">
      <h1>Bem-vindo à Calculadora Trabalhista</h1>
      <p>Escolha uma opção no menu acima para começar.</p>
      <button onClick={() => setActiveMenu("rescisao")} className="start-button">
        Iniciar Cálculos
      </button>
      </div>

      <div className="info-section">
  <h2>Informações sobre os Cálculos usados</h2>
  <ul className="accordion">
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "rescisao" ? "active" : ""}`}
        onClick={() => toggleAccordion("rescisao")}
      >
        Rescisão
      </div>
      <div className={`accordion-content ${openSection === "rescisao" ? "open" : ""}`}>
        <p><strong>Calcule os valores devidos ao funcionário no caso de demissão:</strong></p>
        <ul>
          <li><strong>Aviso Prévio:</strong> Salário Bruto.</li>
          <li><strong>Férias Proporcionais:</strong> (Salário Bruto / 12) × Meses Trabalhados no Ano.</li>
          <li><strong>1/3 Constitucional:</strong> Férias Proporcionais × (1/3).</li>
          <li><strong>13º Salário Proporcional:</strong> (Salário Bruto / 12) × Meses Trabalhados.</li>
          <li><strong>Multa FGTS:</strong> Saldo do FGTS × Percentual da Multa (40% ou 20%).</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "salarioLiquido" ? "active" : ""}`}
        onClick={() => toggleAccordion("salarioLiquido")}
      >
        Salário Líquido
      </div>
      <div className={`accordion-content ${openSection === "salarioLiquido" ? "open" : ""}`}>
        <p><strong>Descubra o valor que você realmente recebe após os descontos:</strong></p>
        <ul>
          <li><strong>Base INSS:</strong> Aplicar a alíquota do INSS.</li>
          <li><strong>Base IRRF:</strong> Salário Bruto - INSS - (Dependentes × 189.59).</li>
          <li><strong>IRRF:</strong> Base IRRF × Alíquota - Deduções.</li>
          <li><strong>Salário Líquido:</strong> Salário Bruto - INSS - IRRF - Outros Descontos.</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "saldoFGTS" ? "active" : ""}`}
        onClick={() => toggleAccordion("saldoFGTS")}
      >
        Saldo FGTS
      </div>
      <div className={`accordion-content ${openSection === "saldoFGTS" ? "open" : ""}`}>
        <p><strong>Saiba quanto foi acumulado no seu Fundo de Garantia:</strong></p>
        <ul>
          <li><strong>FGTS Mensal:</strong> Salário Bruto × 0.08.</li>
          <li><strong>Saldo FGTS:</strong> FGTS Mensal × Meses.</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "irrf" ? "active" : ""}`}
        onClick={() => toggleAccordion("irrf")}
      >
        IRRF
      </div>
      <div className={`accordion-content ${openSection === "irrf" ? "open" : ""}`}>
        <p><strong>Calcule o Imposto de Renda Retido na Fonte com base no salário:</strong></p>
        <ul>
          <li><strong>Base IRRF:</strong> Salário Bruto - INSS - (Dependentes × 189.59).</li>
          <li><strong>Tabela IRRF:</strong> Aplicar alíquota progressiva e deduções.</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "decimoTerceiro" ? "active" : ""}`}
        onClick={() => toggleAccordion("decimoTerceiro")}
      >
        13º Salário
      </div>
      <div className={`accordion-content ${openSection === "decimoTerceiro" ? "open" : ""}`}>
        <p><strong>Estime o valor do décimo terceiro proporcional:</strong></p>
        <ul>
          <li><strong>Cálculo:</strong> (Salário Bruto / 12) × Meses Trabalhados.</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "ferias" ? "active" : ""}`}
        onClick={() => toggleAccordion("ferias")}
      >
        Férias
      </div>
      <div className={`accordion-content ${openSection === "ferias" ? "open" : ""}`}>
        <p><strong>Saiba quanto você receberá durante o período de descanso:</strong></p>
        <ul>
          <li><strong>Férias Proporcionais:</strong> (Salário Bruto / 30) × Dias de Férias.</li>
          <li><strong>1/3 Constitucional:</strong> Férias Proporcionais × (1/3).</li>
          <li><strong>Total de Férias:</strong> Férias Proporcionais + 1/3 Constitucional.</li>
        </ul>
      </div>
    </li>
    <li className="accordion-item">
      <div
        className={`accordion-header ${openSection === "horasExtras" ? "active" : ""}`}
        onClick={() => toggleAccordion("horasExtras")}
      >
        Horas Extras
      </div>
      <div className={`accordion-content ${openSection === "horasExtras" ? "open" : ""}`}>
        <p><strong>Calcule o valor devido por horas extras trabalhadas:</strong></p>
        <ul>
          <li><strong>Hora Normal:</strong> Salário Bruto / (Horas Semanais × 4.5).</li>
          <li><strong>Valor Hora Extra:</strong> Hora Normal × (1 + Percentual Adicional / 100).</li>
          <li><strong>Total de Horas Extras:</strong> Valor Hora Extra × Quantidade de Horas Extras.</li>
        </ul>
      </div>
    </li>
  </ul>
</div>



    </div>

    
  );
};

export default Home;
