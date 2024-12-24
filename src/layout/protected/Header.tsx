import { AppShell, Burger, Group } from "@mantine/core";
import { ProfileDropdown } from "@src/components/ProfileDropdown";
import { GlobalStore } from '@src/utils/GlobalStore';
interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

const Header: React.FC<HeaderProps> = ({ mobileOpened, desktopOpened, toggleMobile, toggleDesktop }) => {
  const { is_mobile } = GlobalStore()
  return (
    <AppShell.Header>
      <div className="flex justify-between w-full">

        <Group h="100%" className="sm:pl-6 pl-4 font-semibold text-2xl cursor-pointer">
          {is_mobile ? (<p onClick={toggleMobile} >Expenses Tracker</p>) : (
            <p onClick={toggleDesktop} >Expenses Tracker</p>
          )}
        </Group>
        <ProfileDropdown />
      </div>
    </AppShell.Header>
  );
}

export default Header;