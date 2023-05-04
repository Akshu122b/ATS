const express = require("express")
const { addApplicant, ApplicantList, SingleApplicant, ApplicantNextProcess, updateComment, emailSearch, deteleApplicant, ApplicantById, } = require("../controllers/applicantControlls")
const applicantRoutes = express.Router()



applicantRoutes.post("/applicant/add", addApplicant)

//Getting all the applicants list

applicantRoutes.put("/appicant/update/comments", ApplicantNextProcess)
applicantRoutes.get("/allApplicants", ApplicantList)
applicantRoutes.get("/singleApplicant/:email", SingleApplicant)
applicantRoutes.get("/applicant/id/:_id", ApplicantById)
applicantRoutes.patch("/comment", updateComment)
applicantRoutes.get("/search",emailSearch)
applicantRoutes.delete("/applicant/delete/:_id",deteleApplicant)

module.exports = applicantRoutes