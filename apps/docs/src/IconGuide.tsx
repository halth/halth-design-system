import type { ComponentType } from 'react';

import * as Icons from '../../../packages/ui/src/components/icons';
import { Typography } from '../../../packages/ui/src/components/typography';

type IconComponent = ComponentType<{ className?: string }>;

const ICON_LOOKUP = Icons as unknown as Record<string, IconComponent>;

/** The icon set by job, with where HaltH uses each one when it isn't obvious from the name. */
const ICON_GROUPS: { title: string; icons: [name: string, use?: string][] }[] = [
  {
    title: 'Status and feedback',
    icons: [
      ['CheckIcon', 'Paid, verified'],
      ['CircleCheckIcon'],
      ['CircleXIcon'],
      ['AlertCircleIcon', 'Errors'],
      ['AlertTriangleIcon', 'Warnings'],
      ['InfoIcon'],
      ['HelpCircleIcon'],
      ['ClockIcon', 'Awaiting payment'],
      ['BanIcon'],
      ['BadgeCheckIcon'],
      ['ShieldCheckIcon'],
      ['ShieldIcon'],
      ['LockIcon'],
    ],
  },
  {
    title: 'Actions',
    icons: [
      ['PlusIcon', 'Add'],
      ['MinusIcon'],
      ['XIcon', 'Remove or dismiss'],
      ['PencilIcon', 'Edit'],
      ['Trash2Icon', 'Delete'],
      ['DeleteIcon', 'Backspace'],
      ['CopyIcon'],
      ['ShareIcon'],
      ['PaperPlaneIcon', 'Invite and send'],
      ['DownloadIcon'],
      ['UploadIcon'],
      ['PrinterIcon'],
      ['SearchIcon'],
      ['RotateCcwIcon'],
      ['RepeatIcon'],
      ['PauseIcon'],
      ['EllipsisVerticalIcon', 'More options'],
      ['GripVerticalIcon', 'Drag'],
      ['MenuIcon'],
    ],
  },
  {
    title: 'Navigation',
    icons: [
      ['ChevronLeftIcon'],
      ['ChevronRightIcon', 'Opens something'],
      ['ChevronDownIcon'],
      ['ChevronUpDownIcon'],
      ['ArrowLeftIcon'],
      ['ArrowLeftRightIcon'],
      ['ExternalLinkIcon'],
      ['LinkIcon'],
    ],
  },
  {
    title: 'People and places',
    icons: [
      ['UserIcon', 'A person without a photo'],
      ['UsersIcon'],
      ['UserXIcon'],
      ['Building2Icon'],
      ['HospitalIcon'],
      ['StethoscopeIcon'],
      ['HeartPulseIcon'],
      ['HardHatIcon'],
      ['AwardIcon'],
      ['MapPinIcon'],
      ['MapPinOffIcon'],
      ['GlobeIcon'],
    ],
  },
  {
    title: 'Payments',
    icons: [
      ['CreditCardIcon', 'Payment card, and the card logo fallback'],
      ['BanknoteIcon'],
      ['BanknoteArrowUpIcon', 'Funding available'],
      ['WalletIcon'],
      ['NfcIcon', 'Tap to pay'],
      ['QrCodeIcon'],
      ['PercentIcon'],
      ['TagIcon'],
      ['TicketIcon'],
    ],
  },
  {
    title: 'Communication',
    icons: [['MailIcon'], ['PhoneIcon'], ['SmartphoneIcon'], ['MessageSquareIcon'], ['BellIcon'], ['MegaphoneIcon']],
  },
  {
    title: 'Content and settings',
    icons: [
      ['CalendarIcon', 'Bookings'],
      ['FileTextIcon'],
      ['ClipboardListIcon'],
      ['ImageIcon'],
      ['VideoIcon'],
      ['CameraIcon'],
      ['SettingsIcon'],
      ['KeyRoundIcon'],
      ['PlugIcon'],
      ['PuzzleIcon'],
      ['ZapIcon'],
      ['SparklesIcon'],
    ],
  },
];

/** Literal classes so Tailwind generates them. */
const ICON_SIZES = [
  { token: '--icon-xs', px: 12, className: 'size-(--icon-xs)', use: 'The avatar verified badge' },
  { token: '--icon-sm', px: 14, className: 'size-(--icon-sm)', use: 'Chips and attribute chips' },
  {
    token: '--icon-md',
    px: 16,
    className: 'size-(--icon-md)',
    use: 'Next to text, the dropdown chevron, the card logo fallback, icons inside an Input and the small Spinner',
  },
  { token: '--icon-lg', px: 20, className: 'size-(--icon-lg)', use: 'The modal close button and the Alert icon' },
  { token: '--icon-xl', px: 24, className: 'size-(--icon-xl)', use: 'Buttons, the card chevron, the Spinner and EmptyState icons' },
  { token: '--icon-2xl', px: 32, className: 'size-(--icon-2xl)', use: 'The large Spinner, and EmptyState icons from sm up' },
];

/** Every icon by job, drawn with its name and, where it matters, what HaltH uses it for. */
export function IconGroups() {
  return (
    <div className="flex flex-col gap-6">
      {ICON_GROUPS.map(({ title, icons }) => (
        <div key={title} className="flex flex-col gap-3">
          <Typography as="h4" variant="subtitle" tone="brand">
            {title}
          </Typography>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {icons.map(([name, use]) => {
              const Icon = ICON_LOOKUP[name];
              return (
                <div key={name} className="flex items-center gap-3 rounded-tile bg-stone-50 px-3 py-2.5">
                  <Icon className="size-(--icon-xl) shrink-0 text-primary" />
                  <div className="flex min-w-0 flex-col">
                    <Typography as="span" variant="bodySmall" weight="medium" tone="brand" className="truncate">
                      {name}
                    </Typography>
                    {use && (
                      <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
                        {use}
                      </Typography>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The icon size tokens, each drawn at its size with where it's used. */
export function IconSizes() {
  return (
    <div className="flex flex-col gap-2">
      {ICON_SIZES.map(({ token, px, className, use }) => (
        <div key={token} className="flex items-center gap-4 rounded-tile bg-stone-50 px-3 py-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center">
            <Icons.CalendarIcon className={`${className} text-primary`} />
          </div>
          <div className="flex min-w-0 flex-col">
            <Typography as="span" variant="bodySmall" weight="medium" tone="brand">
              {`size-(${token}) · ${px}px`}
            </Typography>
            <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
              {use}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
