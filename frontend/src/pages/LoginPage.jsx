import { useState } from "react";

const PASSWORD = "Z4$rP8!tN6#w"; // tu contraseña

export default function LoginPage() {
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      window.location.href = "/admin";
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}