// Function to get the refresh token from cookies
const getRefreshTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "refreshTokenFlash") {
        return value;
      }
    }
    return null;
  };

export default getRefreshTokenFromCookie;