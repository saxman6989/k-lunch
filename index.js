const cheerio = require('cheerio')
const request = require('request')
const codefinder = require('./lib/codefinder')
const requestForm = require('./lib/request-data')

const pad = d => (d < 10) ? '0' + d.toString() : d.toString()

module.exports.getLunch = (form, callback, options) => {
  const reqForm = new requestForm(form, options)

  request({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: reqForm.getURL(),
    form: reqForm.getForm()
  }, (err, res_post, body) => {
    if(err) {
      return callback(err, null)
    } else {
      const $ = cheerio.load(body, {decodeEntities: false})
      const mixedDate = reqForm.ymdArr.map(v => pad(v)).join('.')

      let index = 0
      let data = ''
      let dataArr = []
      let output = []

      $('table > thead > tr').each(function() {
        let rows = $(this).find('th')
        
        for(let i = 1; i < 8; i++) {
          let rowText = rows.eq(i).text();
          rowText.search(mixedDate) !== -1 ? index = i : i
        }
      });

      const findByRow = function(n) {
        let obj = {}

        $('table > tbody').each(function() {
          let lunchTr = $(this).find('tr').eq(n)
          obj.key = lunchTr.find('th').html()
          obj.value = lunchTr.find('td').eq(index - 1).html()
          return false
        })

        return obj
      }

      data = findByRow(1).value

      if(data === null || $('table > thead > tr > td').text() === '자료가 없습니다.') {
        return callback("There's no data in table.", null)
      } else {
        dataArr = data.split('<br>')
        dataArr.pop()

        dataArr.forEach(menu => {
          menu = menu.replace(/^\d+/g, '')

          let intIndex = menu.search(/\d/)
          let dataSchema = {
            menu: '',
            allergyInfo: ''
          }

          if(intIndex === -1) {
            dataSchema.menu = menu
          } else {
            dataSchema.menu = menu.replace(/\d+|\.|\*/g, '')
            dataSchema.allergyInfo = menu.substring(intIndex, menu.length - 1).split('.')
          }
          
          output.push(dataSchema)
        })

        if(!output[0]) {
          return callback("There's no data in table.", null)
        } else {
          return callback(null, output)
        }
      }
    }
  });
}

module.exports.getNutrients = (form, callback, options) => {
  const reqForm = new requestForm(form, options)

  request({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: reqForm.getURL(),
    form: reqForm.getForm()
  }, (err, res_post, body) => {
    if(err) {
      return callback(err, null)
    } else {
      const $ = cheerio.load(body, {decodeEntities: false})
      const mixedDate = reqForm.ymdArr.map(v => pad(v)).join('.')

      let index = 0
      let output = {}

      $('table > thead > tr').each(function() {
        let rows = $(this).find('th')
        
        for(let i = 1; i < 8; i++) {
          let rowText = rows.eq(i).text();
          if(rowText.search(mixedDate) !== -1){
          	index = i
        	}
        }
      });

      const findByRow = function(n) {
        let obj = {}

        $('table > tbody').each(function() {
          let lunchTr = $(this).find('tr').eq(n)
          obj.key = lunchTr.find('th').html()
          obj.value = lunchTr.find('td').eq(index - 1).html()
          return false
        })

        return obj
      }

      const getNuts = () => {
        let obj = {}
        for(let i = 44; i < 54; i++) {
          let rowObj = findByRow(i)
          if(rowObj.value !== '') {
            obj[rowObj.key] = rowObj.value
          }
        }
        return obj
      }

      const isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object

      output = getNuts()

      if(isObjectEmpty(output)) {
        return callback("There's no data in table.", null)
      } else {
        return callback(null, output)
      }   
    }
  })
}