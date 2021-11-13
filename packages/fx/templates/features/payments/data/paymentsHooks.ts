import { useMutation } from "react-query";
import { fetcher } from "@util/query";

import { paymentsRoutes } from "../server/paymentsConfig";

export type PaymentsInput = { email: string };

export const useCheckout = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(paymentsRoutes.checkout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useCustomCheckout = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(paymentsRoutes.checkout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useConnectOnboarding = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(paymentsRoutes.customCheckout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useConnectCheckout = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(paymentsRoutes.connectCheckout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useSubscription = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(paymentsRoutes.subscription, data),
    {
      onSuccess: () => {},
    }
  );
};

