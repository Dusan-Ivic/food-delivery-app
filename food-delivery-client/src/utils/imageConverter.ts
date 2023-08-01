export function convertByteArrayToBlob(
  imageData: Uint8Array | null
): string | null {
  if (!imageData) {
    return null;
  }

  const base64String = imageData.toString();
  const byteCharacters = atob(base64String.toString());
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const uint8Array = new Uint8Array(byteNumbers);
  const blob = new Blob([uint8Array], { type: "image/jpeg" });

  return URL.createObjectURL(blob);
}
