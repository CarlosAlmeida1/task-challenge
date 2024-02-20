import fs from 'node:fs/promises' 

const dataBasePath = new URL('../database.json', import.meta.url)

export class Database {
  #database = {}
  
  constructor() {
    fs.readFile(dataBasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }
  
  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }
   
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }


}