import "./App.css";
import React, { useState } from "react";
import CalculoRescisao from "./CalculoRescisao";
import CalculoSalarioLiquido from "./CalculoSalarioLiquido";
import CalculoSaldoFGTS from "./CalculoSaldoFGTS";
import CalculoIRRF from "./CalculoIRRF";
import CalculoDecimoTerceiro from "./CalculoDecimoTerceiro";
import CalculoFerias from "./CalculoFerias";
import CalculoHorasExtras from "./CalculoHorasExtras";

function App() {
  const [activeMenu, setActiveMenu] = useState('rescisao');

  // Função para renderizar o componente correto com base no menu ativo
  const renderContent = () => {
    switch (activeMenu) {
      case 'rescisao':
        return <CalculoRescisao />;
      case 'salarioLiquido':
        return <CalculoSalarioLiquido />;
      case 'saldoFGTS':
        return <CalculoSaldoFGTS />;
      case 'irrf':
        return <CalculoIRRF />;
      case 'decimoTerceiro':
        return <CalculoDecimoTerceiro />;
      case 'ferias':
        return <CalculoFerias />;
      case 'horasExtras':
        return <CalculoHorasExtras />;
      default:
        return <CalculoRescisao />;
    }
  };

  return (
    <div className="App">
      <nav className="menu">
        <ul>
          <li onClick={() => setActiveMenu('rescisao')}>Rescisão</li>
          <li onClick={() => setActiveMenu('salarioLiquido')}>Salário Líquido</li>
          <li onClick={() => setActiveMenu('saldoFGTS')}>Saldo FGTS</li>
          <li onClick={() => setActiveMenu('irrf')}>IRRF</li>
          <li onClick={() => setActiveMenu('decimoTerceiro')}>13º Salário</li>
          <li onClick={() => setActiveMenu('ferias')}>Férias</li>
          <li onClick={() => setActiveMenu('horasExtras')}>Horas Extras</li>
        </ul>
      </nav>

      {renderContent()}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/gerfernandosouza/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fernando Souza
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
