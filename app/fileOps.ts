import * as fs from 'node:fs/promises'
import { StatsBase } from 'node:fs'

interface ReturnType {
  files: string[]
  stats: StatsBase<number>
}

export async function getFiles (): Promise<ReturnType> {
  const files = await fs.readdir('/host')
  const stats = await fs.stat('/host/Documents/hello')

  return { files, stats }
}
