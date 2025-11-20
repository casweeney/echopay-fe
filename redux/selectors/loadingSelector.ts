import type { RootState } from "../store";

export const selectGlobalLoading = (state: RootState) => {
  return (
    state.user.loading ||
    state.business.loading ||
    state.wallet.loading ||
    state.bvn.loading ||
    state.apiKey.loading ||
    state.webhook.loading ||
    false
  );
};
