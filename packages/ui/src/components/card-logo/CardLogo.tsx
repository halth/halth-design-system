'use client';

import { useState } from 'react';

import { cn } from '../../lib/cn';
import { CreditCardIcon } from '../icons';

/** Default `baseUrl` for `CardLogo`: the HaltH CDN's logo folder. */
export const CARD_LOGO_BASE_URL = 'https://static.halth.com/assets/logo';

/** Matches the API's `WalletCardType`. */
export type CardLogoType = 'payment_method' | 'health_fund_card' | 'medicare_card' | 'dva_card';

const LOGOS = {
  payment_method: { folder: 'payment-card', className: 'h-4 w-6' },
  health_fund_card: { folder: 'health-fund-card', className: 'h-5 w-8' },
  medicare_card: { folder: 'medicare-card', className: 'h-4 w-5' },
  dva_card: { folder: 'gov', className: 'h-4 w-5' },
} satisfies Record<CardLogoType, { folder: string; className: string }>;

export interface CardLogoProps {
  type: CardLogoType;
  /**
   * Payment card brand (`paymentMethod.brand`, e.g. `visa`) or health fund ID
   * (`healthFundCard.healthFundId`, e.g. `BUPA`). Optional for Medicare.
   */
  brand?: string;
  /**
   * Any image URL to show instead of the CDN lookup, e.g. a custom logo or a photo.
   * `type` still sets the size, and the card icon still shows if it fails to load.
   */
  src?: string;
  /**
   * Where `type` and `brand` logos are loaded from, as `<baseUrl>/<folder>/<brand>.png`.
   * Defaults to `CARD_LOGO_BASE_URL` (`https://static.halth.com/assets/logo`).
   */
  baseUrl?: string;
  /** Empty by default, since the logo usually sits inside a labelled control. */
  alt?: string;
  className?: string;
}

/**
 * Wallet card logo, sized for an `AttributeChip`. Loads from the HaltH CDN by `type` and `brand`,
 * or from any URL passed as `src`. Falls back to a card icon.
 */
export function CardLogo({
  type,
  brand,
  src: srcProp,
  baseUrl = CARD_LOGO_BASE_URL,
  alt = '',
  className,
}: CardLogoProps) {
  const [hasError, setHasError] = useState(false);
  const { folder, className: sizeClassName } = LOGOS[type];
  const src =
    srcProp ??
    (type === 'medicare_card' && !brand
      ? `${baseUrl}/gov/medicare-logo.svg`
      : brand && `${baseUrl}/${folder}/${brand}.png`);

  if (!src || hasError) {
    return <CreditCardIcon className={cn('size-(--icon-md) text-muted-foreground', className)} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn('object-contain', sizeClassName, className)}
    />
  );
}
