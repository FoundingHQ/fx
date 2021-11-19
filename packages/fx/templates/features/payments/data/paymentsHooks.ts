import { useMutation } from "react-query";
import { fetcher } from "@util/query";

import { clientPaymentsRoutes } from "../server/paymentsConfig";

export type PaymentsInput = { email: string; quantity: number; price: string };

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

export type CustomPaymentsInput = { email: string; items: Array<any> };

export const useCustomCheckout = (handleCustomCheckout: any) => {
  return useMutation(
    (data: CustomPaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.customCheckout, data),
    {
      onSuccess: (res: any) => {
        handleCustomCheckout(res);
      },
    }
  );
};

export const useConnectOnboarding = () => {
  return useMutation(
    (data: PaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.connectOnboarding, data),
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

export const useSubscription = (handleSubscription: any) => {
  return useMutation(
    (data: PaymentsInput) =>
      fetcher.post(clientPaymentsRoutes.subscription, data),
    {
      onSuccess: (res: any) => {
        handleSubscription(res);
      },
    }
  );
};
