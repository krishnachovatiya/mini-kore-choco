import { createActor } from "@/backend";
import type { Order, OrderConfig } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackend() {
  return useActor(createActor);
}

export function useAddOrder() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      config,
      totalPrice,
    }: {
      config: OrderConfig;
      totalPrice: number;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.addOrder(config, BigInt(totalPrice));
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrders() {
  const { actor, isFetching } = useBackend();

  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getOrders();
      return raw as Order[];
    },
    enabled: !!actor && !isFetching,
  });
}
