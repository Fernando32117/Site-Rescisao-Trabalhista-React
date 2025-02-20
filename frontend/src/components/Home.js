import React from "react";

const Home = ({ setActiveMenu }) => {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Calculadora Trabalhista</h1>
      <p>Escolha uma opção no menu acima para começar.</p>
      <button onClick={() => setActiveMenu("rescisao")} className="start-button">
        Iniciar Cálculos
      </button>
    </div>
  );
};

export default Home;
