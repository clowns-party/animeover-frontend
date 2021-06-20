export const nativeReload = () => {
  setTimeout(() => {
    process.browser && window.location.reload();
  }, 0);
};
