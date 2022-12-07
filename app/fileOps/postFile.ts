import { mkdir } from 'node:fs/promises'
import path from 'path'
import { putFilePath } from './putFile.js'
// types
import DirectoryOrFileType from '../../types/DirectoryOrFileType'

/**
 * Create directory or file.
 * @param {string} relativePath Path of target directory or file.
 * @param {string} directoryOrFileName Desired name of directory of file to be created.
 * @param {boolean} isFile Whether or not object to be created is a file or directory.
 * @param {string} contents Escaped string contents to populate file.
 * @return {Promise<DirectoryOrFileType>} Created directory or file.
 */
export async function postFilePath (
  relativePath: string,
  directoryOrFileName: string,
  isFile: boolean,
  contents: string
): Promise<DirectoryOrFileType> {
  const targetPath: string = `/host${relativePath}`

  try {
    if (!isFile) {
      await mkdir(path.join(targetPath, directoryOrFileName))

      return {
        name: directoryOrFileName,
        items: []
      }
    } else {
      return await putFilePath(relativePath, directoryOrFileName, contents)
    }
  } catch (err) {
    console.error(err)
  }

  return null
} // end getFilePath
