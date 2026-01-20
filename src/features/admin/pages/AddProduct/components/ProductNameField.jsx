import { TextField } from "@mui/material";

const ProductNameField = ({ value, onChange, error, isMobile }) => {
  return (
    <TextField
      label="Product Name"
      name="name"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      required
      fullWidth
      size={isMobile ? "small" : "medium"}
    />
  );
};

export default ProductNameField;



