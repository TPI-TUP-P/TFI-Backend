import React from 'react'
import Input from '../Components/ui/Input'
import { loginSchema } from '../Components/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/ui/Button';
import { authService } from '../Services/auth.service';
import { ArrowRight, LogIn, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue
      } = useForm({
        resolver: zodResolver(loginSchema),
      });
      
    const onSubmit = async(data) => {
        try {
            const response = await authService.login(data)
            navigate("/home")
        } catch (error) {
            console.log("error", error.message)
        }
    }

  return (
     <div className="min-h-screen flex bg-brand-bg">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center px-16 overflow-hidden">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-sky-200/40 blur-3xl -translate-x-10" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Sin feed · Sin spam · Sin ruido
          </div>

          <h2 className="text-4xl font-bold leading-tight text-brand-title max-w-sm">
            Volvé a donde
            <br />
            <span className="text-sky-400">te estaban buscando.</span>
          </h2>

          <div className="mt-14 w-72 rounded-2xl border border-brand-border bg-brand-card p-6 shadow-[0_30px_60px_-25px_rgba(30,41,59,0.35)] rotate-[-2deg]">
            <div className="border-t-2 border-dashed border-brand-border/70 -mt-6 mb-5 pt-5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-brand-muted">WHOJOBS ID</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
            </div>
            <p className="mt-4 text-center font-bold text-brand-title">Sesión segura</p>
            <p className="text-center font-mono text-xs text-brand-muted">Acceso directo</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10 text-center">
            <span className="font-bold text-2xl text-brand-title">
              Who<span className="text-sky-400">Jobs</span>
            </span>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-card p-8 sm:p-9 shadow-[0_30px_70px_-25px_rgba(30,41,59,0.25)]">
            <div className="flex items-center gap-2 mb-1">
              <LogIn className="w-5 h-5 text-sky-400" />
              <h1 className="text-2xl font-bold text-brand-title">Iniciar sesión</h1>
            </div>
            <p className="text-sm text-brand-muted mb-8">Entrá para ver y postularte a las ofertas activas.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input nameLabel={"Email"} {...register("email")} type='email' error={errors?.email?.message}/>
              <Input nameLabel={"password"} type='password' {...register("password")} error={errors?.password?.message}/>

              <div className="flex justify-end">
                <a href="/forgot-password" className="font-mono text-xs text-brand-muted hover:text-sky-400 transition-colors">
                  Olvidé mi contraseña
                </a>
              </div>

              <Button type='submit' className="w-full">
                Iniciar sesion
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-brand-muted">
              ¿No tenés cuenta?{" "}
              <a href="/register" className="font-semibold text-brand-title hover:text-sky-400 transition-colors">
                Creá una
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
)
}

export default LoginPage