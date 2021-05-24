# LearningGraphQL

### Express, Express-GraphQL, GraphQL

A simple **CRUD** server utilizing GraphQL. The database is filled with some static data (video games, and game studios).

You can **Query** for:
- All Games
- Single Games
- All Game Studios
- Single Game Studio

The following **Mutations** can be preformed:
- Add Game
- Update Game's Name
- Remove Game
- Add Game Studio
- Update Game Studio's Name
- Remove Game Studio


### GraphQL Queries



#### Get All Games
---
This would get you a list of all the games, displaying their id, name, and studioID. (You can add or remove retrieved fields as needed)
```
{
  games {
    id
    name
    studioID
  }
}
```
#### Get a Single Game
---
This will get you a single game by searching by its id.

```
{
  game(id: 1) {
    id
    name
  }
}
```
#### Get All Game Studios
---
This would get you a list of all the game studios listed, displaying their id, name.
```
{
  studios {
    id
    name
  }
}
```
We can go a step further displaying the games a studio has published utilizing graphQL like so:
```
{
  studios {
    id
    name
    games {
      name
    }
  }
}

```

#### Get a Single Studio
---
This will get you a single game studio by searching by its id.

```
{
  studio(id: 1) {
    name
  }
}
```

### GraphQL Mutations



#### Add a Game
---
This will allow you to add a game to the stack.
```
mutation {
  addGame(name: "New Game", studioID: 2) {
    id
    name
  }
}
```
You can then view this entry by calling a query for all games, or by using the ID displayed when adding the game.

#### Update a Game's Name
---
This will allow you to update an exsisting games name in the stack, you need to include the ID you wish to modify and the new name.
```
mutation {
  updateGameName(id: 9, name: "New Game Name") {
    name
  }
}
```

#### Remove a Game
---
This will allow you to remove a game from the stack by entering its name, and the studioID it belongs to.
```
mutation {
  removeGame(name: "New Game", studioID: 2) {
    name
  }
}
```

#### Add a Game Studio
---
This will allow you to add a game to the stack.
```
mutation {
  addStudio(name: "New Studio") {
    id
    name
  }
}
```
For adding a new game studio, only the name is needed.

#### Update a Game Studio's Name
---
This will allow you to update an exsisting game studios name in the stack.
```
mutation {
  updateStudioName(id: 5, name: "New Studio Name") {
    id
    name
  }
}
```
With this we change the created studio with the id 5 "New Studio" to "New Studio Name".

#### Remove a Game Studio
---
This will allow you to remove a game studio from the stack.
```
mutation {
  removeStudio(name: "New Studio Name") {
    name
  }
}
```
This will remove the recently updated studio "New Studio Name"

***
##### Note : This is not a persitent database. It will not save the results to the hardcoded data, and will be lost if the page is refreshed.
