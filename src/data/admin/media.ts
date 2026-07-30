import type { AdminMedia } from '@/types/admin'

export const adminMediaItems: AdminMedia[] = Array.from({ length: 30 }, (_, i) => ({
  id: `med-${String(i + 1).padStart(3, '0')}`,
  filename: `image-${i + 1}.jpg`,
  title: `Media Item ${i + 1}`,
  alt: `Description for media item ${i + 1}`,
  caption: i % 3 === 0 ? `A beautiful caption for image ${i + 1}` : undefined,
  category: i < 20 ? 'image' : i < 26 ? 'logo' : 'icon',
  src: `/placeholders/image.svg`,
  thumbnail: `/placeholders/image.svg`,
  width: 800,
  height: 1000,
  fileSize: Math.floor(Math.random() * 5000) + 500,
  tags: [['products', 'sarees'], ['lehengas', 'bridal'], ['collections', 'featured'], ['journal', 'articles'], ['logos', 'brand']][i % 5],
  folder: i < 15 ? '/products' : i < 22 ? '/collections' : '/journal',
  createdAt: new Date(Date.now() - (30 - i) * 86400000).toISOString(),
}))

export function getAdminMediaItems(): AdminMedia[] {
  return adminMediaItems
}
