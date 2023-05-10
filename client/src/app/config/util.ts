export const shortenName = (name: string) => {
  if (!name || !name.length) return "";
  return name.length < 10
    ? name.length
    : name.slice(0, 4) + "..." + name.slice(-3);
};
