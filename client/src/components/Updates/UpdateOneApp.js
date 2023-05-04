import axios from 'axios'
import React, { useState } from 'react'
import UpdateStatus from './UpdateStatus'

const UpdateOneApp = () => {
    const [email, setEmail] = useState("")
    const [emailErr,setEmailErr]=useState("")
    const [data, setData] = useState({})

    //for getting the details of the applicant              
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setEmailErr("Please enter email of the applicant.")
        } else {
            try {
                const data = await axios.get(`https://ats-be.onrender.com/singleApplicant/${email}`).then(res => res.data)
                setData(data)
                setEmailErr(null)
                console.log(data)
            } catch (err) {
                setEmailErr(err.response.data)
            }

        }
    }
    return (
        <>
            <div className='container p-2 my-4 border border-2'>
                <form onSubmit={handleSubmit} className='p-2'>
                    <label>Enter Email of the Applicant</label>
                    <input className='form-control' type="email" onChange={(e) => setEmail(e.target.value)} />
                   {emailErr ?<p className='text-danger'>{emailErr}</p>:null}
                    <button className='btn btn-primary mt-2' >Get Details</button>
                </form>
                {
                    Object.keys(data).length > 0 ? <UpdateStatus applicantdetails={data} /> : null
                }
            </div>
        </>
    )
}

export default UpdateOneApp