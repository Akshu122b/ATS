import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({ setIsLogin }) => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    //code for update the formdata
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()
    ///code for login
    const handleLogin = async () => {
        validateForm()
        const config = { headers: { "Content-Type": "Application/json" } }
        if (validateForm() === true) {
            await axios.post(`https://ats-be.onrender.com/admin/login/${formData.email}`, formData, config)
                .then((res) => {
                    localStorage.setItem("AdminInfo", JSON.stringify(res.data))
                    toast.success(`Welcome to ${res.data.name}`)
                    setIsLogin(true)
                    navigate("/")
                })
                .catch(err =>{
                    setErrors(err.response.data)
                    console.log(err.message)
                } )
        }
    }

    const validateForm = () => {
        let isValidForm = true
        let errors = {}
        //for email validations
        if (!formData.email) {
            errors["email"] = "Please enter your email"
            isValidForm = false
        } 
        ///for password validations
        if (!formData.password) {
            errors["password"] = "Please enter your password"
            isValidForm = false
        } else if (formData.password.length < 6) {
            errors["password"] = "Password should be greater than 6 characters"
            isValidForm = false
        }
        setErrors(errors)
        return isValidForm
    } 
    const hideErros=(e)=>{
            setErrors({ ...errors, [e.target.name]: "" })
    }
    const showErrors=(e)=>{
       e.target.value !=="" && validateForm()
    }
    return (
        <div className='w-50 border border-2 p-5 mx-auto my-5'>
            <h4 className='text-center'>Applicant Tracking System</h4>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Enter your email</label>
                    <input className="form-control" type="email" name="email" onBlur={showErrors}  onChange={handleInputChange} onFocus={hideErros} placeholder="Email" />
                    {
                        errors.email && <p className='text-danger'>{errors.email}</p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input className="form-control" type="password" onBlur={showErrors} name="password" onChange={handleInputChange} onFocus={hideErros} placeholder="Password" />
                    {
                        errors.password && <p className='text-danger'>{errors.password}</p>
                    }
                </div>

                <button onClick={handleLogin} type="submit" className="btn btn-primary w-100">Sign in</button>
            </form>
        </div>
    )
}

export default Login

////Original code
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// const Login = ({ setIsLogin }) => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     })
//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value })
//     }
//     const navigate = useNavigate()
//     const handleLogin = async () => {
//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "Application/json"
//                 }
//             }


//             if (formData.email && formData.password) {
//                 const loginData = await axios.post("/admin/login", formData, config).then(res => res.data)
//                 if (loginData) {
//                     localStorage.setItem("AdminInfo", JSON.stringify(loginData))
//                     toast.success("Login Successfully")
//                     setIsLogin(true)
//                     navigate("/")
//                 } else {
//                     console.log("hello")
//                 }
//             } else {
//                 if (!formData.email) {
//                     toast.warning("Please Enter Your Email")
//                 }
//                 if (!formData.password) {
//                     toast.warning("Please Enter Your Password")
//                 }
//             }
//         }
//         catch (err) {
//             console.log(err.message)
//             toast.warning("Invalid Credentials")
//         }
//     }
//     console.log(formData)

//     return (
//         <div className='w-50 border border-2 p-5 mx-auto my-5'>
//             <h4 className='text-center'>Applicant Tracking System</h4>
//             <form onSubmit={(e) => e.preventDefault()}>
//                 <div className="form-group">
//                     <label htmlFor="inputEmail">Enter your email</label>
//                     <input value={formData.email} name="email" onChange={handleInputChange} type="email" className="form-control" id="inputEmail" placeholder="Email" />

//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="inputPassword">Password</label>
//                     <input value={formData.password} name="password" onChange={handleInputChange} type="password" className="form-control" id="inputPassword" placeholder="Password" />
//                 </div>

//                 <button onClick={handleLogin} type="submit" className="btn btn-primary w-100">Sign in</button>
//             </form>
//         </div>
//     )
// }

// export default Login