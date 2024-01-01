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
        image: item?.image[0].path,
      }));

      console.log(products);

      if (!products) {
        console.log(products);
        return {
          status: 404,
          message: "Error loading products",
        };
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
        message: "Error",
      };
    }
  },

  getAllCart: async (userId) => {
    try {
      const userCart = await User.findById(userId);
      if (!userCart) {
        return {
          status: 404,
          message: "User not found",
        };
      }
      const data = userCart.orders;
      return {
        status: 201,
        message: "Cart successfully",
        data,
      };
    } catch (error) {
      return {
        status: 501,
        message: error,
        data: [],
      };
    }
  },

  createCart: async ({ cartItems }, userId) => {
    try {
      console.log(cartItems);
      // Create an array of Products Object from the cart Items
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image[0].path,
        productId: item?._id,
      }));
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      user.orders.push(...products);
      await user.save();

      return {
        status: 201,
        message: "Cart created",
        data: user,
      };
    } catch (error) {
      return {
        status: 501,
        message: "Error during create cart",
      };
    }
  },

  deleteCart: async (userId) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { orders: [] },
        { new: true }
      );
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        }
      }

      return {
        status: 201,
        message: "Cart deleted",
      }
    } catch (error) {
      return {
        status: 501,
        message: "Cart not found",
      }
    }
  }
};

module.exports = order;
