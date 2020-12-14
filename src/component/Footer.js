import React from "react";
import { Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a
        style={{ color: "inherit", textDecoration: "none" }}
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.facebook.com/biplab.acharya.142"
      >
        {"Biplab Acharya "}
      </a>

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
