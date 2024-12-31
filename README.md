<h1 align="center">$\bf{\large{\color{#6580DD} DKULF-BE-NODE }}$</h1>

## 개발 환경
### Main Dependency
- [x] Express.js
- [x] MongoDB
- [x] Mongoose
- [x] JsonWebToken
- [x] Swagger

<br>

## 주요 의존성과 간략한 특징

### 1. Express.js  
- RESTful API와 서버 구축에 사용된 Node.js 기반의 웹 애플리케이션 프레임워크입니다.  
- 미들웨어 구조를 통해 요청과 응답 처리 로직을 명확하게 분리하고, 코드의 유지보수를 용이하게 했습니다.  
- 경로별 라우팅 시스템을 활용하여 API 엔드포인트를 체계적으로 관리할 수 있었습니다.  

### 2. MongoDB  
- 문서(Document) 기반의 NoSQL 데이터베이스를 사용하여 데이터를 유연하게 저장했습니다.  
- 스키마 설계에 유연성을 부여하여 데이터 중복을 허용하며, 구조화되지 않은 데이터도 효과적으로 관리할 수 있었습니다.  
- 대규모 데이터를 처리할 수 있는 확장성을 바탕으로 빠른 데이터 저장 및 검색이 가능했습니다.  

### 3. Mongoose  
- MongoDB와의 상호작용을 단순화하기 위해 Mongoose ODM(Object Data Modeling) 라이브러리를 사용했습니다.  
- 스키마를 정의하여 데이터의 유효성을 검사하고, 복잡한 쿼리를 보다 직관적으로 구현할 수 있었습니다.  
- 미들웨어 기능을 활용해 데이터 저장 전 후 처리 작업(예: 암호화, 시간 기록)을 자동화했습니다.  

### 4. JsonWebToken (JWT)  
- 사용자 인증 및 권한 부여를 위해 JWT를 도입했습니다.  
- Express의 미들웨어를 통해 API 요청 시 토큰의 유효성을 검사하고, GET 요청을 제외한 모든 요청에서 인증을 요구했습니다.  
- 토큰 기반의 무상태 인증 방식을 통해 서버의 세션 관리 부담을 줄이고, 확장성을 높였습니다.  

### 5. Swagger  
- API 설계와 문서화를 위해 Swagger를 활용했습니다.  
- 작성한 API 명세서를 기반으로 자동화된 UI를 생성하여 클라이언트가 API를 쉽게 테스트하고 사용할 수 있도록 했습니다.  
- 명세서 기반의 협업을 통해 개발 속도와 효율성을 크게 향상시켰습니다.  

--- 

## **Settings**
### 1. Node.js (18.18.0 LTS)
- <a href="https://nodejs.org/ko/">Node.js Download</a>  
- <a href="https://offbyone.tistory.com/441">Node.js Download Reference</a>  

### 2. MongoDB 다운로드
- <a href="https://www.mongodb.com/try/download/community">MongoDB Download</a>  
- <a href="https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0">MongoDB Download Reference</a>  

### 3. 서버 실행 방법
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
### MongoDB Config

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
- **mongoose.connect**: MongoDB 서버와 연결을 설정합니다. 로컬의 DKULF 데이터베이스에 연결합니다.
- **db.on("error")**: 연결 오류 발생 시 오류를 콘솔에 출력합니다.
- **db.once("open")**: 데이터베이스 연결이 성공하면 "DKULF Database Connected!" 메시지를 출력합니다.

<br>

### Swagger UI 설정

이 섹션에서는 Swagger UI를 설정하여 API 문서를 제공합니다.

```JS
const swaggerUi =  require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerSpec = YAML.load(path.join(__dirname, './build/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```
- **swagger-ui-express**: Swagger UI를 Express 애플리케이션에 통합합니다.
- **yamljs**: YAML 형식의 Swagger 파일을 읽어옵니다.
- **swaggerSpec**: swagger.yaml 파일을 불러와 Swagger UI 설정에 사용합니다.
- **app.use('/api-docs')**: Swagger UI를 /api-docs 경로에서 제공하여 API 문서를 확인할 수 있습니다.
- **Swagger** - http://localhost:8081/api-docs

<br>

---

## **Data Schema**
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
API 사용 시 GET 요청을 제외한 모든 요청은 인증을 위해 JWT(Json Web Token) 토큰이 필요합니다. <br>
JWT는 사용자 인증과 권한 부여를 위해 사용되며, 서버와 클라이언트 간의 안전한 정보 교환을 보장합니다. <br>
이를 통해 무단 접근을 방지하고, API의 보안을 강화할 수 있습니다. <br>

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

## **API URI Collection**


---

<br>

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

