export const lazyPage = (loader, name) => async () => {
  const mod = await loader()
  return { Component: mod[name] }
}
