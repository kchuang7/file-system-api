import * as fs from 'node:fs/promises'
// types
import { Dirent, StatsBase } from 'node:fs'
import FilesType from '../types/FilesType'

export async function getFiles (relativePath: string): Promise<FilesType> {
  const files = await fs.readdir(`/host${relativePath}`, { withFileTypes: true })
  // const stats = await fs.stat('/host/Documents/hello')

  return files.map((f: Dirent) => ({
    name: f.name,
    owner: 1,
    size: 2,
    permissions: 777
  }))
}
