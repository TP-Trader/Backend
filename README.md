# Backend

### 2️⃣ Endpoints

#### Auth Routes

> NOTE: all of the following API routes are prefixed with `/api`

| Method | Endpoint             | Access Control | Description                                    |
| ------ | -------------------- | -------------- | ---------------------------------------------- |
| POST    | `/auth/register`    | everyone       | Creates new user account                       |
| POST   | `/auth/login`        | everyone       | Logs user in to their account                  |


#### Users Routes

| Method | Endpoint         | Access Control | Description                                     |
| ------ | ---------------- | -------------- | ----------------------------------------------- |
| GET    | `/users`         | users          | Returns a list of all users.                    |
| GET    | `/users/:userId` | users          | Returns the information for a specific user.    |
| PUT    | `/users/:userId` | users          | Modify a user.                                  |
| DELETE | `/users/:userId` | users          | Delete a user.                                  |

#### Posts Routes

| Method | Endpoint                        | Access Control | Description                       |
| ------ | ------------------------------- | -------------- | --------------------------------- |
| GET    | `/users/:userId/posts`          | users          | Returns all posts for a user.     |
| GET    | `/users/:userId/posts/:postId`  | users          | Returns that post for a user.     |
| POST   | `/users/:userId/posts`          | users          | Creates a new post.               |
| PUT    | `/users/:userId/posts/:postId`  | users          | Modify a post.                    |
| DELETE | `/users/:userId/posts/:postId`  | users          | Delete a post.                    |

#### Responses Routes

> NOTE: all of the following API routes are prefixed with `/api/users/:userId/posts/:postId`

| Method | Endpoint                 | Access Control | Description                                      |
| ------ | ------------------------ | -------------- | ------------------------------------------------ |
| GET    | `/responses`             | users          | Returns all responses.                           |
| GET    | `/responses/:responseId` | users          | Returns the information for a specific response. |
| POST   | `/responses`             | users          | Creates a new response.                          |
| PUT    | `/responses/:responseId` | users          | Modify a response.                               |
| DELETE | `/responses/:responseId` | users          | Delete a response.                               |

# Data Model

#### USERS

---

```
{
    id: INTEGER [pk, increment]
    email: STRING [unique, not null 'ex: user@email.com']
    password: STRING [not null 'ex: password123']
    city: STRING
}
```

#### POSTS

---

```
{
    id: INTEGER [pk, increment]
    desiredItem: STRING [not null 'ex: toilet paper']
    postsCity: STRING [not null 'ex: New York City']
    type: ENU [not null, must be one of the following: "Food", "Labor", "Household Item", "Other" 'ex: Household Item']
    description: STRING [not null 'ex: anything will do']
    date: [auto generated]
    user_id: INTEGER [references id of user that created post]
}
```

#### RESPONSES

---

```
{
    id: INTEGER [pk, increment]
    item: STRING [not null, 'ex: bread']
    description: STRING [not null 'ex: unopened loaf of bread]
    date: DATETIME [not null, format: "YYYY-MM-DD HR:MIN:SEC"]
    accept: BOOLEAN [defaults: true, not null]
    posts_id: INTEGER [references post to respond to]
}
```