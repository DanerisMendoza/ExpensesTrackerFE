import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import Main from "./Main";
import Navbar from './Navbar';

import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>

      <AppShell
        header={{ height: 60 }}
        // navbar={{
        //   width: 300,
        //   breakpoint: 'sm',
        //   collapsed: { mobile: !opened },
        // }}
        padding="md"
      >
        {/* <Navbar/> */}
        <Header />
        <Main />
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;