import { v4 as uuidv4 } from 'uuid';

export async function downloadContent(contentURLs: string[]): Promise<void> {
  if (contentURLs.length == 1 && contentURLs[0].endsWith('.mp4')) {
    try {
      const response = await fetch(contentURLs[0]);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const videoName = uuidv4() + ".mp4";
      link.download = videoName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(`Failed to download video:`, error);
    }
  }

  else {
    for (let i = 0; i < contentURLs.length; i++) {
      const imageToDownload = contentURLs[i];
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
}