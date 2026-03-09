import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

function useDashboardData() {

  const [stats, setStats] = useState({

    gastos: 0,
    gastoMesActual: 0,
    simulacion: 0,
    categorias: [],
    tendencia: [],
    categoriaPrincipal: "",
    recomendacion: [],
    riesgo: "",
    proyeccion: 0,
    promedioMensual: 0
    });

  const [metricas, setMetricas] = useState({
    total_requests: 0,
    total_tokens: 0,
    total_cost_usd: 0,
    avg_tokens: 0,
    avg_cost: 0,
    avg_response_time: 0,
    error_rate: 0,
    hallucinations_detected: 0,
    monthly_cost_projection: []
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const loadDashboard = async () => {
    

    const data = await apiFetch("/analysis/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });


    // obtener mes actual
    const currentMonth = new Date().toISOString().slice(0,7);

    // buscar ese mes en monthly_trend
    const mesActual = data?.monthly_trend?.find(
      m => m.month === currentMonth
    );

    const totalMesActual = mesActual ? mesActual.total : 0;

    setStats(prev => ({
      ...prev,
      gastoMesActual: totalMesActual,
      gastos: data.total_expenses,
      categorias: data.category_breakdown.sort((a,b)=>b.total-a.total),
      tendencia: data.monthly_trend,
      categoriaPrincipal: data.highest_category,
      promedioMensual: data.average_monthly_expense
    }));

    setLoading(false);
  };


  const recommendation = async () => {

    const data = await apiFetch("/recommendation/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    console.log(data.recommendations);
    console.log(typeof data.recommendations);
    setStats(prev => ({
      ...prev,
      recomendacion: data.recommendations,
      riesgo: data.risk_level,
      proyeccion: data.projected_savings 
    }));
  };
  const loadLLMMetrics = async () => {

      const data = await apiFetch("/metrics/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      console.log("Datos métricas recibidos:", data);

      setMetricas({
        total_requests: data.total_requests,
        total_tokens: data.total_tokens,
        total_cost_usd: data.total_cost_usd,
        avg_tokens: data.avg_tokens,
        avg_cost: data.avg_cost,
        avg_response_time: data.avg_response_time,
        error_rate: data.error_rate,
        hallucinations_detected: data.hallucinations_detected,
        monthly_cost_projection: data.monthly_cost_projection
      });

    };
    
  useEffect(() => {
    loadDashboard();
    loadLLMMetrics();
  }, []);

  return { stats,metricas, loading, loadDashboard, recommendation, loadLLMMetrics };
}

export default useDashboardData;