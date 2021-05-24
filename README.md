﻿# LearningGraphQL

### Express, Express-GraphQL, GraphQL

A simple **CRUD** server utilizing GraphQL. The database is filled with some static data (video games, and game studios).

You can **Query** for:
- All Games
- Single Games
- All Studios
- Single Studios

The following **Mutations** can be preformed:
- Add Game
- Remove Game
- Update Game's Name
- Add Studio
- Remove Studio
- Update Studio's Name


## GraphQL Queries

### Get All Games
```
{
  games{
  id
  name
  studio
  }
}
```

