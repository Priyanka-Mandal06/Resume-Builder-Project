import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../api";
import { CircularProgress } from "@mui/material";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      dispatch(signInSuccess(res.data.user));
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!", {
        position: "top-left",
        autoClose: 1500,
      });

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "Login failed"));
      toast.error("Invalid email or password", {
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
        <h2 style={styles.heading}>Sign In</h2>

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
          {loading ? <CircularProgress size={24} /> : "Login"}
        </button>

        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/sign-up" style={{ color: "blue" }}>
            Register
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
