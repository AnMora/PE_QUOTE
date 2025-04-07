import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "The first name field is required" })
      .max(12, { message: "Can't be more than 12 characters" })
      .trim(),
    lastName: z
      .string()
      .min(3, { message: "The last name field is required" })
      .max(12, { message: "Can't be more than 12 characters" })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .min(5, { message: "Be at least 5 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export const SuggestionFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title field is required" })
    .max(40, { message: "Title can't be more than 40 characters" })
    .trim(),

  description: z
    .string()
    .min(1, { message: "Description field is required" })
    .trim(),
});
