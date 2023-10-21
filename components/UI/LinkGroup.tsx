import { useState } from 'react';
import { Group, Box, Collapse, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LinksGroupProps {
  label: string;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  close: () => void;
}

export function LinksGroup({
  label,
  initiallyOpened,
  links,
  link,
  close,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link, i) => {
    const lastIndex = links?.length! - 1;
    return (
      <Text<'a'>
        component="a"
        className={cn('!block ml-3', i === lastIndex ? 'mb-3' : '')}
        href={link.link}
        key={link.label}
        onClick={close}
      >
        {link.label}
      </Text>
    );
  });

  return (
    <>
      <UnstyledButton>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box ml="md">
              <Link
                href={link}
                onClick={close}
                className="font-semibold inline-block mb-5"
              >
                {label}
              </Link>
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
              className="!mb-5"
              onClick={() => setOpened((o) => !o)}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened} className="!flex flex-col">
          {items}
        </Collapse>
      ) : null}
    </>
  );
}
