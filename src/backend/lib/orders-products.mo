import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Types "../types/orders-products";

module {
  public type Order = Types.Order;
  public type Product = Types.Product;
  public type OrderConfig = Types.OrderConfig;

  public func addOrder(
    orders : List.List<Order>,
    nextId : Nat,
    config : OrderConfig,
    totalPrice : Nat,
    createdAt : Types.Timestamp,
  ) : Order {
    let orderId = "order-" # nextId.toText();
    let order : Order = {
      id = orderId;
      config = config;
      totalPrice = totalPrice;
      createdAt = createdAt;
    };
    orders.add(order);
    order;
  };

  public func getOrders(orders : List.List<Order>) : [Order] {
    orders.toArray();
  };

  public func getProducts(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func seedProducts(products : List.List<Product>) {
    if (not products.isEmpty()) return;
    products.add({
      id = "product-1";
      name = "The Joy of One";
      price = 80;
      description = "A single handcrafted geometric heart of pure dark chocolate, loaded with whole roasted almonds and premium seeds.";
    });
    products.add({
      id = "product-2";
      name = "The Heart Collection of Four";
      price = 299;
      description = "A curated sleeve box of four geometric hearts — share the artisanal luxury experience with those you cherish.";
    });
    products.add({
      id = "product-3";
      name = "The Signature Twelve";
      price = 899;
      description = "Our signature luxury rigid box of twelve handcrafted hearts — the ultimate mini Kore gifting experience.";
    });
  };
};
