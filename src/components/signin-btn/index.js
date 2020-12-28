import React, { useContext, useState } from "react";
import { UserConetext } from "../../contexts/user";
import { signInWithGoogle } from "../../services/auth";
import "./style.css";

export default function SignInBtn() {
  const [user, setUser] = useContext(UserConetext).user;
  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if(userBySignIn){
        setUser(userBySignIn);
    }
  };
  return (
    <div onClick={signInBtnClick}>
      <p className="signInBtn">Sign In With Google</p>
    </div>
  );
}
