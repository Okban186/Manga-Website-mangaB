import { useEffect, useState } from "react";
function Login(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


   
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(!userName || !password ){
            alert("khong duoc de trong")
            return;
        }
        
            const response = await fetch("http://localhost:8080/auth/log-in", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                 // 🔑 bắt buộc để gửi và nhận cookie
                body: JSON.stringify({ username : userName, password }),
              });
          
              if (response.ok) {
                alert("Đăng nhập thành công!");
              } else {
                alert("Sai thông tin đăng nhập");
              }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                name : <input type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)}></input><br/>
                password: <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br/>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default Login;