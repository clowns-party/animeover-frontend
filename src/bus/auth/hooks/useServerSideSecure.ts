import { GetServerSidePropsContext } from "next";
import { getToken } from "utils/axios/axios.auth";
import { service } from "../../../Services";
import { User } from "../types";

export const useServerSideSecure = async (
  context: GetServerSidePropsContext
): Promise<{ user: User | null }> => {
  const { access, refresh } = context && getToken(context);
  if (access && refresh) {
    const { data }: { data: User } = await service.authService.me(
      access,
      refresh
    );
    return { user: data };
  }
  return { user: null };
};
