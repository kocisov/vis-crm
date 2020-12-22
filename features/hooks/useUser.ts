import {useEffect} from "react";
import useSWR from "swr";
import Router from "next/router";
import {fetcher} from "@/features/common/fetcher";
import {Roles} from "@/features/interfaces";

type Props = {
  redirectTo?: string;
  redirectIfFound?: boolean;
  requiredRoles?: Array<Roles>;
};

export function useUser({
  redirectTo,
  redirectIfFound = false,
  requiredRoles,
}: Props) {
  const {data: user, error, mutate} = useSWR("/api/users/me", fetcher);
  const loading = !user && !error;
  const isLoggedIn = !error;

  useEffect(() => {
    if (!redirectTo || !user) {
      return;
    }

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn) ||
      (requiredRoles && !requiredRoles.some((role) => user.role === role))
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {
    loading,
    isLoggedIn,
    user,
    mutate,
  };
}
