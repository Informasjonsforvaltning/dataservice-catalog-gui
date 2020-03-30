export const dateStringToDate = (dateString: string): Date | null => {
  const dateStringTimestamp = Date.parse(dateString);
  const date = new Date(dateStringTimestamp);
  date.setHours(0, 0, 0, 0);
  return !isNaN(dateStringTimestamp) ? date : null;
};

export const formatDate = (date: Date | null): string =>
  date
    ?.toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .join('.') ?? '';
