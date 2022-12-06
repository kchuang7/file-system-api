import * as fs from 'node:fs/promises'
import { modeToOctal } from './helper.js'
// types
import { Dirent, StatsBase } from 'node:fs'
import FilesItemType from '../types/FilesItemType'
import FilesType from '../types/FilesType'

export async function queryFilePath (relativePath: string): Promise<FilesType> {
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
    console.log('i\'m a file')
    return []
  } else {
    return []
  }
} // end queryFilePath
