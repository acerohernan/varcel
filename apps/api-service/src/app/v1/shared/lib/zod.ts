import { ZodError } from "zod";

export const getZodErrors = (error: ZodError): string[] => {
  return error.issues.map(
    (issue) => `Error in '${issue.path}' field: ${issue.message}`
  );
};
