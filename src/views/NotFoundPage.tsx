import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>
      <Typography fontSize={20} color="GrayText">
        Page not found
      </Typography>
      <Button
        variant="outlined"
        component={Link}
        to={`/`}
        sx={{ textTransform: "none", mt: 3 }}
      >
        Get back to home page
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
