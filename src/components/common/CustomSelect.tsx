import { TextField, TextFieldProps } from "@mui/material";

const CustomSelect = ({ children, ...props }: TextFieldProps) => {
  return (
    <TextField
      select
      fullWidth
      sx={{ mt: 4, mb: 2, width: "200px", maxWidth: "100%" }}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default CustomSelect;
