import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <Button
      variant="outlined"
      component={Link}
      to={`/`}
      sx={{ textTransform: "none", mt: 3 }}
    >
      Get back to home page
    </Button>
  );
};

export default HomeButton;
