import * as fs from 'node:fs/promises'

export async function postFilePath (relativePath: string): Promise<void> {
  const targetPath: string = `/host${relativePath}`
} // end getFilePath
