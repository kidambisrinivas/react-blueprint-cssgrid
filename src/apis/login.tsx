const baseUrl = process.env.BASE_URL;

export async function isSignedIn() {
  const response = await fetch(`${baseUrl}/console/api/v1/user/me`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${localStorage.getItem("jwt")}`
    }
  });
  if (response.status === 200) {
    const user = await response.json();
    sessionStorage.setItem("email", user.email);
    return true;
  }
  return false;
}
