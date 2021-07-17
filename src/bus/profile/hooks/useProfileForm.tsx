import { set } from "bus/auth/actions";
import { useAuth } from "bus/auth/hooks/useAuth";
import { UserSchema } from "bus/auth/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import services from "Services";
import { diffBetweenObjs } from "utils/common/diffBetweenObjs";
import { useToast } from "utils/hooks/useToast";
import { UpdateUserFormData, UserUpdateResponse } from "../types";

export const useProfileForm = () => {
  const { data } = useAuth();
  const user = data?.user;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    error: null,
    loading: false,
  });

  const toggleLoading = (loading: boolean) => {
    setState((prev) => {
      return { ...prev, loading };
    });
  };

  const setError = (error: Error | null) => {
    setState((prev) => {
      return { ...prev, error };
    });
  };
  const updateUser = (data: UserUpdateResponse) => {
    dispatch(
      set({
        user: {
          ...user,
          ...data,
        },
      })
    );
  };

  const onSubmit = async (values: UpdateUserFormData & { email: string }) => {
    setError(null);
    toggleLoading(true);
    delete values.email;
    if (diffBetweenObjs(formatUser(user), values)) {
      try {
        const res = await services.userService.updateUser(values);
        updateUser(res.data);
        return true;
      } catch (error) {
        setError(error);
        return false;
      } finally {
        toggleLoading(false);
      }
    } else {
      return true;
    }
  };

  const msg = state?.error?.response?.data?.message ?? state?.error?.message;

  useToast(msg, 3, "error");

  return { ...state, toggleLoading, setError, onSubmit };
};
// format for validate diff
const formatUser = (user: UserSchema) => {
  return { displayName: user.displayName, photoURL: user.photoURL };
};
