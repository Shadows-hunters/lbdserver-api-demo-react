import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function MapTab(props) {
  const { title } = props;

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography component={"span"} variant="h5">
        {title}
      </Typography>
    </Stack>
  );
}
