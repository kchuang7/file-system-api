import express, { Express, Request, Response } from 'express'
import { getFilePath } from './fileOps/getFile.js'
// types
import DirectoryOrFileType from '../types/DirectoryOrFileType'

const app: Express = express()
const port: number = 8080

app.use(express.static('public'))

app.route('/*')
  .get((req: Request, res: Response): void => {
    getFilePath(req.url)
      .then((f: DirectoryOrFileType) => {
        res.json(f)
      })
      .catch(console.error)
  })
  .post((req: Request, res: Response): void => {

  })

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
