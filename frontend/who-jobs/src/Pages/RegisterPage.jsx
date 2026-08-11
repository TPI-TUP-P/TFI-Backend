import React, { useEffect } from "react";
import { useAuthLandingStore } from "../Components/stores/useAuthLandingStore";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import Input from "../Components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../Components/schemas/auth.schema";
import Button from "../Components/ui/Button";
import { authService } from "../Services/auth.service";
import { ROLE_TO_NUMBER } from "../Utils/roles";
import { ArrowRight,  Sparkles,  UserPlus } from "lucide-react";
const RegisterPage = () => {
  const initialEmail = useAuthLandingStore((state) => state.initialEmail);
  const selectedRole = useAuthLandingStore((state) => state.selectedRole);

  // console.log(selectedRole)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: initialEmail || "",
    },
  });
  
  useEffect(()=> {
    if(selectedRole) {
      const roleToNumber = ROLE_TO_NUMBER[selectedRole]
      setValue("role", roleToNumber, {shouldValidate: true})
    }
  }, [selectedRole, setValue])

  const navigate = useNavigate();


  
  // if (!initialEmail) {
  //   return <Navigate to="/" replace />;
  // }
  const onSubmit = async (data) => {
    try {
    // data.role = selectedRole
      // console.log(userData, "userdata")
        

      const response = await authService.register(data )
      console.log(response)

      navigate("/login")

    } catch (error) {
      console.error(error?.message || "error en el servidor")
    }
  }

  return (
    <div className="min-h-screen flex bg-brand-bg text-brand-title">
  {/* Panel lateral decorativo (Desktop) */}
  <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center px-16 overflow-hidden">
    <div className="absolute w-[420px] h-[420px] rounded-full bg-brand-accent/20 blur-3xl -translate-x-10" />
    <div className="relative">
      <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-muted mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
        Gratis para siempre · Sin tarjeta
      </div>

      <h2 className="text-4xl font-bold leading-tight text-brand-title max-w-sm">
        Armá tu perfil
        <br />
        <span className="text-brand-accent">una sola vez.</span>
      </h2>

      <div className="mt-14 w-72 rounded-2xl border border-brand-border bg-brand-card p-6 shadow-xl shadow-brand-title/10 rotate-[2deg]">
        <div className="border-t-2 border-dashed border-brand-border/70 -mt-6 mb-5 pt-5">
          <span className="font-mono text-[10px] tracking-[0.2em] text-brand-muted">
            WHOJOBS ID
          </span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-brand-bg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-brand-accent" />
          </div>
        </div>
        <p className="mt-4 text-center font-bold text-brand-title">Nuevo perfil</p>
        <p className="text-center font-mono text-xs text-brand-muted">Postulación directa</p>
      </div>
    </div>
  </div>

  {/* Formulario de Registro */}
  <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
    <div className="w-full max-w-md">
      <div className="lg:hidden mb-10 text-center">
        <span className="font-bold text-2xl text-brand-title">
          Who<span className="text-brand-accent">Jobs</span>
        </span>
      </div>

      <div className="rounded-2xl border border-brand-border bg-brand-card p-8 sm:p-9 shadow-xl shadow-brand-title/10">
        <div className="flex items-center gap-2 mb-1">
          <UserPlus className="w-5 h-5 text-brand-accent" />
          <h1 className="text-2xl font-bold text-brand-title">Crear cuenta</h1>
        </div>
        <p className="text-sm text-brand-muted mb-8">
          Armá tu perfil una sola vez y dejá que te encuentren.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => console.log("error", errors))}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-4">
            <Input nameLabel={"Nombre"} type="text" {...register("name")} error={errors.name?.message} />
            <Input
              nameLabel={"Apellido"}
              type="text"
              {...register("lastname")}
              error={errors.lastname?.message}
            />
          </div>
          <Input
            nameLabel={"Teléfono"}
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input type="email" nameLabel={"Email"} {...register("email")} error={errors.email?.message} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-4">
            <Input
              type="password"
              {...register("password")}
              nameLabel={"Contraseña"}
              error={errors.password?.message}
            />
            <Input
              type="password"
              {...register("confirmPassword")}
              nameLabel={"Confirmar Contraseña"}
              error={errors.confirmPassword?.message || errors.password?.message}
            />
          </div>
          <Button type="submit" className="w-full bg-brand-title text-brand-card hover:bg-brand-title/90">
            Registrarme
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-brand-muted">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="font-semibold text-brand-title hover:text-brand-accent transition-colors">
            Iniciá sesión
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default RegisterPage;
