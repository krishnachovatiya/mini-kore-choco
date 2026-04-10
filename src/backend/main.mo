import List "mo:core/List";
import Types "types/orders-products";
import OrdersProductsLib "lib/orders-products";
import OrdersProductsApi "mixins/orders-products-api";

actor {
  let orders = List.empty<Types.Order>();
  let products = List.empty<Types.Product>();
  let nextOrderId = { var value : Nat = 0 };

  OrdersProductsLib.seedProducts(products);

  include OrdersProductsApi(orders, products, nextOrderId);
};
