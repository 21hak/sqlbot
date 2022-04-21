export function renameKeys(
  obj: { [key: string]: string },
  newKeys: { [key: string]: string }
) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}
