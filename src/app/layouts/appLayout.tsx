import { AppHeader } from "@/widgets/header/header";
import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <AppHeader />
      <Container className="container mx-auto py-4 h-[200vh]">
        <Outlet />
      </Container>
    </div>
  );
}
