export async function isLoggedIn(userObject) {
  if (!userObject) return;

  const token = userObject.token;

  const response = await fetch("/loggedin", {
    method: "POST",
    headers: {
      auth_token: token,
    },
  });
  const data = await response.json();

  console.log("dfff", data);

  if (data.loggedIn) return data.loggedIn;
  else return false;
}
