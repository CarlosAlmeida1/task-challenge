import fs from 'node:fs/promises' 

const dataBasePath = new URL('../database.json', import.meta.url, )

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
    fs.writeFile(dataBasePath, JSON.stringify(this.#database, null, 2))
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

  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          if (row[key]) {
            return row[key].toLowerCase().includes(value.toLowerCase())
          }
          return false;
        })
      })
    }

    return data
  }

  update(table,id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex >= -1){
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }

  
  }
 
}