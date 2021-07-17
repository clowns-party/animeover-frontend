import { GetServerSidePropsContext } from "next";
import { getToken } from "utils/axios/axios.auth";
import { service } from "../../../services";
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
    const { data }: { data: User } = await service.authService.me(context);
    if (data) {
      return { props: { user: data } };
    }

    return { redirect };
  } catch (error) {
    return { redirect };
  }
};
