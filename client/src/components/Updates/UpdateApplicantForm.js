import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import UpdateStatus from './UpdateStatus'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
import { CCardHeader } from '@coreui/react'

const UpdateApplicantForm = () => {
    const appDetails = useSelector(state => state.singleApplicant.ApplicantDetails)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        if (email !== "") {
            await axios.get(`https://ats-be-plpb.onrender.com/singleApplicant/${email}`).then(res => {
                dispatch(GetApplicant(res.data))
            }).then(res=>console.log(res))
            .catch(err=>console.log(err.message))
        }
    }
    return (
        <div className='container p-4'>
            <CCardHeader className='text-center'>
                Change Status of the Applicant
            </CCardHeader><br />
            {
                Object.keys(appDetails).length > 0 ? <UpdateStatus applicantdetails ={appDetails} /> :
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Enter Applicant Email:</label>
                                <input id="email" type="email" required className='form-control' />
                            </div>
                            <br />
                            <div>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}
export default UpdateApplicantForm

