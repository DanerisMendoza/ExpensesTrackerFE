import { AppShell } from '@mantine/core';
import Header from './Header';
import Main from "./Main";
import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

function Layout() {

  return (
    <MantineProvider theme={theme}>

      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Header />
        <Main />
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;