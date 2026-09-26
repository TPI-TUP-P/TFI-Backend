const tokenStartTimeRef = useRef(null);
const tokenDuration = 3600000; // 1 hora en milisegundos

// Custom Hook para verificar la expiración del token
const useTokenExpiry = () => {
    const { checkTokenExpiry } = useAuthStore();
    useEffect(() => {
        // Comprobar si el usuario ya está iniciado sesión cuando se carga la página
        if (token && !tokenStartTimeRef.current) {
            tokenStartTimeRef.current = new Date().getTime();
            checkTokenExpiry();
        }

        // Comprobar la duración del token cada minuto
        const interval = setInterval(() => {
            checkTokenExpiry();
        }, 60000); // 1 minuto en milisegundos

        return () => clearInterval(interval);
    }, [checkTokenExpiry]);
};

export default useTokenExpiry;
