import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/orders-products";
import OrdersProductsLib "../lib/orders-products";

mixin (
  orders : List.List<Types.Order>,
  products : List.List<Types.Product>,
  nextOrderId : { var value : Nat },
) {
  public shared func addOrder(config : Types.OrderConfig, totalPrice : Nat) : async { #ok : Text; #err : Text } {
    let createdAt = Time.now();
    let order = OrdersProductsLib.addOrder(orders, nextOrderId.value, config, totalPrice, createdAt);
    nextOrderId.value += 1;
    #ok(order.id);
  };

  public query func getOrders() : async [Types.Order] {
    OrdersProductsLib.getOrders(orders);
  };

  public query func getProducts() : async [Types.Product] {
    OrdersProductsLib.getProducts(products);
  };
};
