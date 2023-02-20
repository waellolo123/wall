export const setCookies = (valueToken) => {
  // Assuming you have a variable `token` containing the token value
  const token = valueToken;

  // Set the cookie to expire in 30 days
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // Encode the token value to make sure it's URL-safe
  const encodedToken = encodeURIComponent(token);

  // Set the cookie with the token and expiration date
  document.cookie = `token=${encodedToken}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getCookies = () => {
  // Get the value of the token cookie
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  // If the cookie value is defined, decode it
  const token = cookieValue ? decodeURIComponent(cookieValue) : null;

  return token;
};

export const RemoveCookies = () => {
  // Set the cookie with the token and expiration date
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
