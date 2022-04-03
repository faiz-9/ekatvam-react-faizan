import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LocalError from "../utils/error";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const theme = createTheme();

const validationSearch = Yup.object().shape({
  name: Yup.string().min(4, "Min 4 chars required").required("Name is needed"),
  email: Yup.string()
    .required("Email is Required")
    .email("Please Enter Valid Email"),
  password: Yup.string()
    .min(4, "Min 4 chars required")
    .required("Enter Password"),
});

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSearch}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            navigate("/login");
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
            swal("Success!", "Sign up successfull", "success");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <LocalError
                          touched={touched.name}
                          error={errors.name}
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        fullWidth
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        autoComplete="email"
                      />
                      {errors.email && touched.email && (
                        <LocalError
                          touched={touched.email}
                          error={errors.email}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        fullWidth
                        id="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Enter Your Password"
                      />
                      {errors.password && touched.password && (
                        <LocalError
                          touched={touched.password}
                          error={errors.password}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
}
