const express=require("express")
const { auth, registerAdmin, forgotPassword } = require("../controllers/adminControlls")
const adminRoutes=express.Router()
adminRoutes.post("/admin/login/:email",auth)
 
adminRoutes.post("/admin/register",registerAdmin)
adminRoutes.patch("/admin/forgot_password/:email",forgotPassword)
module.exports=adminRoutes

