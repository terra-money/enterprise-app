import { FormState } from "../hooks";

export function isFormStateValid<T extends {}>(
  formState: FormState<T>
): boolean {
  return Object.entries(formState).every(([key, value]) => {
    const isErrorField = key.endsWith("Error");
    if (!isErrorField) {
      return true;
    }

    return isErrorField && !value;
  });
}
