import React, { useState } from "react";
import style from "../styles/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
  }

  async function submitForm(e) {
    e.preventDefault();

    const acceptedLogin = await checkIfUserExists(email, password);

    if (acceptedLogin.success) {
      localStorage.setItem("UserId", acceptedLogin.userId);
      localStorage.setItem("user_object", JSON.stringify(acceptedLogin));
      setLogin(true);
      window.location.href = "/";
    }
  }

  async function checkIfUserExists(email, password) {
    const user = {
      email,
      password,
    };

    let response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    return data;
  }

  return (
    <>
      <div className={style.loginModal}>
        {!login && (
          <>
            <form onSubmit={submitForm}>
              <label htmlFor="email"></label>
              <input
                type="text"
                placeholder="E-Mail"
                id="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
                className={style.email}
              />{" "}
              <label htmlFor="pw"></label>
              <input
                type="password"
                placeholder="Password"
                id={style.pw}
                name="pw"
                onChange={handlePwChange}
                value={password}
                className={style.password}
              />
              <input className={style.loginBtn} type="submit" value="Login" />
              <Link to="/register-user">
                <button className={style.registerBtn}>
                  <p>Register</p>
                </button>
              </Link>
            </form>
          </>
        )}
        {login && <h1> Welcome! </h1>}
      </div>
    </>
  );
}

export default Login;
