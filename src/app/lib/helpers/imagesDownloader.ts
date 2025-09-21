import { v4 as uuidv4 } from 'uuid';

export async function downloadImages(images: string[]): Promise<void> {
  for (let i = 0; i < images.length; i++) {
    const imageToDownload = images[i];
    try {
      const response = await fetch(imageToDownload);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const imgName = uuidv4() + ".jpg";
      link.download = imgName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      await new Promise(resolve => setTimeout(resolve, 1500)); // wait a bit before next download

    } catch (error) {
      console.error(`Failed to download image ${i + 1}:`, error);
    }
  }
}