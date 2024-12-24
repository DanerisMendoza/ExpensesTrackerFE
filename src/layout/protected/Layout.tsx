import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import Header from './Header';
import Main from "./Main";
import Navbar from './Navbar';
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider } from "@mantine/core";
import { theme } from "@src/theme";
import { useEffect } from 'react';
import { GlobalStore } from '@src/utils/GlobalStore';

function Layout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { set_is_mobile } = GlobalStore()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        set_is_mobile(true);
      } else {
        set_is_mobile(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener to track resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MantineProvider theme={theme}>

      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <Header
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
        <Navbar/>
        <Main />
      </AppShell>
    </MantineProvider>
  );
}

export default Layout;