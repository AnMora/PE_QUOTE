import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "El nombre de usuario es requerido" })
      .max(12, { message: "El nombre no puede ser más de 12 caracteres" })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: "El apellido de usuario es requerido" })
      .max(12, { message: "El apellido no puede ser más de 12 caracteres" })
      .trim(),
    email: z
      .string()
      .email({ message: "Ingrese un formato de correo valido" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "No debe estar vacío" })
      .min(5, { message: "Debe tener al menos 5 caracteres de longitud" })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra" })
      .regex(/[0-9]/, { message: "Debe contener al menos un numero" })
      .regex(/[a-zA-Z0-9]/, {
        message: "Debe contener al menos un carácter especial",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña no coincide, verifique de nuevo",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Ingrese un formato de correo valido" })
    .trim(),
  password: z.string().min(1, { message: "Contraseña es requerida" }).trim(),
});

export const SuggestionFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El titulo es requerido" })
    .max(40, { message: "El titulo no puede tener más de 40 caracteres" })
    .trim(),

  description: z
    .string()
    .min(1, { message: "La descripción es requerida" })
    .trim(),
});