# <div align="center">Task API</div>

> A task management API made in Rocketseat's 1st IGNITE NODE challenge

## About the challenge

In this challenge you will develop an API to perform CRUD of your *tasks* (tasks).

The API must contain the following functionalities:

- Creation of a task
- List of all tasks
- Update a task by `id`
- Remove a task by `id`
- Mark a task as complete by `id`
- Importing tasks in bulk via a CSV file

### Routes and business rules

Before the routes, let's understand what structure (properties) a task should have:

- `id` - Unique identifier for each task
- `title` - Task title
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed. The initial value must be `null`
- `created_at` - Date when the task was created.
- `updated_at` - Must always be changed to the date when the task was updated.

Routes:

- `POST - /tasks`
    
     It must be possible to create a task in the database, sending the `title` and `description` fields through the `body` of the request.
    
     When creating a task, the fields: `id`, `created_at`, `updated_at` and `completed_at` must be filled in automatically, as per the orientation of the properties above.
    
- `GET - /tasks`
    
     It must be possible to list all tasks saved in the database.
    
     It should also be possible to perform a search, filtering tasks by `title` and `description`
    
- `PUT - /tasks/:id`
    
     It must be possible to update a task by `id`.
    
     In the `body` of the request, you must receive only the `title` and/or `description` to be updated.
    
     If only the `title` is sent, it means that the `description` cannot be updated and vice versa.
    
     Before carrying out the update, validation must be carried out whether the `id` belongs to a task saved in the database.
    
- `DELETE - /tasks/:id`
    
     It should be possible to remove a task by `id`.
    
     Before carrying out the removal, validation must be carried out whether the `id` belongs to a task saved in the database.
    
- `PATCH - /tasks/:id/complete`
    
     It must be possible to mark the task as complete or not. This means that if the task is completed, it should return to its “normal” state.
    
     Before making the change, a validation must be carried out whether the `id` belongs to a task saved in the database.


## Extra
- Validate whether the `title` and `description` properties of the `POST` and `PUT` routes are present in the `body` of the request.
- In routes that receive `/:id`, in addition to validating whether the `id` exists in the database, return the request with a message stating that the record does not exist.

## How to run the project

```bash 
# Clone the repository
https://github.com/CarlosAlmeida1/task-challenge.git

# Enter the directory
cd task-challenge

# Install the dependencies
yarn or npm install

# Start the project
yarn dev or npm run dev

# The server will start at port: 3333 - go to http://localhost:3333
```

## I learned

Even if using node without frameworks, I learned functions that give me an idea behind some technologies used in the market today,

- I deepened my knowledge of HTTP
- I learned a little more about the routes and how to use them in the best way
- I learned about Streams on the node and its importance
- I answered questions about CSV files, and how to manipulate data in them.
- I tried my best to maintain the Clean code rules even though it was a basic project

> And for the future I intend to continue studying and delve deeper into NODE JS to improve my knowledge in the backend area in which I really enjoy learning

<div align="center">

## Author

❤️ by Carlos Almeida
</div>
