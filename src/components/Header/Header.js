import React from "react";
import "./Header.css";

import { NavLink } from "react-router-dom";

export const Header = props => {
  return (
    <header className="Header">
      {props.username ? (
        <div class="alert alert-info" role="alert">
          Добро пожаловать, господин админ!
        </div>
      ) : (
        <NavLink to="/login">Войти как админ</NavLink>
      )}
    </header>
  );
};
