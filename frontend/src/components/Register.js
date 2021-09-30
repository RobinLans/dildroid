import React, { useState } from "react";
import style from "../styles/Register.module.css";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailInput(e) {
    setEmail(e.target.value);
  }

  function passwordInput(e) {
    setPassword(e.target.value);
  }

  function nameInput(e) {
    setName(e.target.value);
  }

  async function registerAccount(e) {
    e.preventDefault();

    const account = {
      name,
      email,
      password,
    };

    const response = await fetch("/register-user/", {
      method: "POST",
      body: JSON.stringify(account),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
  }

  return (
    <>
      <div className={style.registercontainer}>
        <form className={style.regform} onSubmit={registerAccount}>
          <label htmlFor="name"></label>
          <input
            type="text"
            className={style.text}
            placeholder="Name"
            id="name"
            name="name"
            onChange={nameInput}
            value={name}
            minLength={3}
            className={style.text}
          />
          <label htmlFor="email"></label>
          <input
            type="email"
            className={style.email}
            placeholder="Email"
            id="registeremail"
            name="email"
            onChange={emailInput}
            value={email}
            className={style.email}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            className={style.password}
            placeholder="Password"
            id="password"
            name="password"
            onChange={passwordInput}
            value={password}
            minLength={5}
            className={style.password}
          />

          <input className={style.registerBtn} type="submit" value="Register" />
          <Link to="/login">
            <button className={style.loginBtn}>Login</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
