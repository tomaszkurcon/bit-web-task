import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const MainLayout = () => {

  return (
    <Container sx={{py:6}}>
      <Outlet />
    </Container>
  );
};

export default MainLayout;
