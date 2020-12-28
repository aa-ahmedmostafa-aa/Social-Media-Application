import React, { useContext, useState } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserConetext } from "../../contexts/user";

export default function Navbar() {
  const [user, SetUser] = useContext(UserConetext).user;
  return (
    <div className="customNavbar">
      <p>ReactSocial</p>
      {user ? <img className="imgProfile" src={user.photoURL} alt="avatar" /> : <SignInBtn />}
    </div>
  );
}
