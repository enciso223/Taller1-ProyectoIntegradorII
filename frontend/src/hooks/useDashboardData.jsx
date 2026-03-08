import { useState, useEffect } from "react";

function useDashboardData() {

  const [stats, setStats] = useState({

    gastos: 0,
    gastoMesActual: 0,
    simulacion: 0,
    recomendacion: "",
    categorias: [],
    tendencia: [],
    categoriaPrincipal: "",
    recomendacion: "",
    promedioMensual: 0
    });

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {

    const res = await fetch("http://localhost:8000/api/analysis/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    // obtener mes actual
    const currentMonth = new Date().toISOString().slice(0,7);

    // buscar ese mes en monthly_trend
    const mesActual = data.monthly_trend.find(
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

  useEffect(() => {
    loadDashboard();
  }, []);

  const recommendation = async () => {

    const res = await fetch("http://localhost:8000/api/recommendation/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    setStats(prev => ({
      ...prev,
      recomendacion: data.recommendations
    }));
  };

  return { stats, loading, loadDashboard, recommendation };
}

export default useDashboardData;