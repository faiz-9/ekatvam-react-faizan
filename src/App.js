import SignUp from "./components/Home/Signup";
import Login from "./components/Home/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardDetails from "./components/Dashboard/DashboardDetails";
import BasicModal from "./components/Dashboard/CreateUserModal";
import NotFound from "./components/utils/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(true);
    }
  }, [user]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <BrowserRouter>
          <Routes>
            {!user && (
              <>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </>
            )}

            {user && (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<DashboardDetails />} />
                <Route path="/create" element={<BasicModal />} />
              </>
            )}

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
