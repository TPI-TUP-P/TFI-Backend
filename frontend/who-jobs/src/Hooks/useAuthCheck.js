// hooks/useAuthCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Components/stores/useAuthStore";
import { userService } from "../Services/user.service";

export const useAuthCheck = () => {
  const { token, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const validateSession = async () => {
      try {
        const userData = await userService.getProfile();
        setUser(userData);
      } catch (error) {
        logout();
        navigate("/login", { replace: true });
      }
    };

    validateSession();
  }, [token]);
};
