import { parse } from 'csv-parse';
import fs from 'node:fs';
import fetch from 'node-fetch';

const pathCSV = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(pathCSV);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 
});

async function createPathCsv() {
  const lineParse = stream.pipe(csvParse);

  for await (const line of lineParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })


  }

}

createPathCsv()
