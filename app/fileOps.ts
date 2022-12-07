import * as fs from 'node:fs/promises'
import { modeToOctal } from './helper.js'
// types
import { Dirent, StatsBase } from 'node:fs'
import FilesType from '../types/FilesType.js'
import FileContentType from '../types/FileContentType.js'
import QueryFilePathReturnType from '../types/QueryFilePathReturnType.js'
import FilesItemType from '../types/FilesItemType'

/**
 * Fetch contents of target directory.
 * @param {string} targetPath Path of target directory.
 * @return {Promise<FilesType>} List of directories and files inside target directory.
 */
async function getDirectory (targetPath: string): Promise<FilesType> {
  // fetch directory contents
  const files = await fs.readdir(targetPath, { withFileTypes: true })
  // construct array of fs.stat promises
  const stats = await Promise.all(files.map(async (f: Dirent) =>
    await fs.stat(`${targetPath}/${f.name}`))
  )

  return stats.map((s: StatsBase<number>, i: number): FilesItemType => {
    const isFile = files[i].isFile()
    return {
      name: files[i].name,
      owner: isFile ? s.uid : undefined,
      size: isFile ? s.size : undefined,
      permissions: isFile ? modeToOctal(s.mode) : undefined,
      isFile
    }
  })
} // end getDirectory

/**
 * Fetch contents of target file.
 * @param {string} targetPath Path of target file.
 * @param {StatsBase<number>} targetStat Target file stats.
 * @return {Promise<FileContentType>} Target file contents and stats.
 */
async function getFile (targetPath: string, targetStat: StatsBase<number>): Promise<FileContentType> {
  const contents = await fs.readFile(targetPath, { encoding: 'utf8' })

  return {
    contents,
    name: targetPath.substring(targetPath.lastIndexOf('/') + 1),
    owner: targetStat.uid,
    size: targetStat.size,
    permissions: modeToOctal(targetStat.mode),
    isFile: true
  }
} // end getFile

/**
 * Determine if target path maps to directory or file and returns respective data.
 * @param {string} relativePath Path of target directory or file.
 * @return {Promise<QueryFilePathReturnType>} Target directory or file contents and stats.
 */
export async function queryFilePath (relativePath: string): Promise<QueryFilePathReturnType> {
  const targetPath: string = `/host${relativePath}`
  const targetStat = await fs.stat(targetPath)

  if (targetStat.isDirectory()) {
    return await getDirectory(targetPath)
  } else if (targetStat.isFile()) {
    return await getFile(targetPath, targetStat)
  } else {
    return []
  }
} // end queryFilePath
