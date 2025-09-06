import { useEffect, useState } from "react";
import css from "./LoginForm.module.scss"
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(css);
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{16,}$/;
const usernameRegex =/^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
function LoginForm({mode}){

   
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        "username" :"",
        "password": "",
        "firstname" :"",
        "lastname": "",
        "statusPassword":"",
        "statusUsername":"",
        "statusLogin":"",
        "dob":""
    })

    useEffect(() =>{
        setLoginForm({
            "username" :"",
            "password": "",
            "firstname" :"",
            "lastname": "",
            "statusPassword":"",
            "statusUsername":"",
            "statusLogin":"",
            "dob":""
        })
    },[mode])

    const setHandle = (nameOfSet, value) =>{
        setLoginForm(prev => ({...prev, [nameOfSet] : value}))
    }

    const inputHandle = (e) =>{
        const value = e.target.value;
        if(value.startsWith(" ")) return;
        setHandle(e.target.name, value)
    }

    const passwordSignupInputHandle = (e) =>{
        
        if(e.startsWith(" ")) return;
        if (!regexPassword.test(e) && e != ""){
            setHandle("statusPassword","Password khong hop le");
            
        }
        else setHandle("statusPassword","");
        setHandle("password",e);
    }

    const usernameSignupInputHandle = (e) =>{
        if(e.startsWith(" ")) return;
        if(!usernameRegex.test(e) && e != ""){
            setHandle("statusUsername","username khong hop le")
        }
        else  setHandle("statusUsername","")
        setHandle("username",e)

        
    }
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(!loginForm.username || !loginForm.password ){
            setHandle("statusLogin","khong duoc de trong")
            return;
        }
        
            const response = await fetch("http://localhost:8080/auth/log-in", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                 // 🔑 bắt buộc để gửi và nhận cookie
                body: JSON.stringify({ username : loginForm.username, password:loginForm.password }),
              });
              
              if (response.ok) {
                navigate("/")
                const data = await response.json();
                localStorage.setItem("accessToken",data.token);
              } else {
                if(response.status == 404) setHandle("statusLogin","User not found");
                else if(response.status == 400) setHandle("statusLogin","Password incorrect");
              }
    }

    const handleSignUp = async(e) =>{
        e.preventDefault()
        if(!loginForm.username || !loginForm.password || !loginForm.firstname || !loginForm.lastname || !loginForm.dob){
            setHandle("statusLogin","Missing information!!")
            return;
        }

        const response = await fetch("http://localhost:8080/user/createUser",{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            credentials: "include",
            body : JSON.stringify({
                username : loginForm.username, 
                password:loginForm.password,
                firstname: loginForm.firstname,
                lastname: loginForm.lastname,
                dob: loginForm.dob
            })

        })
        if (response.ok) {
            navigate("/")
            const data = await response.json();
            localStorage.setItem("accessToken",data.token);
          } else {
            if(response.status == 404) setHandle("statusLogin","User not found");
            else if(response.status == 400) setHandle("statusLogin","User Existed");
          }

    }

    return (
      <>
        <form className={cx("loginForm" ,`${mode === "signup" ? "active" : "hidden"}`)} onSubmit={handleSignUp}>
            <h1>Sign Up</h1>
            <input className={cx("inputForm")} name="username" type="text" placeholder="User Name" value={loginForm.username} onChange={(e) => usernameSignupInputHandle(e.target.value)}></input>
            { loginForm.statusUsername && <h5 className={cx("alertInput")}>{loginForm.statusUsername}</h5>}
            <input className={cx("inputForm")} autoComplete="off" name="password" type="text" placeholder="Password" value={loginForm.password} onChange={(e) => passwordSignupInputHandle(e.target.value)}></input>
            {loginForm.statusPassword && <h5 className={cx("alertInput")}>{loginForm.statusPassword}</h5>}
            <input className={cx("inputForm")} name="firstname" type="text" placeholder="First name" value={loginForm.firstname} onChange={(e) => inputHandle(e)}/>
            <input className={cx("inputForm")} name="lastname" type="text" placeholder="Last name" value={loginForm.lastname} onChange={(e) => inputHandle(e)}/>
            <input className={cx("inputForm")} name="dob" type="date" placeholder="Date of birth" value={loginForm.dob} onChange={(e) => inputHandle(e)}/>
            {loginForm.statusLogin && <h5 style={{color: "red"}}>{loginForm.statusLogin}</h5>}
            <input className={cx("submitBtn", loginForm.statusPassword || loginForm.statusUsername ? "disable" : "")} type="submit" value="Sign Up" />
        </form>

        <form className={cx("loginForm", `${mode === "login" ? "active" : "hidden"}`)} onSubmit={handleLogin}>
            <h1>Login</h1>
            <input className={cx("inputForm")} name="username" type="text" placeholder="User Name" value={loginForm.username} onChange={(e) => inputHandle(e)}></input>
            <input className={cx("inputForm")} autoComplete="off" name="password" type="text" placeholder="Password" value={loginForm.password} onChange={(e) => inputHandle(e)}></input>
            <h5 style={{color: "red"}}>{loginForm.statusLogin}</h5>
            <input className={cx("submitBtn")} type="submit" value="Login" />
        </form>

    </>
    )
}

export default LoginForm;