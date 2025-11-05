import { ZodError } from "zod";

export type FieldErrorMap = Record<string, string>;

export function mapZodErrors(error: unknown): FieldErrorMap {
  const fieldErrors: FieldErrorMap = {};

  if (error instanceof ZodError) {
    error.issues.forEach((err) => {
      const field = err.path[0]?.toString();
      if (field) {
        fieldErrors[field] = err.message;
      }
    });
  }

  return fieldErrors;
}
