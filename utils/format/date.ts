const convertISO8601StringToFormattedDate = (value: string): string => {
  const date = new Date(value.replace(' ', '+'));
  const formattedDate = date.toLocaleDateString('us-US');
  return formattedDate;
};

export { convertISO8601StringToFormattedDate };
