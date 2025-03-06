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
  const [menuOpen, setMenuOpen] = useState(false); // Estado para o menu responsivo

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
        {/* Botão de Hambúrguer para Telas Pequenas */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)} // Alterna o estado do menu
        >
          Menu ☰
        </div>

        {/* Menu de Opções */}
        <ul className={menuOpen ? "show" : ""}>
          <li onClick={() => { setActiveMenu("home"); setMenuOpen(false); }}>
            Início
          </li>
          <li onClick={() => { setActiveMenu("rescisao"); setMenuOpen(false); }}>
            Rescisão Contratual
          </li>
          <li onClick={() => { setActiveMenu("salarioLiquido"); setMenuOpen(false); }}>
            Salário Líquido
          </li>
          <li onClick={() => { setActiveMenu("saldoFGTS"); setMenuOpen(false); }}>
            Saldo FGTS
          </li>
          <li onClick={() => { setActiveMenu("irrf"); setMenuOpen(false); }}>
            Imposto de Renda
          </li>
          <li onClick={() => { setActiveMenu("decimoTerceiro"); setMenuOpen(false); }}>
            Décimo Terceiro
          </li>
          <li onClick={() => { setActiveMenu("ferias"); setMenuOpen(false); }}>
            Férias
          </li>
          <li onClick={() => { setActiveMenu("horasExtras"); setMenuOpen(false); }}>
            Horas Extras
          </li>
        </ul>
      </nav>

      <div className="content-container">{renderContent()}</div>

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
