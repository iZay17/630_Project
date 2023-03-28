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
        const sentData = {
            email:user.email,
            password:user.password   
        }

    console.log(sentData);

    axios.post('http://localhost/react/login.php', sentData)
    .then(result=>{
        if (result.data.Status === '200') {
            window.localStorage.setItem('email', result.data.email);
            window.localStorage.setItem('user_name', result.data.first_name+ ' '+result.data.last_name);
            navigate('/Home');
       
        }
        else {
            alert('Invalid user');
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