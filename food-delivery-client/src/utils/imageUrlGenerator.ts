export function getFullImageUrl(imageName: string) {
  return `${import.meta.env.VITE_BACKEND_API_URL}/${
    import.meta.env.VITE_FS_NAME
  }/${imageName}`;
}
