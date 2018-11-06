'use strict'

const codefinder = require('./codefinder')

const pad = d => (d < 10) ? '0' + d.toString() : d.toString()

module.exports = class RequestForm {
  constructor(form, options) {
    this.form = form
    this.options = options
    this.ymdArr = [form.year, form.month, form.day]

    if(this.options) {
      const schoolName = this.form.name
  
      if(this.options.autoCode) {
        const schoolCode = codefinder.getCode(schoolName)
        this.form.code = schoolCode
      }
  
      if(this.options.autoDomain) {
        const domain = codefinder.getDomain(schoolName)
        this.form.domain = domain
      }
    }
  }

  getForm() {
    const ymd = this.ymdArr.map(v => pad(v)).join('')

    const reqForm = {
      "schYmd": ymd,
      "schMmealScCode": this.form.time,
      "insttNm": this.form.name,
      "schulCode": this.form.code,
      "schulKndScCode": pad(this.form.phase),
      "schulCrseScCode": this.form.phase
    }

    return reqForm
  }

  getURL() {
    return `http://stu.${this.form.domain}.go.kr/sts_sci_md01_001.do`
  }
}