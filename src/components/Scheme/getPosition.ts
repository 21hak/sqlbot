// const MAX_WIDTH = 1200;
const COLUMN_MAX_COUNT = 3;
const COLUMN_GAP = 200;
const ROW_GAP = 200;
export default function getPosition(index: number) {
  const y = Math.ceil(index / COLUMN_MAX_COUNT) * ROW_GAP;
  const x = (index % COLUMN_MAX_COUNT) * COLUMN_GAP;
  return [x, y];
}
