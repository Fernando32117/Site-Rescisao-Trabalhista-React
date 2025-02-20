import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import CalculoRescisao from "./components/CalculoRescisao";
import CalculoSalarioLiquido from "./components/CalculoSalarioLiquido";
import CalculoSaldoFGTS from "./components/CalculoSaldoFGTS";
import CalculoIRRF from "./components/CalculoIRRF";
import CalculoDecimoTerceiro from "./components/CalculoDecimoTerceiro";
import CalculoFerias from "./components/CalculoFerias";
import CalculoHorasExtras from "./components/CalculoHorasExtras";

function App() {
  const [activeMenu, setActiveMenu] = useState("home");

  const renderContent = () => {
    switch (activeMenu) {
      case "home":
        return <Home setActiveMenu={setActiveMenu} />;
      case "rescisao":
        return <CalculoRescisao />;
      case "salarioLiquido":
        return <CalculoSalarioLiquido />;
      case "saldoFGTS":
        return <CalculoSaldoFGTS />;
      case "irrf":
        return <CalculoIRRF />;
      case "decimoTerceiro":
        return <CalculoDecimoTerceiro />;
      case "ferias":
        return <CalculoFerias />;
      case "horasExtras":
        return <CalculoHorasExtras />;
      default:
        return <Home setActiveMenu={setActiveMenu} />;
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
