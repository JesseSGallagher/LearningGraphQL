//Learning GraphQL

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// formly- const expressGraphQL =  require('express-graphql')

const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld', // examples (Authorname, ISBN, SIN, etc)
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: ()=> 'Hello my name is Jesse'} //what information is being retrived and how can have (parent,arguments)
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
})); 

// formly:
// app.use('/graphql', expressGraphL({
//     graphiql: true
// })); 

//before express-graphsql was returning a direct function or class, not it returns the whole object that had a function inside it named graphqlHTTP

app.listen(5000., () => console.log('Server now running.'));