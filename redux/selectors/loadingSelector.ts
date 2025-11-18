import type { RootState } from "../store";

export const selectGlobalLoading = (state: RootState) => {
  return (
    state.user.loading ||
    state.business.loading ||
    state.wallet.loading ||
    state.apiKey.loading ||
    state.account.loading ||
    state.webhook.loading ||
    false
  );
};
