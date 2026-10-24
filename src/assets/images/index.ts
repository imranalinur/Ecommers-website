import heroImage from './hero_bangladesh_store_1792822458300.jpg';
import panjabiImage from './product_panjabi_premium_1792822457840.jpg';
import smartwatchImage from './product_smartwatch_gadget_1792822458246.jpg';
import walletImage from './product_leather_wallet_1792822458880.jpg';

export const STORE_IMAGES = {
  hero: heroImage,
  panjabi: panjabiImage,
  smartwatch: smartwatchImage,
  wallet: walletImage,
};

export function resolveStoreImage(path: string | undefined): string {
  if (!path) return STORE_IMAGES.hero;
  if (path.includes('product_panjabi') || path.includes('panjabi')) return STORE_IMAGES.panjabi;
  if (path.includes('product_smartwatch') || path.includes('smartwatch')) return STORE_IMAGES.smartwatch;
  if (path.includes('product_leather') || path.includes('wallet')) return STORE_IMAGES.wallet;
  if (path.includes('hero_bangladesh') || path.includes('hero')) return STORE_IMAGES.hero;
  return path;
}
