import fs from "node:fs"
import {parse} from "csv-parse"

const csvPath = new URL("./tasks.csv", import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
        delimiter: ",",
        skip_empty_lines: true,
        from_line: 2
    })

async function run() {

    const lineParse = stream.pipe(csvParse)
    
    for await (const line of lineParse) {
        const [title, description] = line

        await fetch("http://localhost:3333/tasks", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({title, description})
        })

        console.log(`Tarefa importada: ${title}`)
    }

    
    console.log("Importação finalizada!")
}

run()