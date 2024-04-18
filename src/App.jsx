import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import useUserStore from "./hooks/useUserStore";

export default function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user && !userLoaded) {
      setUser(user);
      setUserLoaded(true);
    }
  }, [userLoaded, setUser]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
