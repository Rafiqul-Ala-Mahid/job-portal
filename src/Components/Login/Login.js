import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";

import loginImg from "../../Image/Login.png";
import Image from "mui-image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../Auth/AuthProvider";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const { login, googleUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/jobs";
  const {
    register,
    formState: { errors },
  } = useForm();

  // const jsonWeb = (jsonUser) => {
  //   fetch("http://localhost:5001/jwt", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(jsonUser),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       localStorage.setItem("genius-token", data.token);
  //       navigate(from, { replace: true });
  //     });
  // };

   const handleLogin = (event) => {
     event.preventDefault();
     const form = event.target;
     const email = form.email.value;
     const password = form.password.value;
     form.reset()
     login(email, password)
       .then((result) => {
         const user = result.user;
         setSuccess(true);
         form.reset();
         console.log(user);
         navigate(from,{replace:true})
        //  const currentUser = {
        //    email: user.email,
        //  };

        //  jsonWeb(currentUser);
       })
       .catch((error) => {
         console.log(error);
       });
   };

   const logInWithGoogle = () => {
     googleUser()
       .then((result) => {
         const user = result.user;
         setSuccess(true);
         console.log(user);
         navigate(from, { replace: true });
        //  const currentUser = {
        //    email: user.email,
        //  };
        //  jsonWeb(currentUser);
       })
       .catch((error) => {
         console.log(error);
       });
   };
   console.log(success)
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
          src={loginImg}
          style={{
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
        <Typography variant="h4">Log In</Typography>
        <form
          onSubmit={handleLogin}
          style={{
            width: "300px",
            marginTop: "10px",
          }}
        >
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
            Log In
          </Button>
        </form>
        <Typography variant="body2" fontWeight="bold">
          New User?
          <Link
            to="/register"
            style={{
              color: "blue",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          style={{ width: "100%", marginTop: "20px" }}
          onClick={logInWithGoogle}
          startIcon={<GoogleIcon />}
        >
          Continue With Google
        </Button>
      </div>
    </Container>
  );
};

export default Login;
