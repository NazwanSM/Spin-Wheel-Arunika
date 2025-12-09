import { Trophy, Smartphone, Star, Gem, Bomb, Candy, Receipt, ReceiptCent, Gift } from 'lucide-react';

export const MAX_ITEMS = 30;

export const ITEM_TYPES = {
  A: { label: 'Doorprize', color: '#DBD6C4', icon: Gift, maxCount: 999 }, 
  B: { label: 'Cashback 2k', color: '#BEB49F', icon: Receipt, maxCount: 999 }, 
  C: { label: 'Diskon 10%', color: '#A1937C', icon: ReceiptCent, maxCount: 999 },
  D: { label: 'Coklat', color: '#907F66', icon: Candy, maxCount: 999 },
  ZONK: { label: 'ZONK', color: '#33291F', icon: Bomb, maxCount: 999 },
};
