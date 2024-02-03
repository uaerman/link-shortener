export const checkValidSince = (valid_since: Date): boolean => {
  const currentDate = new Date();
  return (currentDate < new Date(valid_since));
};

export const checkValidUntil = (valid_until: Date): boolean => {
  const currentDate = new Date();
  return (currentDate > new Date(valid_until));
};
