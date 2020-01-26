const {join} = require('path');
const {GraphQLServer, PubSub} = require('graphql-yoga');
const {makeSchema, objectType, idArg, stringArg, booleanArg} = require('nexus');
const {PrismaClient} = require('@prisma/client');
const {nexusPrismaPlugin} = require('nexus-prisma');

const pubsub = new PubSub();

const Order = objectType({
	name: 'Order',
	definition(t) {
		t.model.id();
		t.model.status();
		t.model.paid();
		t.model.price();
		t.model.size();
		t.model.dough();
		t.model.type();
		t.model.name();
		t.model.phone();
		t.model.time();
		t.model.city();
		t.model.street();
	}
});

const Query = objectType({
	name: 'Query',
	definition(t) {
		t.list.field('order', {
			type: 'Order',
			args: {
				id: idArg()
			},
			resolve: (_, {id}, ctx) => {
				// TODO: Use findOne()
				return ctx.prisma.orders.findMany({where: {id: Number(id)}});
			}
		});

		t.list.field('orders', {
			type: 'Order',
			resolve: (_, _args, ctx) => {
				return ctx.prisma.orders.findMany({});
			}
		});
	}
});

const Mutation = objectType({
	name: 'Mutation',
	definition(t) {
		t.field('createOrder', {
			type: 'Order',
			args: {
				status: stringArg(),
				paid: booleanArg(),
				price: stringArg(),
				size: stringArg(),
				dough: stringArg(),
				type: stringArg(),
				name: stringArg(),
				phone: stringArg(),
				time: stringArg(),
				city: stringArg(),
				street: stringArg()
			},
			resolve: async (_, {
				status,
				paid,
				price,
				size,
				dough,
				type,
				name,
				phone,
				time,
				city,
				street
			}, ctx) => {
				const order = await ctx.prisma.orders.create({
					data: {
						status,
						paid,
						price,
						size,
						dough,
						type,
						name,
						phone,
						time,
						city,
						street
					}
				});

				ctx.pubsub.publish('CREATED_ORDER', {
					createdOrder: order
				});

				return order;
			}
		});

		t.field('updateOrder', {
			type: 'Order',
			args: {
				id: idArg(),
				status: stringArg()
			},
			resolve: (_, {id, status}, ctx) => {
				return ctx.prisma.orders.update({
					where: {id: Number(id)},
					data: {status}
				});
			}
		});

		t.field('deleteOrder', {
			type: 'Order',
			args: {
				id: idArg()
			},
			resolve: (_, {id}, ctx) => {
				return ctx.prisma.orders.delete({
					where: {id: Number(id)}
				});
			}
		});
	}
});

const Subscription = objectType({
	name: 'Subscription',
	definition(t) {
		t.field('createdOrder', {
			type: 'Order',
			subscribe: (parent, ctx) =>
				ctx.pubsub.asyncIterator('CREATED_ORDER')
		});
	}
});

const prisma = new PrismaClient();

new GraphQLServer({
	schema: makeSchema({
		types: [Query, Mutation, Subscription, Order],
		plugins: [nexusPrismaPlugin()],
		outputs: {
			schema: join(__dirname, '/generated/schema.graphql'),
			typegen: join(__dirname, '/generated/nexus.ts')
		}
	}),
	context: {prisma, pubsub}
}).start(() =>
	console.log(
		'🚀 Server ready at: http://localhost:4000'
	)
);

module.exports = {Order};
