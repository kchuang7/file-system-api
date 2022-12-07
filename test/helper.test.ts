import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getBaseUrl, getNameFromPath, modeToOctal } from '../app/helper.js'

describe('getBaseUrl return value', (): void => {
  it('should convert /test/path?query1=value1&query2=value2 to /test/path', (): void => {
    expect(getBaseUrl('/test/path?query1=value1&query2=value2')).to.equal('/test/path')
  })
  it('should keep /test/path the same', (): void => {
    expect(getBaseUrl('/test/path')).to.equal('/test/path')
  })
})

describe('getNameFromPath return value', (): void => {
  it('should extract myName from /test/path/myName', (): void => {
    expect(getNameFromPath('/test/path/myName')).to.equal('myName')
  })
})

describe('modeToOctal return value', (): void => {
  it('should convert 511 to 777', (): void => {
    expect(modeToOctal(511)).to.equal('777')
  })
})
