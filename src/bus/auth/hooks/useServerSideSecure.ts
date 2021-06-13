import { GetServerSidePropsContext } from "next";
import { getToken } from "utils/axios/axios.auth";
import { service } from "../../../Services";
import { User } from "../types";

export const useServerSideSecure = async (
  context: GetServerSidePropsContext
): Promise<{ user: User | null }> => {
  try {
    const tokens = context && getToken(context);
    if (tokens?.access && tokens?.refresh) {
      const { data }: { data: User } = await service.authService.me(
        tokens?.access,
        tokens?.refresh
      );
      return { user: data };
    }
    return { user: null };
  } catch (error) {
    return { user: null };
  }
};
