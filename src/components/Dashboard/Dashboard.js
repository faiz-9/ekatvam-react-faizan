import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { getUserDetailApi } from "../../redux/actions/api";
import { Button } from "@mui/material";

import useAuth from "../../hooks/useAuth";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [data, setData] = React.useState([]);
  const [user, setUser] = useAuth();
  const navigate = useNavigate();

  const fetchUsers = () => {
    getUserDetailApi().then((res) => {
      setData(res);
      localStorage.setItem("users", JSON.stringify(res));
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem("users")) {
      const item = JSON.parse(localStorage.getItem("users"));
      setData(item);
    } else {
      fetchUsers();
    }
  }, []);

  const handleNewUserCreation = () => {
    navigate("/create");
  };

  const logout = () => {
    setUser(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "80%", margin: "20px auto" }}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewUserCreation}
          >
            CREATE NEW USER
          </Button>

          <Button variant="contained" onClick={logout}>
            LOGOUT
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Username</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Website</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      style={{ color: "blue", textDecoration: "none" }}
                      to={`/dashboard/${row.id}`}
                    >
                      {" "}
                      {row.name}{" "}
                    </Link>{" "}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.address.street}
                    {row?.address.suite} {""} {row?.address.city} {""}
                    {row?.address.zipcode}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">{row.website}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  );
}
