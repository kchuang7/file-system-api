/**
 * Convert file mode into octal string.
 * @param {number} mode POSIX file mode number.
 * @return {string} Octal string of file mode.
 */
export function modeToOctal (mode: number): string {
  return (mode & parseInt('777', 8)).toString(8)
}
