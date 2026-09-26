import React, { useState } from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../Components/schemas/auth.schema";
import { authService } from "../Services/auth.service";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");
      const response = await authService.forgotPassword(data.email);
      setSuccessMessage(response.message || "Correo enviado con exito.");
    } catch (error) {
      setErrorMessage(error.message || "Ocurrio un error al enviar el correo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-card p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 mb-4">
            <Mail className="h-6 w-6 text-brand-accent" />
          </div>
          <h2 className="text-2xl font-bold text-brand-title">
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar enlace"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 font-medium text-brand-muted transition-colors hover:text-brand-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

