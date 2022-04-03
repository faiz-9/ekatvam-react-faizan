import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailApiById } from "../../redux/actions/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const DashboardDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentUserDetails, setCurrentUserDetails] = useState("");
  const fetchUsers = () => {
    getUserDetailApiById(id)
      .then((res) => {
        setCurrentUserDetails(res);
        setLoading(false);
      })
      .catch((error) => {
        navigate("/dashboard");
      });
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          <div style={{ width: "60%", margin: "50px auto" }}>
            <Typography
              sx={{ marginBottom: "15px", color: "green" }}
              variant="h5"
            >
              Details of User - {id}
            </Typography>
            <Card sx={{ minWidth: 275, background: "", color: "" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Name - {currentUserDetails.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Username - {currentUserDetails.username}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email -{currentUserDetails.email}
                </Typography>
                <Typography variant="body2">
                  Address - {currentUserDetails.address.city}
                </Typography>

                <Typography variant="body2">
                  Website - {currentUserDetails.website}
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  GO BACK
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardDetails;
