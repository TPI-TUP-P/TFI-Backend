import toast, { Toaster } from 'react-hot-toast';



/**

 * Toaster de la app — mismo patrón que la doc oficial de react-hot-toast

 * (toast.custom + animate-custom-enter/leave por clase), pero con el

 * layout y los colores de la marca. TODOS los tipos (success, error,

 * loading, default) comparten exactamente la misma estructura: ícono a

 * la izquierda, contenido al medio, botón "Cerrar" a la derecha

 * separado por un borde.

 *

 * Requiere estas animaciones en tu main.css (Tailwind v4 — @theme

 * genera el utility animate-* a partir de --animate-*):

 *

 *   @theme {

 *     --animate-custom-enter: custom-enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1);

 *     --animate-custom-leave: custom-leave 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;

 *   }

 *

 *   @keyframes custom-enter {

 *     0%   { transform: translate3d(0, -8px, 0) scale(0.95); opacity: 0; }

 *     100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }

 *   }

 *

 *   @keyframes custom-leave {

 *     0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }

 *     100% { transform: translate3d(0, -8px, 0) scale(0.9); opacity: 0; }

 *   }

 *

 * Montaje (una vez, en el root):

 *   import { AppToaster } from './toast';

 *   <AppToaster />

 *

 * Uso:

 *   showToast('Nuevo mensaje disponible')

 *   showSuccessToast('Los cambios se guardaron correctamente')

 *   showErrorToast('No pudimos procesar tu solicitud')

 *   showLoadingToast('Guardando cambios...')

 *

 * Loading -> success/error actualizando el mismo toast (mismo id, no

 * apila uno nuevo):

 *   const id = showLoadingToast('Guardando...');

 *   try {

 *     await save();

 *     showSuccessToast('Guardado', { id });

 *   } catch {

 *     showErrorToast('Algo salió mal', { id });

 *   }

 *

 * Título custom en vez del default por tipo:

 *   showSuccessToast('Tu perfil ya es visible', { title: 'Perfil publicado' })

 */

export function AppToaster() {

  return (

    <Toaster

      position="top-right"

      gutter={10}

      toastOptions={{

        duration: 4000,

        style: { background: 'transparent', boxShadow: 'none', padding: 0 },

      }}

    />

  );

}



const ICONS = {

  success: (

    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">

      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    </svg>

  ),

  error: (

    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">

      <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

    </svg>

  ),

  default: (

    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">

      <path d="M7 1.5V7.5M7 10.5V10.51" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

    </svg>

  ),

};



// Único color fuera de la paleta: rose para error. El violeta solo no

// alcanza como señal de "algo falló" a simple vista.

const BADGE = {

  success: 'bg-brand-accent text-brand-card',

  error: 'bg-rose-500 text-white',

  default: 'bg-brand-muted text-brand-card',

  loading: 'bg-brand-muted text-brand-card',

};



const DEFAULT_TITLES = {

  success: 'Éxito',

  error: 'Error',

  loading: 'Cargando',

  default: 'Aviso',

};



function ToastCard({ t, type = 'default', title, message }) {

  const resolvedTitle = title ?? DEFAULT_TITLES[type] ?? DEFAULT_TITLES.default;



  return (

    <div

      className={`${

        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'

      } flex w-full max-w-md rounded-2xl border border-brand-border bg-brand-card shadow-lg pointer-events-auto`}

    >

      <div className="w-0 flex-1 p-4">

        <div className="flex items-start gap-3">

          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${BADGE[type] ?? BADGE.default}`}>

            {type === 'loading' ? (

              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

            ) : (

              ICONS[type] ?? ICONS.default

            )}

          </span>

          <div className="flex-1 pt-0.5">

            <p className="text-sm font-medium text-brand-title">{resolvedTitle}</p>

            <p className="mt-1 text-sm text-brand-muted">{message}</p>

          </div>

        </div>

      </div>

      <div className="flex border-l border-brand-border">

        <button

          type="button"

          onClick={() => toast.dismiss(t.id)}

          className="flex w-full items-center justify-center rounded-r-2xl border border-transparent p-4 text-sm font-medium text-brand-accent hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-brand-accent"

        >

          Cerrar

        </button>

      </div>

    </div>

  );

}



export function showToast(message, { title, ...options } = {}) {

  return toast.custom((t) => <ToastCard t={t} type="default" title={title} message={message} />, options);

}



export function showSuccessToast(message, { title, ...options } = {}) {

  return toast.custom((t) => <ToastCard t={t} type="success" title={title} message={message} />, options);

}



export function showErrorToast(message, { title, ...options } = {}) {

  return toast.custom((t) => <ToastCard t={t} type="error" title={title} message={message} />, options);

}



export function showLoadingToast(message, { title, ...options } = {}) {

  return toast.custom((t) => <ToastCard t={t} type="loading" title={title} message={message} />, {

    duration: Infinity,

    ...options,

  });

}