import {
  ThemeProvider,
  createTheme,
  Grid,
  Box,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductInfo from "./components/ProductInfo";
import Chatbot from "./components/Chatbot";
import History from "./components/History";
import Camera from "./components/Camera";
import MoreInfo from "./components/MoreInfo";
import { ConversationsProvider } from "./ConversationsContext";
import { UPCprovider } from "./components/contexts/UPCcontext";
import { BarcodeProvider } from "./components/contexts/Barcodecontext";
import { UserProvider } from "./components/contexts/UserContext";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  const [mode, setMode] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [camera, setCamera] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    palette: {
      mode: mode ? "dark" : "light",
      background: {
        default: mode ? "#303030" : "#e0e0e0",
        paper: mode ? "#28242C" : "#ffffff",
        component: mode ? "#18141C" : "#F5F5F5",
        background: mode ? "#18141C" : "#E9EAEF",
        text: mode ? "#ffffff" : "#000000",
      },
      primary: {
        main: "#DF552E",
      },
      secondary: {
        main: "#DF552E",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& fieldset": {
              borderColor: "transparent",
            },
            borderRadius: "14px",
            backgroundColor: mode ? "#18141C" : "#F5F5F5",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: mode ? "#18141C" : "#F5F5F5",
            },
            borderRadius: "14px",
          },
        },
      },
    },
  });

  return (
    <Router>
      <UserProvider>
        <BarcodeProvider>
          <UPCprovider>
            <ConversationsProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar mode={mode} setMode={setMode} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexGrow: 1,
                    padding: 3,
                    height: "calc(100vh - 64px)",
                    overflow: "auto",
                    backgroundColor: "background.background",
                  }}
                >
                  <Routes>
                    <Route path="/" element={<ProtectedRoute />}>
                      <Route
                        index
                        element={
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid
                              item
                              xs={4}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Box sx={{ width: "50vh" }}>
                                <ProductInfo />
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={8}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Box sx={{ width: "80%" }}>
                                <Chatbot />
                              </Box>
                            </Grid>
                          </Grid>
                        }
                      />
                    </Route>
                    <Route path="/" element={<ProtectedRoute />}>
                      <Route path="/history" element={<History />} />
                      <Route path="/product-info" element={<MoreInfo />} />
                      <Route
                        path="/scanner"
                        element={
                          <Camera
                            productInfo={productInfo}
                            setProductInfo={setProductInfo}
                            camera={camera}
                            setCamera={setCamera}
                          />
                        }
                      />
                    </Route>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Box>
              </ThemeProvider>
            </ConversationsProvider>
          </UPCprovider>
        </BarcodeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
