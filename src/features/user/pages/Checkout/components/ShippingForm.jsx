import { Box, TextField } from "@mui/material";

function ShippingForm({ formData, errors, handleInputChange }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          inputProps={{ maxLength: 10 }}
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={!!errors.address}
          helperText={errors.address}
          required
          multiline
          rows={3}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          error={!!errors.city}
          helperText={errors.city}
          required
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
        <TextField
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          error={!!errors.state}
          helperText={errors.state}
          required
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
        }}
      >
        <TextField
          fullWidth
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          error={!!errors.pincode}
          helperText={errors.pincode}
          required
          inputProps={{ maxLength: 6 }}
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
        <TextField
          fullWidth
          label="Landmark (Optional)"
          name="landmark"
          value={formData.landmark}
          onChange={handleInputChange}
          sx={{ flex: { xs: "1 1 100%", sm: "1 1 50%" } }}
        />
      </Box>
    </Box>
  );
}

export default ShippingForm;

