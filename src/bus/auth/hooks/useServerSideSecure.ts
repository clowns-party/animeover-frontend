import { GetServerSidePropsContext } from "next";
import { getToken } from "utils/axios/axios.auth";
import { service } from "../../../Services";
import { User } from "../types";

export const useServerSideSecure = async (
  context: GetServerSidePropsContext
): Promise<{ user: User | null }> => {
  const token = context && getToken(context);
  if (token) {
    const { data }: { data: User } = await service.authService.me(token);
    return { user: data };
  }
  return { user: null };
};
