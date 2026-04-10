import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderConfig {
    base: string;
    core: string;
    finish: string;
    crunch: string;
    infusion: string;
}
export type Timestamp = bigint;
export type ProductId = string;
export interface Order {
    id: OrderId;
    createdAt: Timestamp;
    config: OrderConfig;
    totalPrice: bigint;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    price: bigint;
}
export type OrderId = string;
export interface backendInterface {
    addOrder(config: OrderConfig, totalPrice: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOrders(): Promise<Array<Order>>;
    getProducts(): Promise<Array<Product>>;
}
