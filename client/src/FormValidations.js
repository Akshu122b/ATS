import React, { useState } from "react";

function RegistrationForm() {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        let newFields = { ...fields };
        newFields[e.target.name] = e.target.value;
        setFields(newFields);
    };
    const hideErrors = (e) => {
        e.target.value !== "" && setErrors({ ...errors, [e.target.name]: "" })
    }
    const submitApplicantRegistrationForm = (e) => {
        console.log(validateForm());
        e.preventDefault();
        if (validateForm()) {
            console.log(fields);
            setFields({});
            console.log(fields);
            alert("Form submitted");
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            newErrors["name"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                newErrors["name"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            newErrors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                newErrors["email"] = "*Please enter valid email-ID.";
            }
        }
        ///for mobile number validation
        if (!fields["mobile"]) {
            formIsValid = false;
            newErrors["mobile"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobile"] !== "undefined") {
            if (!fields["mobile"].match(/^[6-9]\d{9}$/)) {
                formIsValid = false;
                newErrors["mobile"] = "*Please enter valid mobile no.";
            }
        }
        ///for password validations
        // if (!fields["password"]) {
        //     formIsValid = false;
        //     newErrors["password"] = "*Please enter your password.";
        // }

        // if (typeof fields["password"] !== "undefined") {
        //     if (
        //         !fields["password"].match(
        //             /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        //         )
        //     ) {
        //         formIsValid = false;
        //         newErrors["password"] = "*Please enter secure and strong password.";
        //     }
        // }

        ///for college name validations
        if (!fields["college"]) {
            formIsValid = false;
            newErrors["college"] = "*Please type your college name.";
        }
        if (typeof fields["college"] !== "undefined") {
            if (!fields["college"].match(/^[a-zA-Z]*$/)) {
                formIsValid = false
                newErrors["college"] = "*please enter valid college name"
            }
        }
        //password validations 
        if (!fields["passout"]) {
            formIsValid = false;
            newErrors["passout"] = "*Please enter passout year"
        }
        if(typeof fields["pasout"])

        setErrors(newErrors);
        return formIsValid
    }
    return (
        <div className="container bg-light">
            <div>
                <h4 className="text-center text-primary">Add Applicant</h4>
            </div>
            <div className="border border-2">
                <form className="border border-2 p-4 w-75 m-auto" onSubmit={submitApplicantRegistrationForm}>
                    <div className="mb-3">
                        <label>Name of the Applicant :</label>
                        <input className="form-control" name="name" type="text" onChange={handleChange} onKeyUp={hideErrors} />
                        {errors.name ? <p className="text-danger">{errors.name}</p> : null}
                    </div>
                    <div className="mb-3">
                        <label>Email of the Applicant :</label>
                        <input className="form-control" name="email" type="text" onChange={handleChange} onKeyUp={hideErrors} />
                        {errors.email ? <p className="text-danger">{errors.email}</p> : null}
                    </div>
                    <div className="mb-3">
                        <label>Enter Mobile Number :</label>
                        <input className="form-control" name="mobile" type='number' onChange={handleChange} onKeyUp={hideErrors} />
                        {errors.mobile ? <p className="text-danger">{errors.mobile}</p> : null}
                    </div>
                    <div className="mb-3">
                        <label>Enter College Name :</label>
                        <input className="form-control" name="college" onChange={handleChange} onKeyUp={hideErrors} type="text" />
                        {errors.college ? <p className="text-danger">{errors.college}</p> : null}
                    </div>
                    <div className="mb-3">
                        <label>Enter Passout Year :</label>
                        <input className="form-control" name="college" onChange={handleChange} onKeyUp={hideErrors} type="number" />
                        {errors.passout ? <p className="text-danger">{errors.passout}</p> : null}
                    </div>
                    <div className="mt-1">
                        <button className="btn btn-primary">Add Applicant</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;