import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IconButton, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(props.oldDescription);
  }, [props.oldDescription]);

  function changeDescription() {
    props.changeDescription(description);
    setDescription("");
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <center>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h2 style={{ color: "gray" }}>Edit description</h2>
            </Typography>
          </center>
          <div
            style={{
              display: "flex",
            }}
          >
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField
                style={{
                  marginLeft: 30,
                  marginRight: "auto",
                  marginTop: 0,
                  marginBottom: 30,
                }}
                value={description}
                onInput={(e) => setDescription(e.target.value)}
              />
            </Typography>
            <IconButton
              style={{
                marginLeft: "auto",
                marginRight: 30,
                marginTop: 0,
                marginBottom: 26,
                maxHeight: 100,
                maxWidth: 100,
              }}
              onClick={changeDescription}
            >
              <DoneIcon />
            </IconButton>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
