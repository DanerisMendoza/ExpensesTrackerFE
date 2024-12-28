import { AppShell } from '@mantine/core';
import Header from './Header';
import Main from "./Main";

function Layout() {

  return (
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Header />
        <Main />
      </AppShell>
  );
}

export default Layout;