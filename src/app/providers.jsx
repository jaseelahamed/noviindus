"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect } from "react";
import { loadTokens } from "@/features/auth/authSlice";
import { registerTokenGetter } from "@/lib/authToken";

export function Providers({ children }) {

  useEffect(() => {
    store.dispatch(loadTokens());
    registerTokenGetter(() => store.getState().auth.access_token);
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
