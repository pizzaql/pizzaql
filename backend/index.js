const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const typeDefs = `
  type Order {
		id: ID!
		status: String!
    size: String!
    dough: String!
    type: String!
    name: String!
    phone: String!
    time: String!
    city: String!
    street: String!
  }

  type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    createOrder(
				status: String!
        size: String!
        dough: String!
        type: String!
        name: String!
        phone: String!
        time: String!
        city: String!
        street: String!
		): Order
		updateOrder(
			status: String!,
			id: ID!
		): Order
    deleteOrder(id: ID!): Order
  }
`;

const resolvers = {
	Query: {
		order: (root, args, ctx, info) => ctx.prisma.query.order({id: args.id}, info),
		orders: (root, args, ctx, info) => ctx.prisma.query.orders({}, info)
	},
	Mutation: {
		createOrder: (root, args, ctx, info) =>
			ctx.prisma.mutation.createOrder({data: {
				status: args.status,
				size: args.size,
				dough: args.dough,
				type: args.type,
				name: args.name,
				phone: args.phone,
				time: args.time,
				city: args.city,
				street: args.street
			}}, info),
		updateOrder: (root, args, ctx, info) =>
			ctx.prisma.mutation.updateOrder({data: {status: args.status}, where: {id: args.id}}, info),
		deleteOrder: (root, args, ctx, info) =>
			ctx.prisma.mutation.deleteOrder({where: {id: args.id}}, info)
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: req => ({
		...req,
		prisma: new Prisma({
			typeDefs: './schema.graphql',
			endpoint: 'http://localhost:4466',
			debug: true
		})
	})
});

server.start(() => console.log('Server is running on http://localhost:4000'));
