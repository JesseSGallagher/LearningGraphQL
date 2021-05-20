//Learning GraphQL

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// formly- const expressGraphQL =  require('express-graphql')

const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} = require('graphql');

const app = express();

//static data for testing in place of database information
const studios = [
    {id: 1, name: 'Ubisoft'},
    {id: 2, name: 'EA Games'},
    {id: 3, name: 'Kojima Productions'},
    {id: 4, name: 'Epic Games'}
]

const games = [
    {id: 1, name: 'Rainbow 6 Seige', studioID: 1},
    {id: 2, name: 'Watch Dogs', studioID: 1},
    {id: 3, name: 'Assassins Creed', studioID: 1},
    {id: 4, name: 'For Honor', studioID: 1},
    {id: 5, name: 'Apex Legends', studioID: 2},
    {id: 6, name: 'The Sims', studioID: 2},
    {id: 7, name: 'Mass Effect', studioID: 2},
    {id: 8, name: 'Death Stranding', studioID: 3},
    {id: 9, name: 'Fortnite', studioID: 4},
    {id: 10, name: 'Robo Recall', studioID: 4}
]

const GameType = new GraphQLObjectType({
    name: 'Game',
    description: 'A video game published a game development studio',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        studioID: {type: new GraphQLNonNull(GraphQLInt)},
    })
})

// Route Query 
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        games:{
            type: new GraphQLList(GameType),
            description: 'List of All Games',
            resolve: () => games
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
})); 

app.listen(5000., () => console.log('Server now running.'));