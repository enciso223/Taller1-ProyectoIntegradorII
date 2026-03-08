const API_URL = "http://localhost:8000/api";

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error("Error en la API");
  return res.json();
};