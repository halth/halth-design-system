import { buttonVariants } from '../../../packages/ui/src/components/button';
import { Card } from '../../../packages/ui/src/components/card';
import { CopyButton } from '../../../packages/ui/src/components/copy-button';
import { DownloadIcon } from '../../../packages/ui/src/components/icons';
import { Typography } from '../../../packages/ui/src/components/typography';
import { Section, type SectionProps } from './BrandPage';
import { BRAND_ASSET_GROUPS, type BrandAsset, type BrandAssetGroupId } from './brandAssetCatalog';

function Preview({ asset }: { asset: BrandAsset }) {
  return (
    <div
      className={`flex h-40 items-center justify-center overflow-hidden rounded-tile ${asset.onDark ? 'bg-forestBg' : 'bg-stone-50'} ${asset.cover ? '' : 'p-8'}`}
    >
      <img
        src={`./${asset.file}`}
        alt={asset.name}
        loading="lazy"
        className={asset.cover ? 'size-full object-cover' : 'max-h-full max-w-full object-contain'}
      />
    </div>
  );
}

function AssetCard({ asset }: { asset: BrandAsset }) {
  const fileName = asset.file.split('/').pop();
  return (
    <Card className="h-full">
      <Preview asset={asset} />
      <div className="flex flex-1 flex-col gap-1">
        <Typography as="h4" variant="subtitle" tone="brand">
          {asset.name}
        </Typography>
        <Typography variant="bodySmall" tone="brand" className="text-primary-500">
          {asset.usage}
        </Typography>
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={`./${asset.file}`} download={fileName} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          <DownloadIcon />
          Download
        </a>
        {asset.cdn && <CopyButton value={asset.cdn} label="Copy CDN URL" variant="ghost" size="sm" />}
      </div>
    </Card>
  );
}

export interface AssetSectionProps {
  group: BrandAssetGroupId;
  surface?: SectionProps['surface'];
}

/** One group of brand images as a page section: preview, usage, download and CDN URL for each. */
export function AssetSection({ group, surface }: AssetSectionProps) {
  const { title, description, assets } = BRAND_ASSET_GROUPS[group];
  return (
    <Section id={group} surface={surface} title={title} description={description}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {assets.map((asset) => (
          <AssetCard key={asset.file} asset={asset} />
        ))}
      </div>
    </Section>
  );
}
