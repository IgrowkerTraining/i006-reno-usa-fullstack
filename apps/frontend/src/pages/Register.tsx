import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//assets
import RenoLogo from "../assets/RenoLogo.png";

//css
import "./access.css";

//components
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

//services
import { getSecurityTip } from "../services/service";
import { api } from "../services/api";

//hooks
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [securityTip, setSecurityTip] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      const tip = await getSecurityTip();
      setSecurityTip(tip);
    };
    fetchTip();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null);
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);

    const newErrors: Record<string, string> = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(response.user);
      navigate("/dashboard");
    } catch (err: any) {
      setServerError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400">
      <div className="w-full max-w-lg">
        <div className="bg-white backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <p className="text-3xl font-bold text-blue-900 mb-6">
              Crear cuenta
            </p>
            <div className="w-32 h-32 rounded-xl items-center justify-center mb-4">
              <img alt="Reno" src={RenoLogo} className="h-32 w-auto" />

              <h1 className="text_logo mb-2 text-center">RENO</h1>

            </div>
          </div>

          {serverError && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
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
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <Input
                label="Nombre"
                name="name"
                placeholder="Introduzca su nombre"
                required
                disabled={isLoading}
                value={formData.name}
                className="text-zinc-600 bg-white placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Apellidos"
                name="name"
                placeholder="Introduzca sus apellidos"
                required
                disabled={isLoading}
                value={formData.name}
                className="text-zinc-600 bg-white placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                disabled={isLoading}
                value={formData.email}
                className="text-zinc-600 bg-white placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>
            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              error={errors.password}
              value={formData.password}
              className="text-zinc-600 bg-white placeholder:text-zinc-300"
              onChange={handleChange}
            />
            <Input
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              error={errors.confirmPassword}
              value={formData.confirmPassword}
              className="text-zinc-600 bg-white placeholder:text-zinc-300"
              onChange={handleChange}
            />

            <div className="md:col-span-2 mt-4">
              <Button type="submit" className="w-full mt-4 bg-blue-900 hover:bg-blue-600" isLoading={isLoading}>
                Registrarse
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-600 font-semibold transition-colors"
              >
                Iniciar sessión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
