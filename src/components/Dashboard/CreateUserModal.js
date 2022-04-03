import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as Yup from "yup";

import LocalError from "../utils/error";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { createNewUserApi } from "../../redux/actions/api";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSearch = Yup.object().shape({
  name: Yup.string().min(4, "Min 4 chars required").required("Name is needed"),
  username: Yup.string()
    .min(3, "Min 3 chars required")
    .required("Username is needed"),

  email: Yup.string()
    .required("Email is Required")
    .email("Please Enter Valid Email"),

  address: Yup.object().shape({
    city: Yup.string().required("Address is required"),
  }),

  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  website: Yup.string()
    .min(7, "Min 7 chars required")
    .required("Website is needed"),
});

export default function BasicModal() {
  const navigate = useNavigate();

  const createUser = (values) => {
    createNewUserApi(values);

    const prevUsers = JSON.parse(localStorage.getItem("users"));
    prevUsers.push(values);
    localStorage.setItem("users", JSON.stringify(prevUsers));

    navigate("/dashboard");
  };

  return (
    <div>
      <Box>
        <Container component="main">
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              address: { city: "" },
              phone: "",
              website: "",
            }}
            validationSchema={validationSearch}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              resetForm();
              setSubmitting(false);
              createUser(values);
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
                  Add a New User
                </Typography>

                <Typography>
                  <Link
                    style={{ textDecoration: "none", color: "blue" }}
                    to="/dashboard"
                  >
                    (Back)
                  </Link>
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          fullWidth
                          id="name"
                          name="name"
                          placeholder="Enter Name"
                          autoComplete="name"
                        />
                        {errors.name && touched.name && (
                          <LocalError
                            touched={touched.name}
                            error={errors.name}
                          />
                        )}
                      </Grid>
                      {/* NAME ENDS HERE    */}
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          fullWidth
                          id="username"
                          name="username"
                          placeholder="Enter Username"
                          autoComplete="username"
                        />
                        {errors.username && touched.username && (
                          <LocalError
                            touched={touched.username}
                            error={errors.username}
                          />
                        )}
                      </Grid>
                      {/* USERNAME ENDS HERE  */}
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          fullWidth
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          autoComplete="email"
                        />
                        {errors.email && touched.email && (
                          <LocalError
                            touched={touched.email}
                            error={errors.email}
                          />
                        )}
                      </Grid>
                      {/* EMAIL ENDS HERE  */}

                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address.city}
                          fullWidth
                          id="address.city"
                          name="address.city"
                          placeholder="Enter Address"
                          autoComplete="address"
                        />
                        {errors.address && touched.address && (
                          <LocalError
                            touched={touched.address.city}
                            error={errors.address.city}
                          />
                        )}
                      </Grid>
                      {/* ADDRESS ENDS HERE  */}
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          fullWidth
                          id="phone"
                          name="phone"
                          placeholder="Enter Phone Number"
                          autoComplete="phone"
                        />
                        {errors.phone && touched.phone && (
                          <LocalError
                            touched={touched.phone}
                            error={errors.phone}
                          />
                        )}
                      </Grid>
                      {/* PHONE ENDS HERE  */}
                      <Grid item xs={12}>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.website}
                          fullWidth
                          id="website"
                          name="website"
                          placeholder="Enter Website"
                          autoComplete="website"
                        />
                        {errors.website && touched.website && (
                          <LocalError
                            touched={touched.website}
                            error={errors.website}
                          />
                        )}
                      </Grid>
                      {/* WEBSITE ENDS HERE  */}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isSubmitting}
                    >
                      ADD
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
    </div>
  );
}
