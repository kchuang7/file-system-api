import express, { Express, Request, Response } from 'express'
import { queryFilePath } from './fileOps.js'
// types
import QueryFilePathReturnType from '../types/QueryFilePathReturnType.js'

const app: Express = express()
const port: number = 8080
// const rootDir = process.env.ROOT_DIR === undefined
//   ? '/'
//   : process.env.ROOT_DIR

app.use(express.static('public'))

app.get('/*', (req: Request, res: Response): void => {
  queryFilePath(req.url)
    .then((f: QueryFilePathReturnType) => {
      res.json(f)
    })
    .catch(console.error)
})

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
