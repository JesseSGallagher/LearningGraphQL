//Learning GraphQL

const express = require('express');
const { graphqlHTTP } = require('express-graphql');

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
    description: 'This represents a video game published by a game development studio',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        studioID: {type: new GraphQLNonNull(GraphQLInt)},
        //how to get the studio from the game
        studio: {
            type: StudioType,
            resolve: (game) =>{ //custom resolve with parent game object, passes the data to match the fields
                return studios.find(studio => studio.id === game.studioID) // find studio with id in game 
            }
        }
    })
})

const StudioType = new GraphQLObjectType({
    name: 'Studio',
    description: 'This represents a studio that publish games',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        games:{
            type: new GraphQLList(GameType),
            resolve: (studio) =>  {
                return games.filter(game => game.studioID === studio.id)
            }
        }
    })
})

// Route Query 
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // Query a Single game
        game:{
          type: GameType,
          description: 'A single game',
          args:{
              id: {type: GraphQLInt}
          },
          resolve: (parent, args) => games.find(game => game.id === args.id)
        },
        // Query a List of Games
        games:{
            type: new GraphQLList(GameType),
            description: 'List of All Games',
            resolve: () => games
        },
        // Query a Single studio
        studio:{
            type: StudioType,
            description: 'A single studio',
            args:{
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => studios.find(studio => studio.id === args.id)
        },
        // Query a List of Studios
        studios:{
            type: new GraphQLList(StudioType),
            description: 'List of All Studios',
            resolve: () => studios
        }
    })
})
// Manipulate GraphQL Data with Mutations
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addGame:{
            type: GameType,
            description: 'Add a game',
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                studioID: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const game = {id: games.length +1, name: args.name, studioID: args.studioID} //create game, id not to important as would be created in db
                games.push(game) //push game to games list
                return game
            }
        },
        addStudio:{
            type: StudioType,
            description: 'Add a game studio',
            args:{
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const studio = {id: studios.length +1, name: args.name} //create game, id not to important as would be created in db
                studios.push(studio) //push game to games list
                return studio
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
})); 

app.listen(5000., () => console.log('Server now running.'));