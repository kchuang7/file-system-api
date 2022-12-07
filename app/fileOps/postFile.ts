import { mkdir, writeFile } from 'node:fs/promises'
import path from 'path'
// types
import DirectoryOrFileType from '../../types/DirectoryOrFileType'

export async function postFilePath (
  relativePath: string,
  directoryOrFileName: string,
  isFile: boolean,
  contents: string
): Promise<DirectoryOrFileType> {
  const targetPath: string = `/host${relativePath}`
  const unescapedContents = contents.replace(/\\n/g, '\n')

  try {
    if (!isFile) {
      await mkdir(path.join(targetPath, directoryOrFileName))

      return {
        name: directoryOrFileName,
        items: []
      }
    } else {
      await writeFile(path.join(targetPath, directoryOrFileName), unescapedContents, 'utf8')

      return {
        name: directoryOrFileName,
        contents: unescapedContents,
        isFile: true
      }
    }
  } catch (err) {
    console.error(err)
  }

  return null
} // end getFilePath
