import { rm } from 'node:fs/promises'
import path from 'path'
// types
import DeleteReturnType from '../../types/DeleteReturnType'

/**
 * Delete existing directory or file.
 * @param {string} relativePath Path of target file.
 * @return {Promise<DeleteReturnType>} Updated file and contents.
 */
export async function deleteFilePath (relativePath: string): Promise<DeleteReturnType> {
  try {
    const targetPath: string = path.join('/host', relativePath)
    await rm(targetPath, { recursive: true })
    return true
  } catch (err) {
    console.error(err)
  }
  return null
} // end deleteFilePath
