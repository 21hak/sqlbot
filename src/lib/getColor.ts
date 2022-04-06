const BASE_COLOR = ["FFFFFF", "0060ff"];

export default function getColors(ratio: number) {
  const hex = function (x: number) {
    const str = x.toString(16);
    return str.length == 1 ? "0" + str : str;
  };

  const r = Math.ceil(
    parseInt(BASE_COLOR[0].substring(0, 2), 16) * ratio +
      parseInt(BASE_COLOR[1].substring(0, 2), 16) * (1 - ratio)
  );
  const g = Math.ceil(
    parseInt(BASE_COLOR[0].substring(2, 4), 16) * ratio +
      parseInt(BASE_COLOR[1].substring(2, 4), 16) * (1 - ratio)
  );
  const b = Math.ceil(
    parseInt(BASE_COLOR[0].substring(4, 6), 16) * ratio +
      parseInt(BASE_COLOR[1].substring(4, 6), 16) * (1 - ratio)
  );

  return `#${hex(r) + hex(g) + hex(b)}`;
}
