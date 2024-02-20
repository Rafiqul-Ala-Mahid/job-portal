import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { AuthContext} from "../Auth/AuthProvider";
import Img from "../../Image/Signup.png";
import Image from "mui-image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const { createUser, googleUser } = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/jobs";
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    form.reset();
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => console.error(err));
  };

  const handleWithGoogle = () => {
    googleUser()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      sx={{
        marginTop: "20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <div style={{ width: "50%" }}>
        <Image
          src={Img}
          style={{
            marginTop: "50px",
            width: "500px",
            height: "500px",
          }}
        />
      </div>
      <div
        style={{
          marginTop: "100px",
          marginLeft: "100px",
        }}
      >
        <Typography variant="h4">Signup</Typography>
        <form
          onSubmit={handleSignUp}
          style={{
            width: "300px",
            marginTop: "10px",
          }}
        >
          <TextField
            {...register("name", { required: true })}
            label="Name"
            fullWidth
            style={{ marginTop: "10px" }}
            error={errors.name ? true : false}
            helperText={errors.name ? "Name is required" : ""}
          />
          <TextField
            {...register("username", { required: true })}
            label="Username"
            fullWidth
            style={{ marginTop: "10px" }}
            error={errors.username ? true : false}
            helperText={errors.username ? "Username is required" : ""}
          />
          <TextField
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            label="Email"
            fullWidth
            style={{ marginTop: "10px" }}
            error={errors.email ? true : false}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            {...register("password", { required: true, minLength: 6 })}
            label="Password"
            type="password"
            fullWidth
            style={{ marginTop: "10px" }}
            error={errors.password ? true : false}
            helperText={
              errors.password ? "Password must be at least 6 characters" : ""
            }
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" fontWeight="bold">
          Already have an account?
          <Link
            to="/login"
            style={{
              color: "blue",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          style={{ width: "100%", marginTop: "20px" }}
          onClick={handleWithGoogle}
          startIcon={<GoogleIcon />}
        >
          Continue With Google
        </Button>
      </div>
    </Container>
  );
};

export default Signup;
