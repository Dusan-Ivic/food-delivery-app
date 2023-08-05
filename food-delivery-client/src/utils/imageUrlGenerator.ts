export function getFullImageUrl(imageName: string) {
  return `${import.meta.env.VITE_API_URL}/${
    import.meta.env.VITE_FS_NAME
  }/${imageName}`;
}
