import express, { Express, Request, Response } from 'express'
import { getFiles } from './fileOps.js'
// types
import FilesType from '../types/FilesType.js'

const app: Express = express()
const port: number = 8080
// const rootDir = process.env.ROOT_DIR === undefined
//   ? '/'
//   : process.env.ROOT_DIR

app.use(express.static('public'))

app.get('/*', (req: Request, res: Response): void => {
  getFiles(req.url)
    .then((f: FilesType) => {
      res.json(f)
    })
    .catch(console.error)
})

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
