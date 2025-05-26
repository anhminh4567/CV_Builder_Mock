import { CvSettings } from "../types/CvModificationSettings";

async function getCvSettings(
  userId: string,
  cv_id: string
): Promise<CvSettings> {
  const key = `cv_settings_${userId}_${cv_id}`;
  const existingSettings = localStorage.getItem(key);
  if (existingSettings) {
    return JSON.parse(existingSettings) as CvSettings;
  } else {
    const defaultSettings: CvSettings = {
      showGrid: false,
      currentZoom: 1,
    };
    localStorage.setItem(key, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
}
async function setCvSettings(
  userId: string,
  cv_id: string,
  settings: CvSettings
): Promise<void> {
  const key = `cv_settings_${userId}_${cv_id}`;
  const cvJson = JSON.stringify(settings);
  localStorage.setItem(key, cvJson);
}
export const localService = {
  getCvSettings: getCvSettings,
  setCvSettings: setCvSettings,
};
