import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import atomSidebar from '../../recoil/sidebar/atomSidebar';

const MyAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const MyAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function DrawerItem(props) {
  const [open, setOpen] = useState(false);
  
  const handleOpen = (e, isExpanded) => {
    setOpen(isExpanded ? true : false);
  };

  return (
      <MyAccordion expanded={Boolean(open & useRecoilValue(atomSidebar))} onChange={handleOpen}>
        <MyAccordionSummary sx={{pl:"0"}}>
          <IconButton>
            {props.icon}
            <div style={{width:"20px"}}/>
            <Typography> {props.title}</Typography>
          </IconButton>          
          
        </MyAccordionSummary>
        <MyAccordionDetails sx={{ width: "300px" }}>
          {props.body}
        </MyAccordionDetails>
      </MyAccordion>
  );
}
