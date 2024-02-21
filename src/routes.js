import { randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { start } from "node:repl"

const database = new Database()

export const routes = [
  {
    method: 'POST',
    url: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if(!title){
        return res.writeHead(400)
        .end(JSON.stringify({ error: 'Title is required' }))
      }

      if(!description){
        return res.writeHead(400)
        .end(JSON.stringify({ error: 'Description is required' }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toLocaleDateString('pt-BR'),
        updated_at: new Date().toLocaleDateString('pt-BR')
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
      
    }
  },
  {
    method: 'GET',
    url: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))
    }

  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'missing title or description' })
        )
      }

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date().toLocaleDateString('pt-BR')
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {id} = req.params

      const [task] = database.select('tasks', { id })

      if(!task){
        return res.writeHead(404).end()
      }

      database.delete('tasks', id)

      res.writeHead(204).end()
    }
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const {id} = req.params

      const [task] = database.select("tasks", { id })

      if(!task){
        return res.writeHead(404).end()
      }

      const isCompletedTask = task.completed_at !== null
      const completed_at = isCompletedTask ? null : new Date().toLocaleDateString('pt-BR')

      database.update("tasks", id, {completed_at})

      res.writeHead(204).end()
      
    }
  }
]