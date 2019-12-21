import React, { useState } from "react";
import { logout } from "../../services/auth";
import api from "../../services/api";

export default function Home({ history }) {
  function Logout() {
    logout();
    history.push("/");
  }
  const [produto, setProduto] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!produto || !code) {
      setError("Preencha todos os campos");
    } else {
      try {
        console.log("try");
        await api.post("/email", { produto, code });
        window.location.reload();
      } catch (err) {
        setError("Houve um problema ao enviar o formulario");
      }
    }
  }
  return (
    <>
      <button onClick={Logout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Produto">Produto</label>
        <input
          type="text"
          value={produto}
          onChange={e => setProduto(e.target.value)}
        />
        <label htmlFor="Codigo">Codigo</label>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button type="submit">Enviar</button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
}
