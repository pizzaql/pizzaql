module.exports = {
        typeDefs: /* GraphQL */ `type AggregateOrder {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Order {
  id: ID!
  size: String!
  dough: String!
  type: String!
  name: String!
  phone: String!
  time: String!
  city: String!
  street: String!
  notes: String
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  size: String!
  dough: String!
  type: String!
  name: String!
  phone: String!
  time: String!
  city: String!
  street: String!
  notes: String
}

type OrderEdge {
  node: Order!
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  size_ASC
  size_DESC
  dough_ASC
  dough_DESC
  type_ASC
  type_DESC
  name_ASC
  name_DESC
  phone_ASC
  phone_DESC
  time_ASC
  time_DESC
  city_ASC
  city_DESC
  street_ASC
  street_DESC
  notes_ASC
  notes_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OrderPreviousValues {
  id: ID!
  size: String!
  dough: String!
  type: String!
  name: String!
  phone: String!
  time: String!
  city: String!
  street: String!
  notes: String
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
  AND: [OrderSubscriptionWhereInput!]
  OR: [OrderSubscriptionWhereInput!]
  NOT: [OrderSubscriptionWhereInput!]
}

input OrderUpdateInput {
  size: String
  dough: String
  type: String
  name: String
  phone: String
  time: String
  city: String
  street: String
  notes: String
}

input OrderUpdateManyMutationInput {
  size: String
  dough: String
  type: String
  name: String
  phone: String
  time: String
  city: String
  street: String
  notes: String
}

input OrderWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  size: String
  size_not: String
  size_in: [String!]
  size_not_in: [String!]
  size_lt: String
  size_lte: String
  size_gt: String
  size_gte: String
  size_contains: String
  size_not_contains: String
  size_starts_with: String
  size_not_starts_with: String
  size_ends_with: String
  size_not_ends_with: String
  dough: String
  dough_not: String
  dough_in: [String!]
  dough_not_in: [String!]
  dough_lt: String
  dough_lte: String
  dough_gt: String
  dough_gte: String
  dough_contains: String
  dough_not_contains: String
  dough_starts_with: String
  dough_not_starts_with: String
  dough_ends_with: String
  dough_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  time: String
  time_not: String
  time_in: [String!]
  time_not_in: [String!]
  time_lt: String
  time_lte: String
  time_gt: String
  time_gte: String
  time_contains: String
  time_not_contains: String
  time_starts_with: String
  time_not_starts_with: String
  time_ends_with: String
  time_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  street: String
  street_not: String
  street_in: [String!]
  street_not_in: [String!]
  street_lt: String
  street_lte: String
  street_gt: String
  street_gte: String
  street_contains: String
  street_not_contains: String
  street_starts_with: String
  street_not_starts_with: String
  street_ends_with: String
  street_not_ends_with: String
  notes: String
  notes_not: String
  notes_in: [String!]
  notes_not_in: [String!]
  notes_lt: String
  notes_lte: String
  notes_gt: String
  notes_gte: String
  notes_contains: String
  notes_not_contains: String
  notes_starts_with: String
  notes_not_starts_with: String
  notes_ends_with: String
  notes_not_ends_with: String
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  node(id: ID!): Node
}

type Subscription {
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
}
`
      }
    