<h1 align="center">K-lunch</h1>
급식 정보를 받아오는 node.js 모듈.

급식 메뉴와 영양 정보를 json으로 받아볼 수 있습니다.
<div>
<a href="https://www.npmjs.com/package/k-lunch"><img src="https://badge.fury.io/js/k-lunch.svg" alt="npm version" height="18"></a>
</div>

## 목차

- [설치](#설치)
- [테스트](#테스트)
- [사용례](#사용례)
- [폼](#폼)
- [메소드](#메소드)
- [옵션](#옵션)

## 설치
```
npm install k-lunch
```

## 테스트

```
npm run test
```

## 사용례

```js
const klunch = require('k-lunch')

const form = {
  year: 2017,
  month: 2,
  day: 7,
  time: 2, // Breakfast = 1, Lunch = 2, Dinner = 3
  name: '서정고등학교',
  phase: 4 // Elementary School = 2, Middle School = 3, High School = 4
}

const options = {
  autoCode: true,
  autoDomain: true
}

klunch.getLunch(form, (err, output) => {
  if(err) throw err
  console.log(output)
}, options)
```

## 폼

#### 구조
```js
const form = {
  year: 2017,
  month: 2,
  day: 7,
  time: 2, // 조식 = 1, 중식 = 2, 석식 = 3
  name: "yourSchoolName", // 학교 이름
  code: "yourSchoolCode", // 학교 코드
  domain: "yourDomainCode", // 교육청 코드
  phase: 4 // 초등학교 = 2, 중학교 = 3, 고등학교 = 4
}
```

## 메소드

#### .getLunch

```js
klunch.getLunch(form, callback, options)
```
#### .getNutrients

```js
klunch.getNutrients(form, callback, options)
```

## 옵션

- `autoCode: boolean` - true => 학교 코드를 자동으로 받아옴.
- `autoDomain: boolean` - true => 교육청 이름을 자동으로 받아옴.
