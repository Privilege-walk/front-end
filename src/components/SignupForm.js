import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import * as yup from 'yup';

import Form from "react-bootstrap/Form";
import {
    Label, 
    Button, 
    FormGroup, 
    FormFeedback,
    Input,
    Row
} from 'reactstrap';
import { signupUser } from "../Store/actions";


const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required").email("Invalid email address")
});


function SignUpForm({signupUser}) {
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    
    async function handleSubmit(formData){
        setErrMsg("");
        const data = {
            "first_name": formData["firstName"],
            "last_name": formData["lastName"],
            "username": formData["username"],
            "password": formData["password"],
            "email": formData["email"]
        };
        const action = await signupUser(data);
        if(action.payload.created == "success"){
            localStorage.removeItem('token');
            navigate("/login");
        }else{
            setErrMsg(action.payload.created);
        }
        
    }

    function onLogin() {
        navigate("/login");
    }

    return (
        <div className="Form">
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',         
              }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                valid,
                errors
            }) => (
                <Form onSubmit={handleSubmit} className="mt-4">
                    
                    <Row className="mb-1">
                        <FormGroup
                        md="6"
                        className="position-relative"
                        >
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                valid={touched.firstName && !errors.firstName}
                                invalid={errors.firstName?true:false}
                            />
                            <FormFeedback type="invalid">
                                {errors.firstName}
                            </FormFeedback>
                        </FormGroup>
                    </Row>


                    <Row className="mb-1">
                        <FormGroup
                        md="6"
                        className="position-relative"
                        >
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                valid={touched.lastName && !errors.lastName}
                                invalid={errors.lastName?true:false}
                            />
                            <FormFeedback type="invalid">
                                {errors.lastName}
                            </FormFeedback>
                        </FormGroup>
                    </Row>

                    <Row className="mb-1">
                        <FormGroup
                        md="6"
                        className="position-relative"
                        >
                            <Label htmlFor="username" >Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                valid={touched.username && !errors.username}
                                invalid={errors.username?true:false}
                            />
                            <FormFeedback type="invalid">
                                {errors.username}
                            </FormFeedback>
                        </FormGroup>
                    </Row>

                    <Row className="mb-1">
                        <FormGroup
                        md="6"
                        className="position-relative"
                        >
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                valid={touched.password && !errors.password}
                                invalid={errors.password?true:false}
                            />
                            <FormFeedback type="invalid">
                                {errors.password}
                            </FormFeedback>
                        </FormGroup>
                    </Row>

                    <Row className="mb-1">
                        <FormGroup
                        md="6"
                        className="position-relative"
                        >
                            <Label htmlFor="email" >Email</Label>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                valid={touched.email && !errors.email}
                                invalid={errors.email?true:false}
                            />
                            <FormFeedback type="invalid">
                                {errors.email}
                            </FormFeedback>
                        </FormGroup>
                    </Row>

                    <Row data-testid="signupErrorId" className="mb-3 errMsg justify-content-center">{errMsg}</Row>

                    {/* <Row className="justify-content-center my-2"> */}
                    <Button size="lg" type="submit" 
                    >
                        Sign Up
                    </Button>
                    <Button size="lg"
                        style={{marginLeft: 20}}
                        onClick={onLogin}
                    >
                        Login
                    </Button>
                    {/* </Row> */}
                    
                </Form>
            )}
        </Formik>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps ={
    signupUser
  };
  
  var SignUpFormContainer = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
  export default SignUpFormContainer;