const API_URL = "/api";

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error("Error en la API");
  return res.json();
};