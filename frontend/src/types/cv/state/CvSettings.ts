export type CvSettings = {
  layout: "SingleColumn" | "TwoColumns" | "ThreeColumns";
  style?: Record<string, string>;
};
export const CvSettingsDefault: CvSettings = {
  layout: "SingleColumn",
};
