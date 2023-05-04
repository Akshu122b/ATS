import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
import { fetchApplicants } from '../../Redux/applicantSlice'
const UpdateStatus = ({applicantdetails}) => {
    const changeDoneBy = JSON.parse(localStorage.getItem("AdminInfo")).name
    const statusOpt = ["HR Round", "Hiring Manager", "Technical Round", "Rejected", "On hold", "Selected"]
    const owners = ["Bhavya", "Hari", "Veera", "Rathakar", "Balaji"]
    // const [update, setUpdate] = useState(false)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        email: applicantdetails.email,
        commentBy: changeDoneBy,
        comment: "",
        status: applicantdetails.status,
        cRound: applicantdetails.status,
        nextRound: ""
    })
    const handleUpdateApplicantStatus = async (e) => {
        e.preventDefault()
        validForm()
        if (validForm() === true) {
            const config = { headers: { "Content-Type": "Application/json" } }
            await axios.put("https://ats-be.onrender.com/appicant/update/comments", postData, config)
                .then((res) => {
                    toast.success("status updated successfully")
                    dispatch(fetchApplicants())
                    dispatch(GetApplicant(""))
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
        if (postData.status === applicantdetails.status) {
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
    

  return (
    <div>
          <div>
              <form className='border border-2 p-2' onSubmit={handleUpdateApplicantStatus}>
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
                          <input className='form-control' name='cRound' value={applicantdetails.status} readOnly onChange={handleInputChange} type="text" />
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
          </div>
         
    </div>
  )
}

export default UpdateStatus
