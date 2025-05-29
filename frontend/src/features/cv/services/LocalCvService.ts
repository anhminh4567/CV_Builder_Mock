import { Cv } from "@/types/cv/state/Cv";
import { CvSettings } from "../types/CvModificationSettings";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

async function exportToPdf(htmlPaper: HTMLDivElement, cv: Cv): Promise<void> {
  // This function is a placeholder for PDF export logic
  console.log("Exporting to PDF", htmlPaper);
  try {
    // Use html2canvas to render the content div into a canvas
    const canvas = await html2canvas(htmlPaper, {
      scale: 2, // Increase scale for better resolution in PDF
      useCORS: true, // Enable CORS if your images are from different origins
      logging: true, // Enable logging for debugging
    });
    // Get the image data from the canvas
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    const pdf = new jsPDF("portrait", "mm", "a4");
    let position = 0;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // If content is longer than one page, add new pages
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    let now = new Date();
    const dateString = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const fileName = cv.name || "cv_" + dateString;
    pdf.save(`${fileName}.pdf`);
    Promise.resolve();
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    Promise.reject(error);
  }
}

export const localService = {
  getCvSettings: getCvSettings,
  setCvSettings: setCvSettings,
  exportToPdf: exportToPdf,
};
