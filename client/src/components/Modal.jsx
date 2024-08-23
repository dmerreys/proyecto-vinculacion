import PropTypes from "prop-types";
import { Modal as MuiModal, Box, Typography, Button } from "@mui/material";

function Modal({ children, onClose }) {
  return (
    <MuiModal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 24,
          maxWidth: "80%",
          maxHeight: "80%",
          overflowY: "auto",
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h3">
          Detalles del Proyecto
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
