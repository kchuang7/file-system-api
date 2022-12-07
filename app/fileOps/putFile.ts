import { writeFile } from 'node:fs/promises'
import path from 'path'
import { getNameFromPath } from '../helper.js'
// types
import FileContentType from '../../types/FileContentType'

/**
 * Update existing file contents.
 * @param {string} relativePath Path of target file.
 * @param {string} contents Escaped string contents to populate file.
 * @return {Promise<FileContentType>} Updated file and contents.
 */
export async function putFilePath (
  relativePath: string,
  contents: string
): Promise<FileContentType | null> {
  const targetPath: string = path.join('/host', relativePath)
  const unescapedContents = contents.replace(/\\n/g, '\n')

  try {
    await writeFile(targetPath, unescapedContents, 'utf8')

    return {
      name: getNameFromPath(targetPath),
      contents: unescapedContents,
      isFile: true
    }
  } catch (err) {
    console.error(err)
  }

  return null
} // end putFilePath
