const API_URL = "/api";

export async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let data = {};
  const text = await response.text();

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { detail: text || "Respuesta inválida del servidor" };
  }

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

export async function registerRequest(name, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  let data = {};
  const text = await response.text();

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { detail: text || "Respuesta inválida del servidor" };
  }

  if (!response.ok) {
    throw new Error(data.detail || "No se pudo registrar el usuario");
  }

  return data;
}