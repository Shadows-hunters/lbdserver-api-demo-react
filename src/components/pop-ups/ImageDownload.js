import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useRecoilState } from "recoil";
import { atomImageDownload } from "../../recoil/pop-ups";

export default function ImageDownload() {
  const [open, setOpen] = useRecoilState(atomImageDownload);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDownload = () => {
    saveImage();
    setOpen(false);
  };

  const [name, setName] = React.useState("eee");
  const updateName = (e) => {
    setName(e.target.value);
  };

  function saveImage() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream"
    );
    a.download = name + ".png";
    a.click();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Download view as .png"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          value={name}
          onChange={updateName}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDownload} color="success" variant="contained">
          Download
        </Button>
        <Button onClick={handleClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
}
