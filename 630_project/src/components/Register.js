import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props)=> {

    const history = useNavigate();
    const [data, setData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
        
    })

    const handleChange=(e)=> {
        setData({ ...data, [e.target.name]: e.target.value });
    //    console.log(data)
    }

    const submitForm = (e)=> {
        e.preventDefault();
        const sentData = {
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            password:data.password
            
        }

    console.log(sentData);

    axios.post('http://localhost/react/insert2.php', sentData)
    .then(result=>{
        if (result.data.status === 'Invalid') {
        alert('Invalid data');
        }
        else {
        history('/dashboard');
    }
    })

    }

    return(
        <div className="main-box">
        <form onSubmit = {submitForm}>
            <div className="row">
            <div className="col-md-12 text-center"><h1>Register</h1></div>
            </div>  
            <div>
                <div className="row">
                    <div className="col-md-6">First Name</div>
                    <div className="col-md-6">
                        <input type="text" name="first_name" className="form-control" 
                        onChange={handleChange} value={data.first_name}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">Last Name</div>
                    <div className="col-md-6">
                        <input type="text" name="last_name" className="form-control" 
                        onChange={handleChange} value={data.last_name}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">Email</div>
                    <div className="col-md-6">
                        <input type="text" name="email" className="form-control" 
                        onChange={handleChange} value={data.email}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">Password</div>
                    <div className="col-md-6">
                        <input type="password" name="password" className="form-control" 
                        onChange={handleChange} value={data.password}
                        />
                    </div>
                </div>
        
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
