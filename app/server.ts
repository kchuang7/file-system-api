import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { getFilePath } from './fileOps/getFile.js'
import { postFilePath } from './fileOps/postFile.js'
import { putFilePath } from './fileOps/putFile.js'
import { deleteFilePath } from './fileOps/deleteFile.js'
import { getBaseUrl } from './helper.js'
// types
import DirectoryOrFileType from '../types/DirectoryOrFileType'
import FileContentType from '../types/FileContentType'
import DeleteReturnType from '../types/DeleteReturnType.js'

const app: Express = express()
const port: number = 8080

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

function handleError (err: Error, res: Response): void {
  console.error(err)
  res.sendStatus(500)
} // end handleError

app.route('/*')
  .get((req: Request, res: Response): void => {
    getFilePath(getBaseUrl(req.url))
      .then((f: DirectoryOrFileType): void => {
        res.json(f)
      })
      .catch((err: Error): void => handleError(err, res))
  }) // end GET
  .post((req: Request, res: Response): void => {
    const isFile = typeof req.query.isFile === 'string'
      ? req.query.isFile === 'true'
      : false
    const directoryOrFileName = typeof req.query.directoryOrFileName === 'string'
      ? req.query.directoryOrFileName
      : ''
    postFilePath(getBaseUrl(req.url), directoryOrFileName, isFile, req.body.contents)
      .then((f: DirectoryOrFileType): void => {
        res.json(f)
      })
      .catch((err: Error): void => handleError(err, res))
  }) // end POST
  .put((req: Request, res: Response): void => {
    const directoryOrFileName = typeof req.query.directoryOrFileName === 'string'
      ? req.query.directoryOrFileName
      : ''
    putFilePath(getBaseUrl(req.url), directoryOrFileName, req.body.contents)
      .then((f: FileContentType | null): void => {
        res.json(f)
      })
      .catch((err: Error): void => handleError(err, res))
  }) // end PUT
  .delete((req: Request, res: Response): void => {
    deleteFilePath(getBaseUrl(req.url))
      .then((f: DeleteReturnType): void => {
        if (f !== null) {
          res.sendStatus(204)
        } else {
          res.sendStatus(500)
        }
      })
      .catch((err: Error): void => handleError(err, res))
  }) // end DELETE

app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
