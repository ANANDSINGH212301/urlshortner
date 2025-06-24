import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setlogin] = useState(true)
  return (
    <>
      {login ? <LoginForm state={setlogin} /> : <RegisterForm state={setlogin} />}
    </>
  );
};

export default AuthPage;
