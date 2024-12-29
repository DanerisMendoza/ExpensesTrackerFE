import { AppShell } from '@mantine/core';
import Header from './Header';
import Main from "./Main";
import Navbar from './Navbar';
import { useDisclosure } from '@mantine/hooks';
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
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <div className='h-screen-100'>
        <Header
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
        <Navbar toggleMobile={toggleMobile} />
        <Main />
      </div>
    </AppShell>
  );
}

export default Layout;