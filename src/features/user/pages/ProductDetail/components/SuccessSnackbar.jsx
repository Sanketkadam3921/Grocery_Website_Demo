import { Snackbar, Alert } from "@mui/material";

const SuccessSnackbar = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        Item added to cart successfully!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;


