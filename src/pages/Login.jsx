
import { useEffect, useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
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


      if (res.status === 200) {
        setSuccess(res.data.message || "✅ Login successful!");

        localStorage.setItem("user", JSON.stringify(res.data.user));


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

  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      navigate("/student");
    }
  }, [navigate]);

  return (
    <div className="login">
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="mb-4 text-center">🔐 Login to Your Account</h2>

        {success && <Alert variant="success">{success}</Alert>}
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

          {/* Password with show/hide */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              {/* use button type="button" so it won't submit the form */}
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: 0,
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
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
