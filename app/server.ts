import express, { Express, Request, Response } from 'express'
import { getFiles } from './fileOps.js'

const app: Express = express()
const port: number = 8080
const rootDir = process.env.ROOT_DIR === undefined
  ? '/'
  : process.env.ROOT_DIR

app.use(express.static('public'))

app.get('/', (req: Request, res: Response): void => {
  getFiles().then(console.log).catch(console.error)
  res.json({ rootDir })
})

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
