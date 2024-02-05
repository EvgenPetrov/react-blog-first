import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/UI/Navbar/Navbar";
import { AppRouter } from "./components/AppRouter";
import { AuthContext } from "./context/context.js";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? true : false;
  });

  console.log("isAuth:", isAuth);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
