// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Alert from 'react-bootstrap/Alert';
// import { useState } from 'react';
// import { Link } from 'react-router';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError("");
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordError("");
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     let valid = true;

//     if (!email) {
//       setEmailError("Email required");
//       valid = false;
//     }

//     if (!password) {
//       setPasswordError("Password required");
//       valid = false;
//     }

//     if (valid) {
//       console.log("Form submitted:", { email, password });
//       // এখানে API কল বা redirect করতে পারো
//     }
//   };

//   return (
//     <div className='login'>
//       <Container>
//         <Form onSubmit={handleFormSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" />
//             {emailError && (
//               <Alert key="danger" variant="danger">
//                 {emailError}
//               </Alert>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" />
//             {passwordError && (
//               <Alert key="danger" variant="danger">
//                 {passwordError}
//               </Alert>
//             )}
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>

//          <Alert key="info" variant="info">
//           Don't have an account ? <Link to="/">Registration</Link>
//         </Alert>

//       </Container>
//     </div>
//   );
// };

// export default Login;








import { use, useEffect, useState } from "react";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Input handle 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.email || !formData.password) {
      setError("⚠️ Email and Password required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://institute-back-end.onrender.com/login", formData);

      // message show + redirect
      if (res.status === 200) {
        setSuccess(res.data.message || "✅ Login successful!");
        // user info 
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // redirect after 1.5s
        setTimeout(() => navigate("/teacher"), 1500);
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      
      const msg = err.response?.data || "❌ Invalid login credentials!";
      setError(msg);
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
    <div className="login">
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="mb-4 text-center">🔐 Login to Your Account</h2>

        {/* ✅ Success Message */}
        {success && <Alert variant="success">{success}</Alert>}

        {/* ❌ Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </div>
        </Form>

        <Alert variant="info" className="mt-4 text-center">
          Don’t have an account? <Link to="/registration">Register now</Link>
        </Alert>
      </Container>
    </div>
  );
};

export default Login;







