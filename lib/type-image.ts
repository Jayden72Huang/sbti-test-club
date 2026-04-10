// Maps an SBTI type `code` to its local poster image under /public/types.
// Sourced from the original site (sbti.unun.dev) and mirrored locally so
// Next/Image can optimize them.
//
// Most files are .png; two exceptions (Dior-s, JOKE-R) are .jpg, and WOC!
// drops the exclamation mark in its filename. All 27 codes are covered.

const TYPE_IMAGE_MAP: Record<string, string> = {
  CTRL: '/types/CTRL.png',
  BOSS: '/types/BOSS.png',
  GOGO: '/types/GOGO.png',
  SEXY: '/types/SEXY.png',
  'LOVE-R': '/types/LOVE-R.png',
  MUM: '/types/MUM.png',
  FAKE: '/types/FAKE.png',
  OJBK: '/types/OJBK.png',
  MALO: '/types/MALO.png',
  'JOKE-R': '/types/JOKE-R.jpg',
  'WOC!': '/types/WOC.png',
  'THAN-K': '/types/THAN-K.png',
  'OH-NO': '/types/OH-NO.png',
  'ATM-er': '/types/ATM-er.png',
  'Dior-s': '/types/Dior-s.jpg',
  'THIN-K': '/types/THIN-K.png',
  SHIT: '/types/SHIT.png',
  ZZZZ: '/types/ZZZZ.png',
  POOR: '/types/POOR.png',
  MONK: '/types/MONK.png',
  IMSB: '/types/IMSB.png',
  SOLO: '/types/SOLO.png',
  FUCK: '/types/FUCK.png',
  DEAD: '/types/DEAD.png',
  IMFW: '/types/IMFW.png',
  HHHH: '/types/HHHH.png',
  DRUNK: '/types/DRUNK.png',
};

export function getTypeImage(code: string): string | null {
  return TYPE_IMAGE_MAP[code] ?? null;
}
