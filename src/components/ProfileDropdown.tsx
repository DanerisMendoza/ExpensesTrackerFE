//--- Mantine Modules
import { Menu, Avatar, rem, Flex } from "@mantine/core";
//--- Tabler Icons
import {
  IconUserCircle,
  IconShieldLock,
  IconLogout,
} from "@tabler/icons-react";
import avatar from "@assets/avatar.png";
import { useNavigate } from "react-router-dom";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      radius={10}
      transitionProps={{ transition: "fade-down", duration: 100 }}
    >
      <Menu.Target>
        <Avatar
          src={avatar}
          alt="it's me"
          className="cursor-pointer"
          size="lg"
        />
      </Menu.Target>

      <Menu.Dropdown className="pt-5 pb-2 px-2">
        <Flex
          mih={50}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <p className="custom-gradient bg-clip-text text-transparent font-semibold poppins text-2xl">
            Welcome, User!
          </p>
        </Flex>
        <Menu.Item
          className="poppins"
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconUserCircle
              visibility="sm"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          Profile
        </Menu.Item>

        <Menu.Item
          fw={500}
          className="poppins"
          color="#6d6d6d"
          leftSection={
            <IconShieldLock style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Change Password
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          color="#6d6d6d"
          leftSection={
            <IconLogout style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={() => {
            navigate("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
