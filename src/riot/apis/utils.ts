import { Platform, Region } from './enums'

export const regionPlatformMap: Record<Region, Platform[]> = {
  [Region.AMERICAS]: [
    Platform.BR,
    Platform.LAN,
    Platform.LAS,
    Platform.NA,
    Platform.OCE,
  ],
  [Region.ASIA]: [Platform.JP, Platform.KR],
  [Region.EUROPE]: [Platform.EUNE, Platform.EUW, Platform.RU, Platform.TR],
}

export function mapPlatformToRegion(platform: Platform) {
  for (const [region, platforms] of Object.entries(regionPlatformMap)) {
    if (platforms.includes(platform)) {
      return region as Region
    }
  }
  return Region.AMERICAS
}
