import ordersModel from './orders.model';

export default {
  Query: {
    orders: () => {
      return ordersModel.getAllOrders();
    },
  },
};
