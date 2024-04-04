import { auth } from "@clerk/nextjs";

const adminIds = ["user_2eLuAqgSnjHrAOrqe4ArUd3uQD3"];

export const getIsAdmin = async () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
