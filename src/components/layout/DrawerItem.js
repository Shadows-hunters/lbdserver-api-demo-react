import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import React from "react";

export default function DrawerItem(props) {
  return (
    <div>
      <ListItemIcon sx={{ ml: "15px" }}>
        {props.icon}
      </ListItemIcon>
      <Accordion sx={{ display: "inline-block"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ width: "300px" }}>
          {props.body}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
