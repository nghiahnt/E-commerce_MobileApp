const Order = require("../models/order");
const User = require("../models/user");

const order = {
  storeOrder: async ({
    userId,
    cartItems,
    totalPrice,
    shippingAddress,
    paymentMethod,
  }) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      // Create an array of Products Object from the cart Items
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
      }));

      console.log(products);

      if (!products) {
        console.log(products);
        return {
          status: 404,
          message: "Error loading products"
        }
      }

      const order = new Order({
        user: userId,
        product: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      });

      // Save
      await order.save();

      return {
        status: 200,
        message: "Order created successfully",
      };
    } catch (error) {
      console.log("Error during create Order", error);
      return {
        status: 500,
        message: "Error creating orders",
      };
    }
  },

  // Get orders of a particular user
  getOrderByUser: async (userId) => {
    try {
        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
          return {
            status: 404,
            message: "No orders found for this user",
          };
        }

        return {
          status: 200,
          message: orders,
        };
    } catch (error) {
        console.log("Error during getOrderByUser", error);
        return {
            status: 500,
            message: "Error"
        }
    }
  },
};

module.exports = order;
