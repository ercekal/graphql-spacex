const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express()
const { ApolloServer, gql } = require('apollo-server-express');
const PORT = process.env.PORT || 5000

//mongoose 
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

// const typeDefs = gql`
//   type Blog {
//     title: String!
// 		author: String
// 		body: String
// 		date: String
//   }
// 	type User {
//     username: String!
//     password: String!
//     email: String!
// 		date: String
//   }
// 	type Query {
// 		showAllBlogs: [Blog]
// 	}
// `;


// const resolvers = {
//   Query: () => {}
// };

// const server = new ApolloServer({ 
// 	typeDefs, 
// 	resolvers,
// 	context: {
// 		Blog, 
// 		User
// 	}
// });

// server.applyMiddleware({ app });
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})
