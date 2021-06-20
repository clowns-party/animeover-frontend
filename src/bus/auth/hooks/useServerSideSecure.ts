import { GetServerSidePropsContext } from "next";
import { getToken } from "utils/axios/axios.auth";
import { service } from "../../../Services";
import { User } from "../types";

type Redirect = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

type ReturnProps = {
  props: {
    user: User | null;
  };
};

export const useServerSideSecure = async (
  context: GetServerSidePropsContext
): Promise<ReturnProps | Redirect> => {
  const redirect = {
    destination: "/",
    permanent: false,
  };
  try {
    const tokens = context && getToken(context);
    if (tokens?.access && tokens?.refresh) {
      const { data }: { data: User } = await service.authService.me(
        tokens?.access,
        tokens?.refresh
      );
      return { props: { user: data } };
    }
    return { redirect };
  } catch (error) {
    return { redirect };
  }
};
