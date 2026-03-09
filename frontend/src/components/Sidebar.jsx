import { useNavigate } from "react-router-dom";

function Sidebar({
  active,
  goInformacionGastos,
  goAnalisis,
  goLLM,
  goSimulador,
  goExcel
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Secure Finance</h2>

      <p className="menu-title">PRINCIPAL</p>
      <ul>
        <li
          onClick={goExcel}
          className={active === "excel" ? "active" : ""}
        >
          Cargar Excel
        </li>
      </ul>

      <ul>
        <li
          onClick={goInformacionGastos}
          className={active === "informacionGastos" ? "active" : ""}
        >
          Datos
        </li>

        <li
          onClick={goAnalisis}
          className={active === "analisis" ? "active" : ""}
        >
          Análisis
        </li>
      </ul>

      <p className="menu-title">INTELIGENCIA ARTIFICIAL</p>
      <ul>
        <li
          onClick={goSimulador}
          className={active === "simulador" ? "active" : ""}
        >
          Simulación de ahorro
        </li>

        <li
          onClick={goLLM}
          className={active === "llm" ? "active" : ""}
        >
          Recomendaciones LLM
        </li>
      </ul>

      <p className="menu-title">CONFIGURACIÓN</p>
      <ul>
        <li onClick={handleLogout} className="logout">
          Cerrar Sesión
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;