export const formatDateToText = ({ date }: { date: string }) => {
  const dateToCompare = new Date(date);
  const now = new Date();

  const diffInDays = dateDiffInDays({ b: now, a: dateToCompare });

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return "This week";
  } else if (diffInDays < 14) {
    return "1 week ago";
  } else if (diffInDays < 31) {
    return "This month";
  } else if (diffInDays < 60) {
    return "Last month";
  } else if (diffInDays < 365) {
    return "This year";
  }
  return "Long time ago...";
};

function dateDiffInDays({ a, b }: { a: Date; b: Date }) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
