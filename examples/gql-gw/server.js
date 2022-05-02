const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const { typeDefs: subsTypeDefs } = require("./subsSchema");
const { resolvers: subsResolvers } = require("./subsResolver");
const { listenSubscriptions } = require("./subscriptions");

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: "orders", url: "http://localhost:5657" },
    { name: "products", url: "http://localhost:5656" },
  ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen(5554).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

listenSubscriptions();

/** SUBS **/
const subsServer = new ApolloServer({
  typeDefs: subsTypeDefs,
  resolvers: subsResolvers
});
subsServer.listen(5556).then(({ url }) => {
  console.log(`🚀 Subscription Server ready at ${url}`);
});
