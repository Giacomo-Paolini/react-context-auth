import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { authInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authInfo) {
      navigate("/login");
    }
  }, [authInfo, navigate]);

  return authInfo ? children : null;
}
