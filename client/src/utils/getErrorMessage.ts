import { CombinedError } from "urql";

interface ErrorMessageType {
  email?: string;
  name?: string;
  password?: string;
}

export const getErrorMessage = (error: CombinedError): ErrorMessageType => {
  const exception: any = error.graphQLErrors[0].extensions.exception;
  if (exception.validationErrors) {
    const property: keyof ErrorMessageType =
      exception.validationErrors[0].property;
    let constraint: any = Object.values(
      exception.validationErrors[0].constraints
    )[0];
    constraint = constraint.charAt(0).toUpperCase() + constraint.slice(1);
    const errorMessage: ErrorMessageType = {};
    errorMessage[property] = constraint;
    return errorMessage;
  }
  return { email: error.graphQLErrors[0].message };
};
