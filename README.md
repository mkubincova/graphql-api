# GraphQL API

Example GraphQL API project based on tutorial from [The Net Ninja](https://www.youtube.com/@NetNinja) YouTube channel

## Installation

```bash
npm install
```

## Usage

Start server:
```bash
npm run start
```
Start development server (requires [nodemon](https://www.npmjs.com/package/nodemon)):
```bash
npm run dev
```

## Queries
### Get all reviews / games / authors
```apollo
query ReviewsQuery {
  reviews {
    id,
    content,
    ...
  }
}
```

### Get review / game / author by ID
```apollo
query ReviewQuery($id: ID!) {
  review(id: $id) {
    id,
    content,
    ...
  }
}
```

### Mutations (game only)
#### Add:
```apollo
mutation addMutation($game: AddGameInput!) {
  addGame(game: $game) {
    title,
    platform
  }
}

# Returns new item
{
  "data": {
    "addGame": {
      "title": "New Game",
      "platform": [
        "switch",
        "ps5"
      ]
    }
  }
}
```

#### Delete:
```apollo
mutation deleteMutation($id: ID!) {
  deleteGame(id: $id) {
    title,
    platform
  }
}

# Returns updated list
{
  "data": {
    "deleteGame": [
      {
        "title": "Final Fantasy 7 Remake",
        "platform": [
          "PS5",
          "Xbox"
        ]
      },
      {
        "title": "Elden Ring",
        ...
    ]
  }
}
```

#### Update:
```apollo
mutation updateMutation($id: ID!, $edits: UpdateGameInput!) {
  updateGame(id: $id, edits: $edits) {
    title,
    platform
  }
}

# Returns updated item
{
  "data": {
    "updateGame": {
      "title": "New title",
      "platform": [
        "switch"
      ]
    }
  }
}
```