import React, { useState } from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../Components/schemas/auth.schema";
import { authService } from "../Services/auth.service";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    if (!token) {
      setErrorMessage("El enlace de restablecimiento es inválido o falta el token.");
      return;
    }

    try {
      setSuccessMessage("");
      setErrorMessage("");
      const response = await authService.resetPassword(token, data.password);
      setSuccessMessage(response.message || "Contraseña actualizada exitosamente.");
      
      // Optionally redirect after a few seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "Ocurrió un error al restablecer la contraseña.");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
          <h2 className="text-xl font-bold mb-2">Enlace inválido</h2>
          <p>No se encontró un token válido en el enlace proporcionado.</p>
          <Link to="/login" className="mt-4 inline-block underline">Ir a inicio de sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-card p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 mb-4">
            <ShieldCheck className="h-6 w-6 text-brand-accent" />
          </div>
          <h2 className="text-2xl font-bold text-brand-title">
            Nueva contraseña
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Ingresá tu nueva contraseña y confirmala para acceder a tu cuenta.
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
            <p>{successMessage}</p>
            <p className="mt-2 text-xs">Serás redirigido al inicio de sesión...</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nueva contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar contraseña"}
            </Button>
          </form>
        )}

        {successMessage && (
           <div className="mt-6 text-center">
             <Button onClick={() => navigate("/login")} className="w-full gap-2">
                Ir a iniciar sesión
                <ArrowRight className="h-4 w-4" />
             </Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;

