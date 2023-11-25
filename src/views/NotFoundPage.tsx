import { Stack, Typography } from "@mui/material";
import HomeButton from "../components/common/HomeButton";

const NotFoundPage = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>
      <Typography fontSize={20} color="GrayText">
        Page not found
      </Typography>
      <HomeButton />
    </Stack>
  );
};

export default NotFoundPage;
