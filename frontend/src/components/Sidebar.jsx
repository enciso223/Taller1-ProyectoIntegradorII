function Sidebar({ goInformacionGastos, goAnalisis, goLLM, goSimulador, goExcel }) {
  return (
    <div className="sidebar">

      <h2 className="logo">Secure Finance</h2>

      <p className="menu-title">PRINCIPAL</p>
      <ul>
        <li onClick={goExcel} className="active"
            
            >Cargar Excel</li>
      </ul>

      <ul>
        <li onClick={goInformacionGastos}>Datos</li>
        <li onClick={goAnalisis}>Análisis</li>
      </ul>

      <p className="menu-title">INTELIGENCIA ARTIFICIAL</p>

      <ul>
        <li onClick={goSimulador}>Simulación de ahorro</li>
        <li onClick={goLLM}>Recomendaciones LLM</li>
        
      </ul>

      <p className="menu-title">CONFIGURACIÓN</p>
      <ul>
        <li onClick={goExcel} className="active"
            
            >Cerrar Sesion</li>
      </ul>

      

    </div>
  );
}

export default Sidebar;