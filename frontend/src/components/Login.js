import React, { useState } from "react";
import style from "../styles/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [login, setLogin] = useState(false);
  let [exit, setExit] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      setLogin(true);
      setTimeout(() => {
        handleExit();
      }, 1000);
    }
  }

  async function checkIfUserExists(email, password) {
    const user = {
      email,
      password,
    };

    let response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  }

  function openLoginModal() {
    setShowLoginModal(true);
    setExit(false);
  }

  function handleExit() {
    setExit(true);
    setShowLoginModal(false);
  }

  return (
    <>
      <h3 onClick={openLoginModal}>Login</h3>
      {showLoginModal && (
        <div
          className={
            exit ? `${style.loginModal} ${style.hidden}` : `${style.loginModal}`
          }
        >
          <button className={style.exitBtn} onClick={handleExit}>
            X
          </button>
          {!login && (
            <form onSubmit={submitForm}>
              <label htmlFor="email">E-Mail</label>
              <input
                type="text"
                placeholder="E-Mail"
                id="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
              />
              <label htmlFor="pw">Password</label>
              <input
                type="password"
                placeholder="Password"
                id={style.pw}
                name="pw"
                onChange={handlePwChange}
                value={password}
              />
              <input className={style.loginBtn} type="submit" value="Login" />
            </form>
          )}
          {login && <h1>Inloggad</h1>}
        </div>
      )}
    </>
  );
}

export default Login;
