import productsModel from './products.model';

const resolvers = {
  Query: {
    // (parent, args, context, info)
    products: (_parent: any, _args: any, _context: any, _info: any) => {
      // console.log('parent: ', parent);
      // console.log('args: ', args);
      // console.log('context: ', context);
      // console.log('info: ', info);
      return productsModel.getAllProducts();
    },
    productsByPrice: (_: any, args: { min: number; max: number }) => {
      return productsModel.getProductsByPrice(args.min, args.max);
    },
    product: (_: any, args: { id: string }) => {
      return productsModel.getProductById(args.id);
    },
  },

  Mutation: {
    addNewProduct: (
      _: any,
      args: { id: string; description: string; price: number }
    ) => {
      return productsModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (
      _: any,
      args: { id: string; rating: number; comment: string }
    ) => {
      return productsModel.addNewProductReview(
        args.id,
        args.rating,
        args.comment
      );
    },
  },
};

export default resolvers;
