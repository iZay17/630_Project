import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = ()=> {
    let navigate = useNavigate();
    const[user,setUser] = useState({email:'', password:''});
    const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    const submitForm = (e)=> {
        e.preventDefault();
        let formData = new FormData();
        formData.append('email', user.email);
        formData.append('password', user.password);

    axios.post('http://localhost/630_Project/api/users/login.php', formData)
    .then(result=>{
        console.log(result.data["Email"]);
        if (result.data["Email"] !== undefined) {
            window.localStorage.setItem('email', result.data["Email"]);
            window.localStorage.setItem('user_name', result.data["First_name"] + ' ' + result.data["Last_name"]);
            window.dispatchEvent(new Event("storage"));
            navigate('/');
        }
        else {
            alert('Email or password is incorrect');
        }
    })

    }
    return(
        <form onSubmit={submitForm }>
        <div className="main-box">
        <div className="row">
            <div className="col-md-12 text-center"><h3> Login</h3></div>
        </div>
        <div className="row">
            <div clas="col-md-6">email:</div>
            <div className="col-md-6"> <input type="email" name="email"
            onChange={handleChange} value= {user.email}/></div>
        </div>

        <div className="row">
            <div clas="col-md-6">password:</div>
            <div className="col-md-6"> <input type="password" name="password"
            onChange={handleChange} value= {user.password}/></div>
        </div>
        <div className="row">
            <div clas="col-md-6 text-center">
            <input type="submit" name="submit" className="btn btn-success" value="Login"/></div>
        </div>
        </div>
        </form>
    )
}
export default Login;