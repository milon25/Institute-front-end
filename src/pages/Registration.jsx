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
  const [showPassword, setShowPassword] = useState(false);


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
      const res = await axios.post("https://institute-back-end.onrender.com/registration", formData);

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


  useEffect(() => {
    let data = localStorage.getItem("user")
    if (data) {
      navigate("/student")
    }

  }, [])

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
          {/* Username set korar jonne eita banabno hoiche */}
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

          {/* Email er jonne eita check */}
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

          {/* Password filed korar jonne ba error show korar jonne */}
          <Form.Group className="mb-4">




            <Form.Group className="mb-4">


              <Form.Label>Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {/* Show/Hide Button */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                    fontSize: "14px"
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}


              <Form.Group className="mb-4">


              </Form.Group>




            </Form.Group>


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











