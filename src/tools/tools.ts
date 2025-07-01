export const timeAgo = function(date: Date | string){
  const now: Date = new Date();
  const past: Date = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
};
