import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CForm, CFormInput } from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { DeleteModel } from './DeleteModel'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchApplicants } from '../../Redux/applicantSlice'
const statusOpt = ["HR Round", "Hiring Manager", "Technical Round", "Rejected", "On hold", "Selected"]
const owners = ["Bhavya", "Hari", "Veera", "Rathakar", "Balaji"]
const SingleApplicantView = () => {
    const [appData, setAppData] = useState({})
    const navigator=useNavigate()
    const changeDoneBy = localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")).name : "Bhavya"
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`https://ats-be-plpb.onrender.com/applicant/id/${id}`).then(res => setAppData(res.data)).catch(err => console.log(err.message))
        // dispatch(GetApplicantById(id)).then(res => setAppData(res.payload))
    }, [dispatch, id])
    const [update, setUpdate] = useState(false)
    const [errors, setErrors] = useState({})
    const [postData, setPostData] = useState({
        commentBy: changeDoneBy,
        comment: "",
        status: appData.status,
        nextRound: ""
    })
    const handleUpdateApplicantStatus = async (e) => {
        e.preventDefault()
        validForm()
        if (validForm() === true) {
            const config = { headers: { "Content-Type": "Application/json" } }
            const data = {
                ...postData, email: document.getElementById("emailId").value, cRound: document.getElementById("cRound").value
            }
            await axios.put("https://ats-be-plpb.onrender.com/appicant/update/comments", data, config)
                .then((res) => {
                    alert("status updated successfully")
                    window.location.reload(false)
                    // dispatch(fetchApplicants())
                    // dispatch(GetApplicant(""))
                }).catch((err) => {
                    toast.info("Unable to update now ! try after some time")
                })
        }
    }
    //Handling input Change 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPostData({ ...postData, [name]: value })
    }
    //validations for the form
    const validForm = () => {
        let isValid = true
        let errors = {}
        if (postData.status === appData.status) {
            errors["status"] = "Please update the status of the applicant."
            isValid = false
        }
        if (!postData.comment) {
            errors["comment"] = "Please write comments for the applicant."
            isValid = false
        }
        if (!postData.commentBy || postData.commentBy === "") {
            errors["commentBy"] = "Please choose commented one."
            isValid = false
        }
        if (!postData.nextRound) {
            errors["nextRound"] = "Please choose next round  owner."
            isValid = false
        }
        setErrors(errors)
        return isValid;
    }
    ///To hide the errors .
    const hideErrors = (e) => {
        setErrors({ ...errors, [e.target.name]: "" })
    }
    ///delete Applicant 
    const deleteApplicant = async () => {
        await axios.delete(`https://ats-be-plpb.onrender.com/applicant/delete/${appData._id}`)
            .then(res => {
                alert(`Applicant ${appData.name} deleted successfully`)
                navigator("/")
                dispatch(fetchApplicants())
            })
            .catch(err => alert("Unable to delete applicant.Please try after some time."))
    }



    return (
        <>
            {
                Object.keys(appData).length > 0 ? <>
                    <CCard className="mb-4 container">
                        <CCardHeader className='text-center'><h5>Full details of the Applicant</h5> </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CForm className="row g-3 needs-validation">
                                    <CCol md={6}>
                                        <CFormInput type="text" value={appData.name} readOnly label="Name of the Applicant" />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="email"
                                            id="emailId"
                                            value={appData.email}
                                            readOnly
                                            name="email"
                                            label="Email"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="Number"
                                            name="mobile"
                                            value={appData.mobile}
                                            readOnly
                                            label="Mobile Number"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            className='form-control'
                                            name="role"
                                            value={appData.role}
                                            readOnly
                                            label="Applied Role"
                                        >
                                        </CFormInput>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            name="collegeName"
                                            value={appData.collegeName}
                                            readOnly
                                            label="College Name"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            name="qualification"
                                            value={appData.qualification}
                                            readOnly
                                            label="Qualification"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            name="Branch"
                                            value={appData.branch}
                                            readOnly
                                            label="Branch"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="Number"
                                            name="passout"
                                            value={appData.passout}
                                            readOnly
                                            label="Passout Year"
                                        />
                                    </CCol>
                                    {
                                        appData.experience > 0 ? <>
                                            <CCol md={6}>
                                                <CFormInput
                                                    type="text"
                                                    name="previousCompany"
                                                    value={appData.previousCompany}
                                                    readOnly
                                                    label="Previous Company Name"
                                                />
                                            </CCol>
                                            <CCol md={6}>
                                                <CFormInput
                                                    type="Number"
                                                    name="experience"
                                                    value={appData.experience}
                                                    readOnly
                                                    label="Experience in Years"
                                                />
                                            </CCol>


                                        </> : null
                                    }


                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={appData.nextRound}
                                            readOnly
                                            placeholder="Next Round Owner"
                                            id="nextRound"
                                            label="Next Round Owner"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={appData.status}
                                            readOnly
                                            placeholder="Status of the applicant"
                                            id="status"
                                            label="Status of the applicant"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={appData.createdAt.substring(0, 10)}

                                            readOnly
                                            label="Applied Date"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            onClick={() => window.open(`${appData.resumeLink}`)}
                                            value={appData.resumeLink}
                                            style={{ color: "green", cursor: "pointer" }}
                                            readOnly
                                            label="Resume Link"
                                        />
                                    </CCol>
                                </CForm>

                                {
                                    appData.comments.length > 0 ? <>
                                        <div className='overflow-auto'>
                                            <table className='table table-hover my-4'>
                                                <thead className='bg-dark text-white'>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Comment Round</th>
                                                        <th>Updated By</th>
                                                        <th>Comments</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='tbody'>
                                                    {
                                                        appData.comments.map((item, index) =>
                                                            < tr key={index} >
                                                                <td>{index + 1}</td>
                                                                <td>{item.cRound}</td>
                                                                <td>{item.commentBy}</td>
                                                                <td>{item.comment}</td>
                                                            </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </> : null
                                }
                            </CRow>
                        </CCardBody>
                        {update &&
                            <CCardBody>
                                <form className='border border-2 p-2' onSubmit={handleUpdateApplicantStatus}>
                                    <div className='mb-3 text-center'><b>Change Status of the applicant</b></div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Change Done By:</label>
                                        <div className="col-sm-9">
                                            <input className='form-control' name='commentBy' readOnly onChange={handleInputChange} value={changeDoneBy} onFocus={hideErrors} type="text"></input>
                                            {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Current Status:</label>
                                        <div className="col-sm-9">
                                            <input className='form-control' name='cRound' id="cRound" value={appData.status} readOnly onChange={handleInputChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">New Status:</label>
                                        <div className="col-sm-9">
                                            <select className='form-select' onChange={handleInputChange} onFocus={hideErrors} name="status">
                                                <option value="">---Choose new status---</option>
                                                {statusOpt && statusOpt.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            {errors.status ? <p className='text-danger'>{errors.status}</p> : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">New Owner:</label>
                                        <div className="col-sm-9">
                                            <select className='form-select' value={postData.nextRound} onChange={handleInputChange} onFocus={hideErrors} name="nextRound">
                                                <option >--Choose new owner--</option>
                                                {owners && owners.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                            {errors.nextRound ? <p className='text-danger'>{errors.nextRound}</p> : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Comments:</label>
                                        <div className="col-sm-9">
                                            <input className='form-control' name="comment" value={postData.comment} onFocus={hideErrors} onChange={handleInputChange} type="text" />
                                            {errors.comment ? <p className='text-danger'>{errors.comment}</p> : null}
                                        </div>
                                    </div>


                                    <div>
                                        <button className='btn btn-primary'>Change Status</button>
                                    </div>
                                </form>
                            </CCardBody>}
                        <div className="container mb-2">
                            <div className='d-flex justify-content-between container'>
                                <button onClick={() => setUpdate(!update)} className={update ? "btn btn-warning" : "btn btn-primary"}>{update ? "❌Close Form " : "Change Applicant Status"}</button>
                                {/* <button onClick={deleteApplicant} className='btn btn-danger'>Delete Applicant</button> */}
                                <DeleteModel deleteApplicant={deleteApplicant} name={appData.name} email={appData.email} />
                            </div>
                        </div>



                    </CCard>

                </> : null
            }
        </>
    )
}

export default SingleApplicantView




// < td > <ConfirmModel _id={appData._id} commentOne={item.comment} commentId={item._id} /></ >

//code pased by veera becarefull
// {update && <CCardBody>
//                             <CCardHeader className='text-center '>
//                                 Change Applicant Status
//                             </CCardHeader><br />
//                             <form className='border border-2 p-2' onSubmit={handleUpdateApplicantStatus}>
//                                 <div className="mb-3">
//                                     <label>Status of the Applicant :</label>
//                                     <select className='form-select' onChange={handleInputChange} onFocus={hideErrors} name="status">
//                                         <option value={appData.status}>{appData.status}</option>
//                                         <option value="Assignment">Assignment</option>
//                                         <option value="Technical Round">Technical Round</option>
//                                         <option value="Final Round">Final Round</option>
//                                         <option value="Rejected">Rejected</option>
//                                     </select>
//                                     {errors.status ? <p className='text-danger'>{errors.status}</p> : null}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label>Next Round Owner :</label>
//                                     <select className='form-select' value={postData.nextRound} onChange={handleInputChange} onFocus={hideErrors} name="nextRound">
//                                         <option disabled>--choose Next Round Owner--</option>
//                                         <option value="Bhavya">Bhavya</option>
//                                         <option value="Veera">Veera</option>
//                                         <option value="Rathnakar">Rathnakar</option>
//                                         <option value="Balaji">Balaji</option>
//                                     </select>
//                                     {errors.nextRound ? <p className='text-danger'>{errors.nextRound}</p> : null}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label>Comments for the Round :</label>
//                                     <input className='form-control' name='cRound' value={appData.status} readOnly onChange={handleInputChange} type="text" />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label>Comment By :</label>
//                                     <select className='form-select' name='commentBy' onChange={handleInputChange} onFocus={hideErrors} type="text">
//                                         <option value="">--Choose Comment By --</option>
//                                         <option value="Bhavya">Bhavya</option>
//                                         <option value="Veera">Veera</option>
//                                         <option value="Rathnakar">Rathnakar</option>
//                                         <option value="Balaji">Balaji</option>
//                                     </select>
//                                     {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label>Comments :</label>
//                                     <input className='form-control' name="comment" value={postData.comment} onFocus={hideErrors} onChange={handleInputChange} type="text" />
//                                     {errors.comment ? <p className='text-danger'>{errors.comment}</p> : null}
//                                 </div>
//                                 <div>
//                                     <button className='btn btn-primary'>Change Status</button>
//                                 </div>
//                             </form>
//                         // </CCardBody>} 


