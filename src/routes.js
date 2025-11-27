import {randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {

            const {search} = req.query

            const tasks = database.select("tasks", search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const {title, description} = req.body

            if(!title || !description) {
                return res.writeHead(404).end(JSON.stringify({message: "Titulo e descrição são obrigatórios!"}))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            database.insert("tasks", task)

            return res.writeHead(201).end()
        }
    }, 
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {

            const {id} = req.params
            const {title, description} = req.body

            if(!title && !description) {
                return res.writeHead(404).end(JSON.stringify({
                    message: "Titulo ou descrição são obrigatórios para atualizar"
                }))
            }

            const rowExisted =  database.update("tasks", id, {
                ...(title !== undefined && {title}),
                ...(description !== undefined && {description})
            })

            if(!rowExisted) {
                return res.writeHead(404).end(JSON.stringify({message: "Task não encontrada"}))
            }

            return res.writeHead(204).end()
        }    
    }, 
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const {id} = req.params

            const rowExisted =  database.delete("tasks", id)
            
            if(!rowExisted) {
                return res.writeHead(404).end(JSON.stringify({message: "Task não encontrada"}))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const {id} = req.params

            const rowExisted =  database.complete("tasks", id)

            if(!rowExisted) {
                return res.writeHead(404).end(JSON.stringify({message: "Task não encontrada"}))
            }

            return res.writeHead(200).end()
        }
    }
]