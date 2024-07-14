import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { userLogin } from "../../routes/Routes";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userLogin(formData);
      localStorage.setItem("token", response.data.token);
      setError({ hasError: false, message: "" });
      console.log(response.data);
      console.log("Login data submitted: ", formData);
      login(response.data.token, response.data.user);
      navigate("/");
      setFormData({ username: "", password: "" });
    } catch (error) {
      switch (error.response.status) {
        case 400:
          setError({
            hasError: true,
            message: "Username and/or password is incorrect",
          });
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error.hasError && (
          <Typography variant="h8" sx={{ color: "red" }}>
            {error.message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
