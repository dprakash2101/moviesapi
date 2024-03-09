# Movie Lobby API

This is an API for managing movies in a movie lobby for OTT applications. It allows users to list movies, search for movies by title or genre, add new movies, update existing movie information, and delete movies from the lobby.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

```bash
https://github.com/dprakash2101/moviesapi.git
```

2. Install dependencies:

```bash
cd movie-lobby-api
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```
4. Start the server:

```bash
npm start
```

## API Endpoints

- `GET /api/movies`: List all movies in the lobby
- `GET /api/search/title?q={title}`: Search for a movie by title
- `GET /api/search/genre?q={genre}`: Search for a movie by genre
- `POST /api/movies`: Add a new movie to the lobby
- `PUT /api/movies/title/{title}`: Update an existing movie's information
- `DELETE /api/movies/title/{title}`: Delete a movie from the lobby

## Usage

- **List all movies:** Send a GET request to `/api/movies`
- **Search by title:** Send a GET request to `/api/search/title?q={title}`
- **Search by genre:** Send a GET request to `/api/search/genre?q={genre}`
- **Add a new movie:** Send a POST request to `/api/movies` with the movie details in the request body
- **Update a movie:** Send a PUT request to `/api/movies/title/{title}` with the updated movie details in the request body
- **Delete a movie:** Send a DELETE request to `/api/movies/title/{title}`



## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Devi Prakash Kandikonda](https://github.com/dprakash2101)