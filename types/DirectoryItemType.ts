interface DirectoryItemType {
  name: string
  owner?: number
  size?: number
  permissions?: string
  isFile: boolean
}

export default DirectoryItemType
