const fs = require('fs')

const findByName = (arr, schoolName, isCode) => {
  for (const obj of arr)
    if (obj.schoolName === schoolName)
      return isCode ? obj.schoolCode : obj.domain

  return null
}

const arr = JSON.parse(fs.readFileSync(`${__dirname}/school-list.json`, 'utf8'))

module.exports.getCode = schoolName => {
  return findByName(arr, schoolName, true)
}

module.exports.getDomain = schoolName => {
  const domainName = findByName(arr, schoolName, false)

  let domainCode = null
  
  switch(domainName) {
    case '서울특별시':
      domainCode = 'sen'
      break
    case '부산광역시':
      domainCode = 'pen'
      break
    case '대구광역시':
      domainCode = 'dge'
      break
    case '인천광역시':
      domainCode = 'ice'
      break
    case '광주광역시':
      domainCode = 'gen'
      break
    case '대전광역시':
      domainCode = 'dge'
      break
    case '울산광역시':
      domainCode = 'use'
      break
    case '세종특별자치시':
      domainCode = 'sje'
      break
    case '경기도':
      domainCode = 'goe'
      break
    case '강원도':
      domainCode = 'kwe'
      break
    case '충청북도':
      domainCode = 'cbe'
      break
    case '충청남도':
      domainCode = 'cne'
      break
    case '전라북도':
      domainCode = 'jbe'
      break
    case '전라남도':
      domainCode = 'jne'
      break
    case '경상북도':
      domainCode = 'gbe'
      break
    case '경상남도':
      domainCode = 'gne'
      break
    case '제주특별자치도':
      domainCode = 'jje'
      break
  }

  return domainCode
}
