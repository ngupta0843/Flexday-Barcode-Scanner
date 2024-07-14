import { Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">404 Not Found</Typography>
      <Typography variant="h6">
        The link you requested does not exist.
      </Typography>
    </div>
  );
};

export default NotFound;
