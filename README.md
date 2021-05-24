# LearningGraphQL
 ---

### Express, Express-GraphQL, GraphQL

A simple **CRUD** server utilizing GraphQL. The database is filled with some static data (video games, and game studios).

You can **Query** for:
- All Games
- Single Games
- All Game Studios
- Single Game Studio

The following **Mutations** can be preformed:
- Add Game
- Remove Game
- Update Game's Name
- Add Game Studio
- Remove Game Studio
- Update Game Studio's Name


## GraphQL Queries

### Get All Games
---
This would get you a list of all the games listed, displaying their id, name, and studioID. (You can add or remove retrieved fields as needed)
```
{
  games {
    id
    name
    studioID
  }
}
```
### Get a Single Game
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
### Get All Game Studios
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

### Get a Single Studio
---
This will get you a single game studio by searching by its id.

```
{
  studio(id: 1) {
    name
  }
}
```

