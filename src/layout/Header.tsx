import { AppShell } from "@mantine/core";
import { ProfileDropdown } from "@components/ProfileDropdown";

export default function Header({}: {}) {
  return (
    <AppShell.Header>
      <div className="flex items-center ml-2">
        <p>LOGO</p>
      </div>
      <ProfileDropdown />
    </AppShell.Header>
  );
}
