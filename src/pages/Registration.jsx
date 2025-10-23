// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
// import { data, Link } from 'react-router';
// import axios from 'axios';


// const Registration = () => {


//     let [userName,setUserName] = useState("")
//     let [email,setEmail] = useState("")
//     let [password,setPassword]= useState("")

//     let [userNameError,setUserNameError] = useState("")
//     let [emailError,setEmailError] = useState("")
//     let [passwordError,setPasswordError]= useState("")

//     let handleUserNameChange = (e) =>{
//         setUserName("e.target.value")
//         setUserNameError("")
//     }

//      let handleEmailChange = (e) =>{
//         setEmail("e.target.value")
//         setEmailError("")
//     }

//      let handlePasswordChange = (e) =>{
//         setPassword("e.target.value")
//         setPasswordError("")
//     }

//     let handleFormSubmit = (e)=>{
//         e.preventDefault()
//         if(!userName){
//             setUserNameError("Username required")
//         }

//          if(!email){
//             setEmailError("Email required")
//         }

//          if(!password){
//             setPasswordError("Password required")
//         }

//         if(userName && email && password){
//           axios.post("http://localhost:5000/registration",{
//             userName: userName,
//             email: email,
//             password: password
//           }).then((data)=>{
//             console.log(data)

//           })
//         }
//     }

//   return (




    


//     <div className='registration'>


//       <div className='logo'>

//         <img src="Images/thakurgaonpl.jpg" alt="Image loading" />

//         <h1>Thakurgaon Polytechnic Institute</h1>
//       </div>



//         <Container>
//         <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>User Name</Form.Label>
//         <Form.Control onChange={handleUserNameChange} type="text" placeholder="Enter username" />
      
      
//       {
//         userNameError &&
//        <Alert key="danger" variant="danger">
//           {userNameError}
//         </Alert>
//       }

//       </Form.Group>


//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" />
        
//           {
//         emailError &&
//        <Alert key="danger" variant="danger">
//           {emailError}
//         </Alert>
//       }
//        </Form.Group>
      

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" />
      
      

//          {
//         passwordError &&
//        <Alert key="danger" variant="danger">
//           {passwordError}
//         </Alert>
//       }
//       </Form.Group>
      
//       <Button onClick={handleFormSubmit} variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>


//     <Alert key="info" variant="info">
//           Already have an account ? <Link to="/login">Login</Link>
//         </Alert>

//     </Container>
//     </div>
//   )
// }

// export default Registration;










// this is my 2 number code start here


import { useEffect, useState } from "react";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Input handle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "⚠️ Username is required";
    if (!formData.email) newErrors.email = "⚠️ Email is required";
    if (!formData.password) newErrors.password = "⚠️ Password is required";
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/registration", formData);

      if (res.status === 201 || res.data.includes("Registration successful")) {
        setSuccess("✅ Registration successful!");
        console.log(res.data);

     
        setFormData({ username: "", email: "", password: "" });

        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
    
      setSuccess(err.response?.data || "❌ Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };


   useEffect(()=> {
      let data = localStorage.getItem("user")
      if(data){
        navigate("/student")
      }
  
    },[])

  return (
    <div className="registration">
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="mb-4 text-center">📝 Create an Account</h2>

        {success && (
          <Alert variant={success.includes("✅") ? "success" : "danger"}>
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Register"}
            </Button>
          </div>
        </Form>

        <Alert variant="info" className="mt-4 text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </Alert>
      </Container>
    </div>
  );
};

export default Registration;



// 2 number cod end here








