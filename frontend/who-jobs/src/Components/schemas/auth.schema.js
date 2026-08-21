import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "El nombre debe contener al menos 3 caracteres" })
      .max(50, { message: "El nombre es demasiado largo" }),
    lastname: z
      .string()
      .min(3, { message: "El apellido debe contener al menos 3 caracteres" })
      .max(50, { message: "El apellido es demasiado largo" }),
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "Formato de email inválido" }),

    phone: z
      .string()
      .min(10, { message: "El numero de telefono es obligatorio" })
      .max(13, { message: "El numero de telefono deben ser 13 cifras" }),

    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Debes confirmar tu contraseña" }),
    role: z.coerce.number().int().min(0).max(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, { message: "El email es obligatorio" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Formato de email invalido" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Debes confirmar tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
