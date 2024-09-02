import { Info } from "@/constants/definitions";
import app from '@/app.json';

export function info(): Info {
  return {
    version: app.expo.version,
  }
}
