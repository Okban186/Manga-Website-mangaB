import { useEffect, useState } from "react";
import css from "./AuthPage.module.scss"
import classNames from "classnames/bind";
import bannerLogin from "/image/You-Should-Read-This-Manga-Banner62.webp"
import loginForm from "/image/You-Should-Read-This-Manga70.webp"
import LoginForm from "../../Component/LoginForm/LoginForm";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(css);
function AuthPage(){
  const [searchParasm, setSearchParams] = useSearchParams()
  const mode = searchParasm.get("mode") || "login"
  const toogleMode = () =>{
    
    setSearchParams({ mode: mode === "login" ? "signup" : "login" });

  }
    return (
      <div className={cx("auth")}>
        <img src={bannerLogin} alt="banner" />
        <div className={cx("authFormContainer")}>
          <div className={cx("sideBanner")}>
            <div className={cx("imageSideBanner")}>
              <img src={loginForm}/>
            </div>
            <div key={mode} className={cx("labelWelcome")}>{mode=="login" ? "Welcome Back!" : "Hello Friend!"}</div>
            <div className={cx("switchMode")} onClick={toogleMode}>{mode=="login"? "Sign Up": "Login"}</div>
          </div>
          <LoginForm mode={mode}/>
        </div>
      </div>
    )
}

export default AuthPage;