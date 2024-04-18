import { useNavigate } from "react-router-dom";
import useUserStore from "../hooks/useUserStore";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) navigate("/login");
    else navigate("/products");
  }, [user, navigate]);

  return null;
}
