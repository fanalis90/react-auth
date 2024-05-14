import { setCookie, getCookie } from "react-use-cookie";

export const setAuthToken = (token: string) => {
  const tokenEpochTimeStamp = extractExpiredTime(token);
  const currentEpochTimeStamp = Math.floor(Date.now() / 1000);
  setCookie("authToken", token, {
    days: (tokenEpochTimeStamp - currentEpochTimeStamp) / 86400,
  });
};

export const removeAuthToken = () => {
  setCookie("authToken", "", { days: 0 });
};

export const getAuthToken = (): string | undefined => {
  return getCookie("authToken");
};

const decodeToken = (
  token: string
): {
  email: string,
  exp: number,
  iat: number,
  id: string,
  name: string,
  nbf: number,
  role: string[],
} => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};
export const extractName = (token: string): string => {
  const decodedToken = decodeToken(token);
  return decodedToken.name;
};

export const extractRole = (token: string): string[] => {
  const decodedToken = decodeToken(token);
  return decodedToken.role;
};

// export const extractProfilePicture = (token: string): string => {
//   const decodedToken = decodeToken(token);
//   return decodedToken.profilePicture;
// };

export const extractExpiredTime = (token: string): number => {
  const decodedToken = decodeToken(token);
  return decodedToken.exp;
};
