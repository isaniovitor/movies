export const handleClickOutside = (
  event: MouseEvent,
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    callback();
  }
};

export const removeDuplicateItems = <T extends { id: number }>(
  array: T[]
): T[] => {
  return array.filter(
    (item, index, self) => index === self.findIndex((obj) => obj.id === item.id)
  );
};
