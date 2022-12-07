import { writeFile } from 'node:fs/promises'
import path from 'path'
// types
import FileContentType from '../../types/FileContentType'

/**
 * Update existing file contents.
 * @param {string} relativePath Path of target file.
 * @param {string} fileName File name.
 * @param {string} contents Escaped string contents to populate file.
 * @return {Promise<FileContentType>} Updated file and contents.
 */
export async function putFilePath (
  relativePath: string,
  fileName: string,
  contents: string
): Promise<FileContentType | null> {
  const targetPath: string = `/host${relativePath}`
  const unescapedContents = contents.replace(/\\n/g, '\n')

  try {
    await writeFile(path.join(targetPath, fileName), unescapedContents, 'utf8')

    return {
      name: fileName,
      contents: unescapedContents,
      isFile: true
    }
  } catch (err) {
    console.error(err)
  }

  return null
} // end putFilePath
