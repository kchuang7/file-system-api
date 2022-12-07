/**
 * Remove query string from request url.
 * @param {string} url Full request url including possible query string.
 * @return {string} Request url devoid of query string.
 */
export function getBaseUrl (url: string): string {
  return String(url.split('?').shift())
} // end getBaseUrl

/**
 * Get directory or file name from path.
 * @param {string} path Full relative path of directory of file.
 * @return {string} Directory or file name.
 */
export function getNameFromPath (path: string): string {
  return path.substring(path.lastIndexOf('/') + 1)
} // end getNameFromPath

/**
 * Convert file mode into octal string.
 * @param {number} mode POSIX file mode number.
 * @return {string} Octal string of file mode.
 */
export function modeToOctal (mode: number): string {
  return (mode & parseInt('777', 8)).toString(8)
} // end modeToOctal
