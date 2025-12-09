import { Trophy, Smartphone, Star, Gem, Bomb, Candy, Receipt, ReceiptCent, Gift } from 'lucide-react';

export const MAX_ITEMS = 30;

export const ITEM_TYPES = {
  A: { label: 'Freebies LooCo', color: '#8D6E63', icon: Gift, maxCount: 999 }, // Coklat Muda
  B: { label: 'Cashback 2k', color: '#6D4C41', icon: Receipt, maxCount: 999 }, // Coklat Sedang
  C: { label: 'Cashback 5k', color: '#543931', icon: ReceiptCent, maxCount: 999 }, // Coklat Tua
  ZONK: { label: 'ZONK', color: '#212121', icon: Bomb, maxCount: 999 }, // Hitam/Gelap (Khusus)
};
