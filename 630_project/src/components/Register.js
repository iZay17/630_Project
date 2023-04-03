import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props)=> {

    const history = useNavigate();
    const [data, setData] = useState({
        loginid: "",
        first_name:"",
        last_name:"",
        email:"",
        password:""
        
    })
    const [error, setError] = useState(false);

    const handleChange=(e)=> {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(data);
    }

    const submitForm = (e)=> {
        e.preventDefault();

        let sentData = new FormData();
        sentData.append('loginid', data.loginid);
        sentData.append('firstname', data.first_name);
        sentData.append('lastname', data.last_name);
        sentData.append('email', data.email);
        sentData.append('password', data.password);

        if(data.loginid.length==0||data.first_name.length==0||data.last_name.length==0||data.email.length==0||data.password.length==0) {
            setError(true);
        }
        
        if (data.loginid&&data.first_name&&data.last_name&&data.email&&data.password) {
            axios.post('http://localhost/630_Project/api/users/insert2.php', sentData)
            .then(result=>{
                if (result.data.status === 'Invalid') {
                alert('Invalid data');
                }
                else {
                alert(result.data);
                history('/Login');
            }
            })
        }

    }

    return(
        <div className="main-box">
        <form onSubmit = {submitForm}>
            <div className="row">
            <div className="col-md-12 text-center"><h1>Register</h1></div>
            </div>  
            <div>
            <div className="row">
                    <div className="col-md-6">Login ID</div>
                    <div className="col-md-6">
                        <input type="text" name="loginid" className="form-control" 
                        onChange={handleChange} value={data.loginid}
                        />
                    </div>
                </div>
                
                {error&&data.loginid.length<=0? 
                    <label>Login ID can't be empty</label> : ""
                }

                <div className="row">
                    <div className="col-md-6">First Name</div>
                    <div className="col-md-6">
                        <input type="text" name="first_name" className="form-control" 
                        onChange={handleChange} value={data.first_name}
                        />
                    </div>
                </div>
                
                {error&&data.first_name.length<=0? 
                    <label>First name can't be empty</label> : ""
                }

                <div className="row">
                    <div className="col-md-6">Last Name</div>
                    <div className="col-md-6">
                        <input type="text" name="last_name" className="form-control" 
                        onChange={handleChange} value={data.last_name}
                        />
                    </div>
                </div>
                
                {error&&data.last_name.length<=0? 
                    <label>Last name can't be empty</label> : ""
                }

                <div className="row">
                    <div className="col-md-6">Email</div>
                    <div className="col-md-6">
                        <input type="text" name="email" className="form-control" 
                        onChange={handleChange} value={data.email}
                        />
                    </div>
                </div>

                {error&&data.email.length<=0? 
                    <label>Email can't be empty</label> : ""
                }

                <div className="row">
                    <div className="col-md-6">Password</div>
                    <div className="col-md-6">
                        <input type="password" name="password" className="form-control" 
                        onChange={handleChange} value={data.password}
                        />
                    </div>
                </div>
                
                {error&&data.password.length<=0? 
                    <label>Password can't be empty</label> : ""
                }

                <div className="row">
                    <div className="col-md-12 text-cener">
                        <input type="submit" name="submit" value="Register" className="btn btn-success"/>                    
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
}
export default Register;
