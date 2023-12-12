import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Dashboard() {
  const { authInfo } = useContext(AuthContext);

  if (!authInfo) {
    return "Non sei autenticato!";
  }

  return <div>Benvenuto, {authInfo.username}!</div>;
}
