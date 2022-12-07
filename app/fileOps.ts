import * as fs from 'node:fs/promises'
import { modeToOctal } from './helper.js'
// types
import { Dirent, StatsBase } from 'node:fs'
import QueryFilePathReturnType from '../types/QueryFilePathReturnType.js'
import FilesItemType from '../types/FilesItemType'

export async function queryFilePath (relativePath: string): Promise<QueryFilePathReturnType> {
  const targetPath: string = `/host${relativePath}`
  const targetStat = await fs.stat(targetPath)

  if (targetStat.isDirectory()) {
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
  } else if (targetStat.isFile()) {
    const contents = await fs.readFile(targetPath, { encoding: 'utf8' })
    const stats = await fs.stat(targetPath)

    return {
      contents,
      name: relativePath.substring(relativePath.lastIndexOf('/') + 1),
      owner: stats.uid,
      size: stats.size,
      isFile: true
    }
  } else {
    return []
  }
} // end queryFilePath
