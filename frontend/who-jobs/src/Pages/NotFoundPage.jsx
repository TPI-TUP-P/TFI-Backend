import { Link } from "react-router-dom";
import { ArrowRight, SearchX } from "lucide-react";
import Button from "../Components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-6 relative overflow-hidden">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-sky-200/40 blur-3xl -translate-y-10" />

      <div className="relative w-full max-w-md text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-muted mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Página no encontrada
        </div>

        <h1 className="text-5xl font-bold leading-tight text-brand-title">
          Esta oferta
          <br />
          <span className="text-sky-400">ya no está.</span>
        </h1>

        <p className="mt-5 text-brand-muted max-w-sm mx-auto">
          El link que seguiste se movió o nunca existió. Volvé al inicio y encontrá algo real.
        </p>

        <div className="mt-12 mx-auto w-72 rounded-2xl border border-brand-border bg-brand-card p-6 shadow-[0_30px_60px_-25px_rgba(30,41,59,0.35)] rotate-[-1deg]">
          <div className="flex items-center justify-between border-t-2 border-dashed border-brand-border/70 -mt-6 mb-5 pt-5">
            <span className="font-mono text-[10px] tracking-[0.2em] text-brand-muted">WJ-0404</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              CERRADA
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">
              <SearchX className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <p className="mt-4 font-bold text-brand-title">404</p>
          <p className="font-mono text-xs text-brand-muted">Sin resultados</p>
        </div>

        <Link to="/" className="inline-block mt-12">
          <Button className="w-full">
            Volver al inicio
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;