import { verify, VerifyErrors } from "jsonwebtoken";
export const validToken = (authToken: string) => {
  const token: string = authToken.split(" ")[1];

  let userId: number = 0;
  let userEmail: string = "";
  let jwtErrorMessage: string | null = null;

  verify(
    token,
    String(process.env.NEXT_PUBLIC_SECRET_KEY),
    (error: VerifyErrors | null, decoded: any) => {
      if (error) {
        jwtErrorMessage = error.message;
      } else {
        userId = Number(decoded.sub);
        userEmail = decoded.email;
      }

      return;
    }
  );

  return { jwtErrorMessage, userId, userEmail };
};
