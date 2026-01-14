import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../api";
import { CircularProgress } from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();

  // ✅ CHANGED: name -> username
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/auth/register`,
        { username, email, password },
        {
          timeout: 15000, // ✅ handle Render wake-up
        }
      );

      toast.success("Registration successful! Please login.", {
        position: "top-left",
        autoClose: 1500,
      });

      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-left",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Create Account</h2>

        {/* ✅ CHANGED INPUT */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Register"}
        </button>

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/sign-in" style={{ color: "blue" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  },
  form: {
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    border: "1px solid #ccc",
    padding: "25px",
    borderRadius: "8px",
  },
  heading: { textAlign: "center" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer" },
};
