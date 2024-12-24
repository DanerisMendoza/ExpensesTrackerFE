import { AppShell } from "@mantine/core";
import { useNavigate } from "react-router-dom";
export default function Header({ }: {}) {
  const navigate = useNavigate();
  return (
    <AppShell.Header>
      <div className=" w-full flex items-center justify-between ml-2">
        <p className="cursor-pointer" onClick={()=>navigate("/")}>LOGO</p>
        <div className="flex gap-4 p-2">
          <p className="cursor-pointer"  onClick={()=>navigate("/login")}>Login</p>
          <p>|</p>
          <p className="cursor-pointer" onClick={()=>navigate("/register")}>Register</p>
        </div>
      </div>
    </AppShell.Header>
  );
}
