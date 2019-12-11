import React, { useState } from "react";

import api from "../../services/api";
import { login } from "../../services/auth";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos!");
    } else {
      try {
        const response = await api.post("/", { email, password });
        login(response.data.token);
        history.push("/home");
      } catch (err) {
        setError("Houve um problema com o login");
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input
          type="email"
          id="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">SENHA</label>
        <input
          type="password"
          id="password"
          placeholder="Sua Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
}
