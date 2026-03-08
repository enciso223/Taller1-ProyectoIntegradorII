import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import useDashboardData from "../hooks/useDashboardData";
import useDashboardActions from "../hooks/useDashboardActions";
import { useDropzone } from "react-dropzone";
//graficas
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
//vista excel
import * as XLSX from "xlsx";
function Dashboard() {

  const informacionGastos = useRef(null);
  const analisisRef = useRef(null);
  const llmRef = useRef(null);
  const simuladorRef = useRef(null);
  const excelRef = useRef(null);

  const [active, setActive] = useState("informacionGastos");

  const [fileName, setFileName] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const [category, setCategory] = useState("");
  const [percentage, setPercentage] = useState("");
  const [simulationResult, setSimulationResult] = useState(null);

  const { stats, loading, loadDashboard, recommendation } = useDashboardData();
  const { runSimulation, uploadExcel } = useDashboardActions();

  const [loadingLLM, setLoadingLLM] = useState(false);
  const handleRecommendation = async () => {
    console.log("CLICK");

    setLoadingLLM(true);

    // dejar que React renderice primero
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await recommendation();
    } catch (error) {
      console.error(error);
    }

    setLoadingLLM(false);
  };

  const scrollToSection = (ref, section) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setActive(section);
  };

  const handleSimulation = async () => {
    try {
      const result = await runSimulation(category, percentage);
      setSimulationResult(result.projected_total_expenses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Selecciona un archivo");
      return;
    }
    try {
      const result = await uploadExcel(excelFile);
      console.log(result);

      await loadDashboard(); //vuelve a pedir datos al backend

      alert("Excel procesado correctamente");

    } catch (error) {
      console.error(error);
    }

  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop: (acceptedFiles) => {

    const file = acceptedFiles[0];
    setExcelFile(file);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {

      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      const formatted = json.map(row => ({
        ...row,
        date: XLSX.SSF.format("dd/mm/yyyy", row.date)
      }));


      setPreviewData(formatted.slice(0, 5)); // solo primeras 5 filas
    };

    reader.readAsArrayBuffer(file);

    }
  });
  //excel preview
  const [previewData, setPreviewData] = useState([]);

  return (
    <div className="layout">

      <Sidebar
        active={active}
        goInformacionGastos={() => scrollToSection(informacionGastos, "informacionGastos")}
        goAnalisis={() => scrollToSection(analisisRef, "analisis")}
        goSimulador={() => scrollToSection(simuladorRef, "simulador")}
        goLLM={() => scrollToSection(llmRef, "llm")}
        goExcel={() => scrollToSection(excelRef, "excel")}
      />

      <div className="content">

        <h4 className="welcome">Bienvenido, aquí está tu análisis</h4>
        {/* EXCEL */}

        <section ref={excelRef} className="card-sectionCargaExcel">
          <h3>Carga de datos</h3>

          <div className="upload-box">

            <div {...getRootProps()} className="dropzone">

              <input {...getInputProps()} />

              {isDragActive ? (
                <p>Suelta los archivos aquí...</p>
              ) : (
                <p>Arrastra y suelta un Excel o haz clic</p>
              )}

              {fileName && (
                <p style={{ marginTop: "10px" }}>
                  Archivo seleccionado: {fileName}
                </p>
              )}

            </div>

          </div>

          <button onClick={handleExcelUpload} className="active"
              style={{ marginTop: "20px" }}>
            Enviar Excel
          </button>
          <div className="card-box" style={{ marginTop: "20px" }}>
            <h4>Vista previa del Excel</h4>
            {previewData.length > 0 && (
            
            <div style={{ marginTop: "20px" }} >


              <table className="preview-table">

                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  {previewData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}

                </tbody>

              </table>
              

          </div>

        )}
        </div>

        </section>


        {/* DASHBOARD */}

        <section ref={informacionGastos} className="card-section">
        

          <div className="stats">

            <div className="stat-card">
              <p>Gastos totales</p>
              <h2>
                {loading ? "$0,00" : `$${stats.gastoMesActual?.toFixed(2)}`}
              </h2>
            </div>
            <div className="stat-card">
              <p>Promedio mensual</p>
              <h2>
                {loading ? "$0,00" : `$${stats.promedioMensual?.toFixed(2)}`}
              </h2>
            </div>
            <div className="stat-card">
              <p>Categoría principal</p>
              <h2>{loading ? "Cargando..." : stats.categoriaPrincipal}</h2>
            </div>

            

          </div>
        </section>

        {/* TENDENCIAS */}

        <section ref={analisisRef} className="card-section">

          <h3>Análisis de gastos</h3>

          <div className="charts-grid">

            <div className="chart-card">
              <h4>Tendencia mensual</h4>
              <MonthlyChart key={stats.tendencia.length} data={stats.tendencia} />
            </div>

            <div className="chart-card">
              <h4>Distribución de gastos</h4>
              <CategoryChart key={stats.categorias.length} data={stats.categorias} />
            </div>

          </div>

        </section>
        {/* SIMULADOR */}

        <section ref={simuladorRef} className="card-section">
          <h3>Simulador de ahorro</h3>

          <div className="card-box">

            <p>
              Ingresa la categoría y el porcentaje de reducción que deseas simular
            </p>

            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
              />

              <input
                type="number"
                placeholder="Porcentaje"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                style={{ padding: "5px" }}
              />
            </div>

            <button onClick={handleSimulation} className="active">
              Simular escenario
            </button>
            <p style={{marginTop:"20px"}}>Gasto proyectado:</p>
              <h2>
                {loading ? "$0,00" : `$${simulationResult?simulationResult.toFixed(2):"0,00"}`}
              </h2>

          </div>

        </section>

        {/* LLM */}

        <section ref={llmRef} className="card-section">
          <h3>Recomendaciones LLM</h3>

          <div className="card-boxRecommenadation">

          {loadingLLM ? (
            <div className="spinner"></div>
          ) : (
            <p>
              {stats.recomendacion || "Aquí aparecerán recomendaciones generadas por IA"}
            </p>
          )}

          <button
            onClick={handleRecommendation}
            className="active"
            disabled={loadingLLM}
          >
            {loadingLLM ? "Generando..." : "Generar recomendación"}
          </button>

        </div>
        </section>

        
      </div>
    </div>
  );
}

export default Dashboard;