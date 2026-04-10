import Common "common";

module {
  public type Timestamp = Common.Timestamp;
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;

  public type OrderConfig = {
    base : Text;
    infusion : Text;
    crunch : Text;
    core : Text;
    finish : Text;
  };

  public type Order = {
    id : OrderId;
    config : OrderConfig;
    totalPrice : Nat;
    createdAt : Timestamp;
  };

  public type Product = {
    id : ProductId;
    name : Text;
    price : Nat;
    description : Text;
  };
};
