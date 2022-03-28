import { CombinedError } from "urql";

interface ErrorMessageType {
  email?: string;
  name?: string;
  password?: string;
}

export const getErrorMessage = (
  error: CombinedError
): ErrorMessageType | undefined => {
  console.log(error);
  
  const exception: any = error.graphQLErrors[0].extensions.exception;

  //Property validation errors
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

    //Incorrect password
  } else if (error.graphQLErrors[0].message.includes("password"))
    return { password: error.graphQLErrors[0].message };

  //Account already exists while registering or account does not exist while logging in
  else if (error.graphQLErrors[0].message.includes("Account"))
    return { email: error.graphQLErrors[0].message };

  //Unknown error
  console.error(error);
  return;
};
