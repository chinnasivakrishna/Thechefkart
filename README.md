
# User and Post Management API

This project provides a RESTful API for managing users and their posts. It includes the ability to create, retrieve, update, and delete users and posts, following REST guidelines.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Get All Users](#get-all-users)
  - [Get All Posts](#get-all-posts)
  - [Get All Posts by User](#get-all-posts-by-user)
  - [Create a Post](#create-a-post)
  - [Edit a Post](#edit-a-post)
  - [Delete a Post](#delete-a-post)
- [Database Models](#database-models)
  - [User Model](#user-model)
  - [Post Model](#post-model)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is designed to manage users and their posts with the following features:
- Users can have multiple posts.
- A user's post count will increase automatically when a new post is created.
- Users and posts can be created, updated, fetched, or deleted through a REST API.

---

## Features

- **User Management**: Create, view, and update user profiles.
- **Post Management**: Create, view, edit, and delete posts made by users.
- **Post Count**: Automatic tracking of the number of posts for each user.
- **JSON Data**: Posts include an image list stored as a JSON array.

---

## API Endpoints

### 1. **Get All Users**
- **Endpoint**: `GET /api/users`
- **Description**: Retrieve a list of all users in the system.
- **Response**: A JSON array of user objects.

### 2. **Get All Posts**
- **Endpoint**: `GET /api/posts`
- **Description**: Retrieve a list of all posts.
- **Response**: A JSON array of post objects.

### 3. **Get All Posts by User**
- **Endpoint**: `GET /api/users/{userId}/posts`
- **Description**: Retrieve all posts made by a specific user.
- **Parameters**: 
  - `userId` (Required): The ID of the user whose posts are to be fetched.
- **Response**: A JSON array of posts by the specified user.

### 4. **Create a Post**
- **Endpoint**: `POST /api/users/{userId}/posts`
- **Description**: Create a new post for a user.
- **Parameters**:
  - `userId` (Required): The ID of the user creating the post.
  - Request Body: 
    - `title` (Required): Title of the post.
    - `description` (Required): Description of the post.
    - `images` (Optional): Array of image URLs (JSON array).
- **Response**: The created post object along with the updated user post count.

### 5. **Edit a Post**
- **Endpoint**: `PUT /api/posts/{postId}`
- **Description**: Edit an existing post.
- **Parameters**:
  - `postId` (Required): The ID of the post to be edited.
  - Request Body:
    - `title` (Optional): Updated title of the post.
    - `description` (Optional): Updated description of the post.
    - `images` (Optional): Updated JSON array of image URLs.
- **Response**: The updated post object.

### 6. **Delete a Post**
- **Endpoint**: `DELETE /api/posts/{postId}`
- **Description**: Delete an existing post.
- **Parameters**:
  - `postId` (Required): The ID of the post to be deleted.
- **Response**: A success message confirming the deletion of the post.

---

## Database Models

### User Model
- **id** (Number, Auto Increment): Unique identifier for the user.
- **name** (Varchar 256): Name of the user.
- **mobile_number** (Number, Unique): Mobile number of the user (must be unique).
- **address** (Text): Address of the user.
- **post_count** (Number): Tracks the number of posts created by the user. Automatically increments when a new post is added.

### Post Model
- **id** (Number, Auto Increment): Unique identifier for the post.
- **title** (Text): Title of the post.
- **description** (Text): Description of the post.
- **user_id** (Foreign Key): References the `id` of the user who created the post.
- **images** (JSON Array of Strings): An array of image URLs associated with the post.

---

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- PostgreSQL (or another SQL database of your choice)
- npm or yarn

### Installation Steps
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/project-repo.git
    cd project-repo
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    - Make sure your database is running.
    - Update the database connection settings in `config/database.js` or `.env` file.
    - Run the database migrations to create tables:
      ```bash
      npm run migrate
      ```

4. Seed the database with some initial data (optional):
    ```bash
    npm run seed
    ```

### Running the Application
To start the application locally:
```bash
npm start
```
The server will start on `http://localhost:3000`.

---

## Testing

- Unit and integration tests can be run using Jest:
    ```bash
    npm run test
    ```
  
- To run the API tests, use Postman or any other API testing tool and test the endpoints as described above.

---

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new pull request.

