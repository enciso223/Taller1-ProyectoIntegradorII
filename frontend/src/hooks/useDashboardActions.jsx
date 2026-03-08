import { apiFetch } from "../services/api";

function useDashboardActions() {

  const runSimulation = async (category, percentage) => {
    return apiFetch("/simulation/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

    return fetch("http://localhost:8000/api/ingestion/upload", {
      method: "POST",
      body: formData
    }).then(res => res.json());
  };

  return { runSimulation, uploadExcel };
}

export default useDashboardActions;