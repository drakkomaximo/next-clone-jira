import { formatDistanceToNow } from "date-fns";

export const getFormatDistanceToNow = ({ date }: { date: number }) =>
  `${formatDistanceToNow(date)}`;
