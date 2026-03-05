import { useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Dashboard() {

  const dashboardRef = useRef(null);
  const analisisRef = useRef(null);
  const llmRef = useRef(null);
  const simuladorRef = useRef(null);
  const excelRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="layout">

      <Sidebar
        goDashboard={() => scrollToSection(dashboardRef)}
        goAnalisis={() => scrollToSection(analisisRef)}
        goLLM={() => scrollToSection(llmRef)}
        goSimulador={() => scrollToSection(simuladorRef)}
        goExcel={() => scrollToSection(excelRef)}
      />

      <div className="content"  >

        <h4 className="welcome">Bienvenido, aquí está tu análisis</h4>

        <section ref={dashboardRef} className="card-section">
          <h3>Dashboard</h3>

          <div className="stats">

            <div className="stat-card">
              <p>Gastos totales</p>
              <h2>$0.00</h2>
            </div>

            <div className="stat-card">
              <p>Ahorro</p>
              <h2>$0.00</h2>
            </div>

          </div>
        </section>

        <section ref={analisisRef} className="card-section">
          <h3>Tendencias</h3>

          <div className="chart-placeholder">
            Aquí irá la gráfica de tendencias
          </div>

        </section>

        <section ref={llmRef} className="card-section">
          <h3>Recomendaciones LLM</h3>

          <div className="card-box">
            Aquí aparecerán recomendaciones generadas por IA
          </div>

        </section>

        <section ref={simuladorRef} className="card-section">
          <h3>Simulador de ahorro</h3>

          <div className="card-box">
            Simulación de reducción de gastos
          </div>

        </section>


        <section ref={excelRef} className="card-section">
          <h3>Carga de datos</h3>

          <div className="upload-box">
            Arrastra tu Excel aquí
          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;