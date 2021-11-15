import { useMutation } from "react-query";
import { fetcher } from "@util/query";

import { clientPaymentsRoutes } from "../server/paymentsConfig";

export type PaymentsInput = { email: string, quantity: number, price: string };

export const useCheckout = (handleCheckout: any) => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(clientPaymentsRoutes.checkout, data),
    {
      onSuccess: (res: any) => {
        handleCheckout(res);
      },
    }
  );
};

export const useCustomCheckout = () => {
  return useMutation(
    (data: PaymentsInput) => fetcher.post(clientPaymentsRoutes.checkout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useConnectOnboarding = () => {
  return useMutation(
    (data: PaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.customCheckout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useConnectCheckout = () => {
  return useMutation(
    (data: PaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.connectCheckout, data),
    {
      onSuccess: () => {},
    }
  );
};

export const useSubscription = () => {
  return useMutation(
    (data: PaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.subscription, data),
    {
      onSuccess: () => {},
    }
  );
};
