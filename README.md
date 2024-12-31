<h1 align="center">$\bf{\large{\color{#6580DD} DKULF-BE-NODE }}$</h1>

## **Settings**
### 1. Node.js ( 18.18.0 LTS )
[Node.js 다운로드](https://nodejs.org/ko/) <br>
[Node.js 다운로드 참고](https://offbyone.tistory.com/441)

### 2. MongoDB 다운로드 
[MongoDB 다운로드](https://www.mongodb.com/try/download/community) <br>
[MongoDB 다운로드 참고](https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)

### 3. 서버 실행
```Bash
git clone https://github.com/DKULF/DKULF-BE-NODE.git
```
```Bash
npm install
```
```Bash
npm run dev
```
<br>

---

## **Config**
### MongoDB config by using mongoose library

이 섹션에서는 Node.js에서 Mongoose 라이브러리를 사용하여 MongoDB를 설정하는 방법을 보여줍니다.

```JS
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DKULF');
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection errors : "));
db.once("open",() => {
    console.log("DKULF Database Connected!");
});
```
- mongoose.connect: MongoDB 서버와 연결을 설정합니다. 로컬의 DKULF 데이터베이스에 연결합니다.
- db.on("error"): 연결 오류 발생 시 오류를 콘솔에 출력합니다.
- db.once("open"): 데이터베이스 연결이 성공하면 "DKULF Database Connected!" 메시지를 출력합니다.

<br>

### Swagger UI 설정

이 섹션에서는 Swagger UI를 설정하여 API 문서를 제공합니다.

```JS
const swaggerUi =  require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerSpec = YAML.load(path.join(__dirname, './build/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```
- swagger-ui-express: Swagger UI를 Express 애플리케이션에 통합합니다.
- yamljs: YAML 형식의 Swagger 파일을 읽어옵니다.
- swaggerSpec: swagger.yaml 파일을 불러와 Swagger UI 설정에 사용합니다.
- app.use('/api-docs'): Swagger UI를 /api-docs 경로에서 제공하여 API 문서를 확인할 수 있습니다.
- Swagger - http://localhost:8081/api-docs

<br>

---

## **Item Schema**
```JS
const ItemSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    tags : [ { type : String } ],
    status : Boolean,
    createdAt : String,
    image : String,
})
```
**Item Schema**는 분실물 정보를 나타내는 데이터 모델입니다. 아래는 이 스키마의 속성들에 대한 설명입니다.

### Item 객체 속성

| 속성명         | 타입          | 설명                                                                 |
|----------------|---------------|----------------------------------------------------------------------|
| **`name`**     | `String`      | 분실물의 이름 (필수).                                                |
| **`tags`**     | `Array[String]` | 분실물의 특징을 설명하는 태그들의 배열.                             |
| **`status`**   | `Boolean`     | 분실물의 상태 (보관 중이면 `true`, 수령 완료이면 `false`).           |
| **`createdAt`**| `String`      | 분실물이 등록된 날짜 (형식: 문자열).                                 |
| **`image`**    | `String`      | 분실물의 이미지 파일명 (16진수 난수로 생성된 파일명이 저장됨).     |


<br>

## **API Response Schema**

**Item Schema**는 분실물 데이터를 API 응답에서 나타내는 구조를 정의합니다.

### Item 객체 속성

| 속성명           | 타입       | 설명                                                                 |
|------------------|------------|----------------------------------------------------------------------|
| **`_id`**        | `string`   | 분실물 고유 식별자 (Primary Key).                                    |
| **`name`**       | `string`   | 분실물의 이름.                                                      |
| **`tags`**       | `array`    | 분실물의 특징을 설명하는 태그 배열.                                   |
| **`status`**     | `boolean`  | 분실물의 상태 (보관 중이면 `true`, 수령 완료이면 `false`).             |
| **`createdAt`**  | `string`   | 분실물이 등록된 날짜.                                               |
| **`image`**      | `object`   | 분실물의 이미지 파일 정보.                                           |

### Image 객체 속성

| 속성명             | 타입       | 설명                                                                 |
|--------------------|------------|----------------------------------------------------------------------|
| **`data`**         | `string`   | Base64로 인코딩된 이미지 파일 데이터.                                |
| **`ext`**          | `string`   | 이미지 파일의 확장자 (예: `.png`, `.jpg`).                          |
| **`contentType`**  | `string`   | 이미지 파일의 MIME 타입 (예: `image/png`). 

<br>

## **API Error Schema**

**Error Schema**는 API 응답에서 발생한 오류에 대한 정보를 나타냅니다.

### Error 객체 속성

| 속성명        | 타입       | 설명                                |
|---------------|------------|-------------------------------------|
| **`success`** | `boolean`  | 요청이 성공했는지 여부 (`true` 또는 `false`). |
| **`statusCode`** | `integer` | HTTP 상태 코드 (예: `400`, `404`, `500`). |
| **`message`** | `string`   | 오류에 대한 설명 메시지.             |

<br>

---

## **Test with JWT Token**
### 1. 관리자 권한 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM4MTk2OTcwfQ.EanAuFNrMS3N6YU_L2FG3JbCXfM7-F0i0DpeCgGbad0
```
- Admin Payload
```Bash
{ roles: [ 'ROLE_ADMIN' ], iat: 1735605338, exp: 1738197338 }
```
<br>

### 2. 유저 권한 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM1NjA1MzM4LCJleHAiOjE3MzgxOTczMzh9.hr2xPuDMpacD4WYSTWcfbZCRkyPYgJLfuN1dQ-rs3JA
```
- User Payload
```Bash
{ roles: [ 'ROLE_USER' ], iat: 1735605338, exp: 1738197338 }
```
<br>

### 3. 기간 만료 된 토큰 ( 테스트 용 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM1NjA0OTY5fQ.cCCQ0WzPu3SjypPNTxnQbTj5r-iiXOC4LUjeVfKbT10
```

<br>

---

## **Test with Postman**
### Register Item ( Test Page )
- http://localhost:8081/
- 해당 URL을 통해 테스트 페이지에서 분실물 등록이 가능합니다.
<img src="https://github.com/user-attachments/assets/7d96ac36-c3fa-4bc1-8470-9527aa9e489b" alt="Register Item Form" width="400" height="400">
<img src="https://github.com/user-attachments/assets/57f02ee0-db1b-42f0-8163-eff434d313f7" alt="Postman Test Result" width="400"height="400">

### 토큰에 대한 인증 미들웨어 테스트
#### 1. 헤더에 토큰이 없는 경우
![image](https://github.com/user-attachments/assets/6f1f74a4-44f7-45ec-896a-d2d68b4b6fdf)

#### 2. 기간이 만료 된 토큰인 경우 ( 3번번 토큰 이용 )
![image](https://github.com/user-attachments/assets/6f1157b9-8e54-4239-95fc-f79e8ceeda55)

#### 3. 유효하지 않은 토큰인 경우  
![image](https://github.com/user-attachments/assets/3b3a5fad-e22d-4221-9331-cd4cb2b72612)

#### 4, 유저 권한 토큰으로 관리자 API 접근 하는 경우 ( 2번번 토큰 이용 )
![image](https://github.com/user-attachments/assets/b943b741-6f8f-4cc0-92e4-18c1b0e9a6f3)

#### 5. 관리자 권한 토큰으로 관리자 API에 정상적으로 접근하는 경우 ( 1번 토큰 이용 )
![image](https://github.com/user-attachments/assets/173cbd9d-35e9-4565-9981-a885bfb53898)

---

## **Test with Swagger**
- http://localhost:8081/api-docs

