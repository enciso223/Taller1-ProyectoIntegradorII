import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";
import "../styles/login.css";

function Login() {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(email, password);
      localStorage.setItem("token", data.access_token);
      navigate("/main");
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <h1>FinSight</h1>
          <p>Analiza tus gastos con inteligencia financiera</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-overlay"></div>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Iniciar sesión</h2>

          <form className="login-form" onSubmit={handleSubmit}>
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

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="login-footer">
            <p>¿No tienes cuenta?</p>
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;