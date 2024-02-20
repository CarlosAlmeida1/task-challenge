import { randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'POST',
    url: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if(!title){
        JSON.stringify({ error: 'Title is required' })
      }

      if(!description){
        JSON.stringify({ error: 'Description is required' })
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
  }
]