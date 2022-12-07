import * as fs from 'node:fs/promises'
import path from 'path'
// types
import DirectoryOrFileType from '../../types/DirectoryOrFileType'

export async function postFilePath (relativePath: string, directoryOrFileName: string, isFile: boolean): Promise<DirectoryOrFileType> {
  const targetPath: string = `/host${relativePath}`

  try {
    if (!isFile) {
      await fs.mkdir(path.join(targetPath, directoryOrFileName))

      return {
        name: directoryOrFileName,
        items: []
      }
    }
  } catch (err) {
    console.error(err)
  }

  return null
} // end getFilePath
