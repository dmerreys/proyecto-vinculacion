import PropTypes from "prop-types";
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal as MuiModal, Box, Typography, Button } from "@mui/material";

function ConfirmDeleteModal({ projectId, onClose, onConfirm, loading }) {
  return (
    <MuiModal
      open={true}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
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
        <Typography id="delete-modal-title" variant="h6" component="h3">
          Eliminar Proyecto
        </Typography>
        <Box id="delete-modal-description" sx={{ mt: 2 }}>
          <Typography variant="body1">
            ¿Estás seguro de que deseas eliminar el proyecto {projectId}?
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="success"
            onClick={() => onConfirm(projectId)}
          >
            Eliminar
          </LoadingButton>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </MuiModal> 
  );
}

ConfirmDeleteModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConfirmDeleteModal;
