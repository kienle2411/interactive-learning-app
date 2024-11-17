import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div>
      <Input placeholder="Username"></Input>
      <Input placeholder="Password"></Input>
      <Button>Sign In</Button>
    </div>
  );
}
