import type { ComponentProps, ReactNode } from 'react';

import { Tabs as HeroTabs } from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants } from '../typography';

const TRACKS = {
  white: '*:data-[slot=tabs-list-container]:bg-white',
  // Muted-foreground is only 4.3:1 on the grey track, so unselected tabs use charcoal.
  muted:
    '*:data-[slot=tabs-list-container]:bg-secondary **:data-[slot=tabs-tab]:not-data-[selected=true]:text-charcoal',
} as const;

export type TabsTrack = keyof typeof TRACKS;

export type TabsProps = Omit<
  ComponentProps<typeof HeroTabs>,
  'variant' | 'orientation' | 'className' | 'children'
> & {
  children: ReactNode;
  /** Track colour behind the tabs. Defaults to `white`. */
  track?: TabsTrack;
  /** Stretch the track and give every tab equal width. */
  fullWidth?: boolean;
  className?: string;
};

function TabsRoot({ children, track = 'white', fullWidth = false, className, ...props }: TabsProps) {
  return (
    <HeroTabs
      {...props}
      className={cn(
        'gap-0',
        '*:data-[slot=tabs-list-container]:rounded-pill *:data-[slot=tabs-list-container]:overflow-x-auto',
        fullWidth
          ? '*:data-[slot=tabs-list-container]:w-full sm:**:data-[slot=tabs-tab]:w-auto sm:**:data-[slot=tabs-tab]:flex-1'
          : '*:data-[slot=tabs-list-container]:w-full sm:*:data-[slot=tabs-list-container]:w-fit',
        TRACKS[track],
        className
      )}
    >
      {children}
    </HeroTabs>
  );
}

export interface TabsListProps {
  children: ReactNode;
  /** Describes the tab set for screen readers, e.g. "Booking views". */
  'aria-label': string;
  className?: string;
}

function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <HeroTabs.ListContainer>
      <HeroTabs.List {...props} className={cn('gap-1 p-1 sm:gap-2 sm:p-1.5', className)}>
        {children}
      </HeroTabs.List>
    </HeroTabs.ListContainer>
  );
}

export type TabsTabProps = Omit<ComponentProps<typeof HeroTabs.Tab>, 'children' | 'className'> & {
  children: ReactNode;
  className?: string;
};

function TabsTab({ children, className, ...props }: TabsTabProps) {
  return (
    <HeroTabs.Tab
      {...props}
      className={cn(
        'h-auto w-auto flex-1 whitespace-nowrap rounded-pill px-3 py-2 text-muted-foreground not-data-[selected=true]:hover:text-primary data-[selected=true]:text-white sm:w-48 sm:flex-none sm:px-6 sm:py-2.5 sm:text-body-small',
        typographyVariants({ variant: 'caption', weight: 'medium' }),
        className
      )}
    >
      {children}
      <HeroTabs.Indicator className="rounded-pill bg-primary shadow-none" />
    </HeroTabs.Tab>
  );
}

export type TabsPanelProps = Omit<ComponentProps<typeof HeroTabs.Panel>, 'className'> & {
  className?: string;
};

function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <HeroTabs.Panel {...props} className={cn('mt-0 p-0 pt-2', className)} />;
}

/**
 * The HaltH tabs: HeroUI v3 `Tabs` as a pill segmented control.
 * Compose with `Tabs.List`, `Tabs.Tab` and `Tabs.Panel`.
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
