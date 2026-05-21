export const formatArticleDate = (date: string | null | undefined) => {
  if (!date) return '';

  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return date;

  return `${year}/${month}/${day}`;
};
