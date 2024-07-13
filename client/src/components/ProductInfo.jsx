import React, { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {UPCcontext} from "./contexts/UPCcontext";

const ProductInfo = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    upc ? navigate("/product-info") : alert("Please enter a UPC number");
  }

  const {upc, setUpc} = useContext(UPCcontext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 5,
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Link to="/scanner" style={{ textDecoration: "none", color: "inherit" }}>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ display: "inline-flex", width: "100%" }}
        >
          Open Camera
        </Button>
      </Link>
      <Divider />
    <TextField
        label="Enter UPC Number:"
        variant="outlined"
        fullWidth
        required
        onChange={(e) => {
          e.preventDefault();
          setUpc(e.target.value);
        }}
      />
      <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
        Search
      </Button>
      <Divider />
      <Button variant="contained" color="primary" size="large">
        Upload File
      </Button>
    </Box>
  );
};

export default ProductInfo;
