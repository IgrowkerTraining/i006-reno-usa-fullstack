import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//assets
import RenoLogo from "../../assets/RenoLogo.png";

//css
import "./access.css";

//components
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

//services
import { api } from "../../services/api";

//hooks
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.login({ email, password });
      login(response.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-32 h-32 rounded-xl items-center justify-center mb-4">
              <img alt="Reno" src={RenoLogo} className="h-32 w-auto" />

              <h1 className="text_logo mb-2 text-center">RENO</h1>

            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                {error}
              </div>
            )}

            <Input
              label="Correo electrónico"
              placeholder="name@company.com"
              type="email"
              required
              disabled={isLoading}
              value={email}
              className="text-zinc-600 bg-white placeholder:text-zinc-300"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Contraseña"
              placeholder="••••••••"
              type="password"
              required
              disabled={isLoading}
              value={password}
              className="text-zinc-600 bg-white placeholder:text-zinc-300"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 accent-blue-800 focus:ring-blue-700 focus:ring-offset-slate-900"
                />
                <span className="text-sm text-slate-500 my-2">Recuérdame</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-600 font-medium transition-colors"
              >
                Recuperar contraseña
              </button>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-900 hover:bg-blue-600"
              isLoading={isLoading}>
              Acceder
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-600 font-semibold transition-colors"
              >
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
