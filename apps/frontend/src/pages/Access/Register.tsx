import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//assets
import RenoLogo from "../../assets/RenoLogo.png";

//css
import "./access.css";

//components
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

//services
import { getSecurityTip } from "../../services/service";
import { api } from "../../services/authServices";

//hooks
import { useAuth } from "../../hooks/useAuth";
import icons_trades_types from "@/src/components/common/icons_trades_types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    trade: ""
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Erase the input error when the user starts to type
    setErrors((prev) => {
      if (prev[name]) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });

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
        name: formData.name + " " + formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
<<<<<<< HEAD
        role: formData.role.trim() || "user",
=======
        role: formData.role.trim().toLowerCase() || "user", 
>>>>>>> 006dc3a07177086b43a8b252474f0a577da806b4
        trade: formData.trade.trim() || null
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
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <p className="text-3xl font-bold text-blue-900 mb-6">
              Create your account
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
            <div className="mt-5 flex justify-items-center gap-16">
              <div className="md:col-span-2">
                <div className="text-zinc-600 mb-2">
                  <label htmlFor="role">Select your role:</label>
                </div>
                <select
                  name="role"
                  required
                  disabled={isLoading}
                  value={formData.role}
                  className="bg_inputs text-zinc-600 placeholder:text-zinc-300 my-2 w-48 p-2 border-2 border-slate-300 rounded-md"
                  onChange={handleChange}
                >
                  <option value="">---</option>
                  <option value="professional">Professional</option>
                  <option value="user">User</option>
                </select>

              </div>

              <div className={formData.role === "user" ? "md:col-span-2" : "hidden"}>
                <div className="text-zinc-600 mb-2">
                  <label htmlFor="trade">Select your trade:</label>
                </div>
                <select
                  name="trade"
                  disabled={isLoading}
                  value={formData.trade}
                  className="bg_inputs text-zinc-600 placeholder:text-zinc-300 my-2 w-48 p-2 border-2 border-slate-300 rounded-md"
                  onChange={handleChange}
                >
                  <option value="">---</option>
                  {icons_trades_types?.map((trade) => (
                    <option key={trade.trade_type} value={trade.trade_type}>{trade.trade_type}</option>
                  ))}
                </select>

              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-zinc-600 mb-2">
                <label htmlFor="name">Name:</label>
              </div>
              <Input
                name="name"
                placeholder="Add your name and middle name here"
                required
                disabled={isLoading}
                value={formData.name}
                className="bg_inputs text-zinc-600 bg_inputs placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <div className="text-zinc-600 mb-2">
                <label htmlFor="lastName">Last name:</label>
              </div>
              <Input
                name="lastName"
                placeholder="Add all of your last names"
                required
                disabled={isLoading}
                value={formData.lastName}
                className="bg_inputs text-zinc-600 placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <div className="text-zinc-600 mb-2">
                <label htmlFor="email">Email:</label>
              </div>
              <Input
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                disabled={isLoading}
                value={formData.email}
                className="bg_inputs text-zinc-600 placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <div className="text-zinc-600 mb-2">
                <label htmlFor="password">Password:</label>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                error={errors.password}
                value={formData.password}
                className="bg_inputs text-zinc-600 placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <div className="text-zinc-600 mb-2">
                <label htmlFor="confirmPassword">Confirm password:</label>
              </div>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                error={errors.confirmPassword}
                value={formData.confirmPassword}
                className="bg_inputs text-zinc-600 placeholder:text-zinc-300"
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <Button type="submit" className="w-full mt-4 bg-blue-900 hover:bg-blue-700" isLoading={isLoading}>
                Sign Up
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-600 font-semibold transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
