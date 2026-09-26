import { z } from 'zod'

export const updateUserSchema = z.object({
  Name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),

  LastName: z
    .string()
    .trim()
    .min(3, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar los 50 caracteres'),

  Phone: z
    .union([
      z
        .string()
        .trim()
        .regex(
          /^[0-9+()\\s-]{8,20}$/ ,
          'Teléfono inválido'
        ),
      z.null(),
    ])
    .optional(),
})