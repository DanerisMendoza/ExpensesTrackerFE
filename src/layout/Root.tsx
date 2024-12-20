import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import Main from "./Main";
import Navbar from './Navbar';
function Root() {
  const [opened, { toggle }] = useDisclosure();

  return (
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
        <Header/>
      <Main/>
    </AppShell>
  );
}

export default Root;