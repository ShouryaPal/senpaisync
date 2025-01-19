import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Homepage,
});

function Homepage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/welcome" });
  };

  return <Button onClick={handleClick}>Log In</Button>;
}
