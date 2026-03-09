import { apiFetch } from "../services/api";

function useDashboardActions() {
  const token = localStorage.getItem("token");

  const runSimulation = async (category, percentage) => {
    return apiFetch("/simulation/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        category,
        percentage
      })
    });
  };

  const uploadExcel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch("/ingestion/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
  };

  return { runSimulation, uploadExcel };
}

export default useDashboardActions;