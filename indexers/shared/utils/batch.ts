type BatchRange = {
  min: number;
  max: number;
  length: number;
};

type BatchCallback = (range: BatchRange) => Promise<void>;

export const batch = async (
  start: number,
  end: number,
  size: number,
  callback: BatchCallback
) => {
  // the start and end are both inclusive
  for (let i = start; i <= end; i += size) {
    const min = i;
    const max = Math.min(end, i + size - 1);
    await callback({ min, max, length: max - min + 1 });
  }
};
