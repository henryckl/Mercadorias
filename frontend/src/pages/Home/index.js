import React, { useState, useEffect } from "react";
import { logout } from "../../services/auth";
import api from "../../services/api";

export default function Home({ history }) {
  function Logout() {
    logout();
    history.push("/");
  }
  const [produto, setProduto] = useState("");
  const [code, setCode] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!produto || !code) {
      setError("Preencha todos os campos");
    } else {
      try {
        setLoading(true);
        await api.post("/email", { produto, code }).then(setLoading(false));
        window.location.reload();
      } catch (err) {
        setError("Houve um problema ao enviar o formulario");
      }
    }
  }

  async function fetchProducts() {
    const result = await api.get("/products");
    setProdutos([...produtos, result.data]);
  }

  useEffect(() => {
    fetchProducts();
  });

  return (
    <>
      <button onClick={Logout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Produto">Produto</label>
        <select name="" id="produto" onChange={e => setProduto(e.target.value)}>
          {produto ? null : <option value="">Selecione o produto</option>}
          {produtos.map(p => (
            <option value={p.name}>{p.name}</option>
          ))}
        </select>
        <label htmlFor="Codigo">Codigo</label>
        <select name="" id="codigo" onChange={e => setCode(e.target.value)}>
          {code ? null : <option value="">Selecione o Codigo</option>}
          {produtos.map(p => (
            <option value={p.code}>{p.code}</option>
          ))}
        </select>
        <button type="submit">Enviar</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
