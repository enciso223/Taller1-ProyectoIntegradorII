import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";
import "../styles/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (password !== confirmPassword) {
    setError("Las contraseñas no coinciden");
    return;
  }

  setLoading(true);

  try {
    await registerRequest(name, email, password);
    alert("Usuario registrado correctamente");
    navigate("/login");
  } catch (err) {
    setError(err.message || "No se pudo registrar el usuario");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Crear cuenta</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="login-footer">
          <p>¿Ya tienes cuenta?</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/login")}
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;