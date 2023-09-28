import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

import { IconMenu, IconMenu2 } from '@tabler/icons-react';
import { SideMenu } from '../UI/SideBar';

export function MobileHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        className="!bg-purple-900 !w-full"
        size={'xs'}
      >
        <SideMenu />
      </Drawer>

      <Button variant="subtle" hiddenFrom="md" onClick={open}>
        <IconMenu2 color="yellow" />
      </Button>
    </>
  );
}
