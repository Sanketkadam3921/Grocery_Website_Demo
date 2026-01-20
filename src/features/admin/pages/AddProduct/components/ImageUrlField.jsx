import { TextField } from "@mui/material";

const ImageUrlField = ({ value, onChange, error, isMobile }) => {
  return (
    <TextField
      label="Image URL"
      name="image"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || "Enter a valid image URL"}
      required
      fullWidth
      size={isMobile ? "small" : "medium"}
    />
  );
};

export default ImageUrlField;



