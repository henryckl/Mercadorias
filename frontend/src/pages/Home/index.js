import React from "react";
import { logout } from "../../services/auth";

export default function Home({ history }) {
  function Logout() {
    logout();
    history.push("/");
  }
  return (
    <>
      <button onClick={Logout}>Logout</button>
    </>
  );
}
