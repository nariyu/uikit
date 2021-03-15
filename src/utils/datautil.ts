export const byteArrayToText = (buffer: BlobPart) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const blob = new Blob([buffer], { type: 'text/plain' });
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      });
      reader.addEventListener('error', () => {
        reject(reader.result);
      });
      reader.readAsText(blob, 'utf8');
    } catch (error) {
      reject(error);
    }
  });
};
