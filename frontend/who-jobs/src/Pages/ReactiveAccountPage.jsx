import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../Services/auth.service';

export default function ReactivateAccountPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const processReactivation = async () => {
            if (!token) {
                setError('Token de reactivación no válido o ausente.');
                setLoading(false);
                return;
            }

            try {
                await authService.reactivateAccount(token);
                setSuccess(true);
            } catch (err) {
                setError(err || 'Ocurrió un error al intentar reactivar la cuenta. El enlace pudo haber expirado.');
            } finally {
                setLoading(false);
            }
        };

        processReactivation();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Reactivación de Cuenta</h1>

                {loading && (
                    <p className="text-gray-600 my-6">Estamos procesando tu reactivación, por favor espera...</p>
                )}

                {success && (
                    <div>
                        <div className="my-4 p-4 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                            ¡Cuenta reactivada con éxito! Ya puedes iniciar sesión con tus credenciales.
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-2"
                        >
                            Ir al Iniciar Sesión
                        </button>
                    </div>
                )}

                {error && (
                    <div className="my-4 p-4 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}