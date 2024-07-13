import React, {useContext} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ mode, setMode }) => {
  const { loggedIn, login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  }

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "background.background",
          color: "background.text",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Flexday
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loggedIn ? (
              <Button onClick={() => {
                logout();
                navigate("/");
              }}>Log Out</Button>
            ) : (
              <div>
                <Button onClick={() => {
                  navigate("/login");
                }}>Log In</Button>
                or
                <Button onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            )}
          </Typography>
          <Switch checked={mode} onChange={() => setMode(!mode)} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
