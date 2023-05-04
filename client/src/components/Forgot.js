import React, { useState } from 'react'
import axios from "axios"
const Forgot = () => {
    const [formData, setFormData] = useState({})
    const [msg,setMsg]=useState({})
    const handleSubmit = async(e) => {
        e.preventDefault()
        validForm()
        const { email, password, c_password } = formData
        if (!email || !password || !c_password) {
            setMsg({...msg,email:"Email is required",password:"Password is required",c_password:"Confirm password is required"})
        } else {
            if (password !== c_password) {
                setMsg({c_password:"Password should match with confirm password"})
            }else{
                setMsg({})
                await axios.patch(`https://ats-be.onrender.com/admin/forgot_password/${email}`,formData)
                .then(res=>res.data)
                .catch(err=>setMsg({email:"Invalid email.Please enter valid email"}))
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const validForm=()=>{
        switch(true){
            case (!formData.email):setMsg({email:"Email is required"})
            break;
            case(formData.email.includes("@gmail.com")===false):setMsg({email:"Email should includes @gmail.com"})
            break;
            case(!formData.password):setMsg({password:"Password is required"})
            break;
            default:return true
        }
    }
    const handleFocus=(e)=>{
        setMsg({...msg,[e.target.name]:e.target.value})
    }
    return (
        <div className='bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center'>
            <form onSubmit={handleSubmit} style={{width:"100vh"}} className='border border-3 p-2 '>
                <div className='p-2 ' >
                    <label>Enter Your Email Id :</label>
                    <input className='form-control' name="email" onBlur={()=>validForm()} onFocus={handleFocus} onChange={handleInputChange} type='text' />
                    {
                        msg.email ? <p className='text-danger'>{msg.email}</p> : null
                    }
                </div>
                
                <div className='p-2'>
                    <label>Enter new password :</label>
                    <input className='form-control' name='password' type="text" onFocus={handleFocus}  onChange={handleInputChange} />
                    {
                        msg.password ? <p className='text-danger'>{msg.password}</p> : null
                    }
                </div>
                
                <div className='p-2'>
                    <label>Confirm password :</label>
                    <input className='form-control' name="c_password" type="text" onFocus={handleFocus} onChange={handleInputChange} />
                    {
                        msg.c_password ? <p className='text-danger'>{msg.c_password}</p> : null
                    }
                </div>
                <div className='p-2'>
                    <button className='btn btn-primary'>Update Password</button>
                </div>
            </form>
        </div>
    )
}

export default Forgot