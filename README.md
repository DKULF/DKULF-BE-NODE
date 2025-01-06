<h1 align="center">$\bf{\large{\color{#6580DD} DKULF \ Backend \ Resource \ Server }}$</h1>

## 개발 환경
### Main Dependency
- [x] Express.js
- [x] MongoDB
- [x] Mongoose
- [x] JsonWebToken
- [x] Swagger

<br>

## Key Dependencies and Features

### 1. Express.js  
- RESTful API와 서버 구축에 사용된 Node.js 기반의 웹 애플리케이션 프레임워크
- 미들웨어 구조를 통해 요청과 응답 처리 로직을 명확하게 분리 및 유지보수의 효율성 확대
- 경로별 라우팅 시스템을 활용하여 API 엔드포인트를 체계적으로 관리

### 2. MongoDB  
- 문서(Document) 기반의 NoSQL 데이터베이스를 사용하여 데이터를 유연하게 저장 
- 스키마 설계에 유연성을 부여하여 데이터 중복을 허용하며, 구조화되지 않은 데이터를 효과적으로 관리
- 대규모 데이터를 처리할 수 있는 확장성을 바탕으로 빠른 데이터 저장 및 검색

### 3. Mongoose  
- MongoDB와의 상호작용을 단순화하기 위해 Mongoose ODM 라이브러리를 사용
- 스키마를 정의하여 데이터의 유효성을 검사하고, 복잡한 쿼리를 보다 직관적으로 구현
- 미들웨어 기능을 활용해 데이터 저장 전 후 처리 작업을 자동화

### 4. JsonWebToken (JWT)  
- 사용자 인증 및 권한 부여를 위해 JWT를 도입
- Express의 미들웨어를 통해 API 요청 시 토큰의 유효성을 검사하고, GET 요청을 제외한 모든 요청에서 인증을 요구
- 토큰 기반의 무상태 인증 방식을 통해 서버의 세션 관리 부담 감소

### 5. Swagger  
- API 설계와 문서화를 위해 Swagger를 활용
- 작성한 API 명세서를 기반으로 자동화된 UI를 생성하여 클라이언트가 API를 쉽게 테스트
- 명세서 기반의 협업을 통해 개발 속도와 효율성을 크게 향상

--- 

## **Settings**
### 1. Node.js & NVM Download ( Use 18.18.0 Version )
#### Ubuntu Bash Environment
```Bash
sudo apt update
```
```Bash
sudo apt install nodejs npm
```
```Bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
```Bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```
```Bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```
```Bash
nvm ls-remote
nvm install 18.18.0
```
#### GUI Environment
- <a href="https://nodejs.org/ko/">Node.js Download</a>  
- <a href="https://offbyone.tistory.com/441">Node.js Download Reference</a>  

<br>

### 2. MongoDB
#### Ubuntu Bash Environment

```Bash
sudo apt install wget curl gnupg2 software-properties-common apt-transport-https ca-certificates
```
```Bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-server-7.0.gpg
```
```Bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu \
$(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```
```Bash
sudo apt update
```
```Bash
sudo apt install mongodb-org
```Bash
sudo systemctl enable --now mongod
sudo systemctl status mongod
```
```Bash
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
mongod --version
```

#### GUI Environment
- <a href="https://www.mongodb.com/try/download/community">MongoDB Download</a>  
- <a href="https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0">MongoDB Download Reference</a>  

<br>

### 3. 서버 실행 방법
```Bash
git clone https://github.com/DKULF/DKULF-BE-NODE.git
```
```Bash
cd ./DKULF-BE-NODE
```
```Bash
npm install
```
```Bash
npm run dev
```
- **서버 실행 시 출력 화면**
![image](https://github.com/user-attachments/assets/2576507a-8ef4-4d0c-811e-e2de57d81aff)

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

### JWT Authentication Middleware

이 섹션에서는 Node.js에서 jsonwebtoken 라이브러리를 사용하여 인증 미들웨어 구현 형태를 보여줍니다.

```JS
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SECRET_KEY';

const authenticateJWT = async (req, res, next) => {

    if (req.method === 'GET' || req.url.includes('/test')) {
        return next();
    }
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ErrorMessage...
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const decodeToken = jwt.decode(token);
        const role = decodeToken.roles[0];

        if (req.url.includes('/admin')) {
            return ErrorMessage...
        }
        jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });       
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
             return ErrorMessage...
        }
        return ErrorMessage...
    }
};
```
- **JWT 인증**: `jsonwebtoken` 라이브러리를 사용하여 API 요청의 JWT 토큰을 검증.  
- **예외 처리**: GET 요청 및 특정 경로(`/test`, `/admin`)에 대해 인증 로직을 조건부 적용.  
- **역할 기반 권한 부여**: 디코드된 토큰의 역할(`roles`)을 검사하여 관리자 및 일반 사용자의 접근 권한 관리.  
- **유효성 검사**: 토큰 유효성(`verify`)과 만료 시간(`TokenExpiredError`)을 확인하여 보안을 강화.  
- **Middleware Integration**: Express 미들웨어로 구현되어 요청을 사전에 검증, 코드의 일관성과 재사용성 확보.  

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

## **Test JWT Authentication**
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

### 4. PostMan을 이용한 인증 미들웨어 테스트
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

<br>

---

<br>

## **API URI Collection**
### Register Item ( Test Page )
- http://localhost:8081/
- 해당 URL을 통해 테스트 페이지에서 분실물 등록이 가능합니다.
<img src="https://github.com/user-attachments/assets/7d96ac36-c3fa-4bc1-8470-9527aa9e489b" alt="Register Item Form" width="400" height="400">
<img src="https://github.com/user-attachments/assets/57f02ee0-db1b-42f0-8163-eff434d313f7" alt="Postman Test Result" width="400"height="400">

<br>

### Swagger URI Collection
![image](https://github.com/user-attachments/assets/ca3eaeb6-e45d-4d03-937e-bbd7957bf27a)

## API Endpoints
### Items Management

#### **GET** `/items`
- **Description**: Retrieve all item data.
- **Authentication**: Not required.
- **Curl**
```Bash
curl -X 'GET' 
  'http://localhost:8081/items' 
  -H 'accept: application/json'
```
- **Request URL**
```Bash
http://localhost:8081/items
```
- **Success Response**
```JS
Status: 200 OK
{
	"success":true,
	"count":2,
	"items" :
    [
        {
        "_id": "6771f251f763dedbd48654da",
        "name": "우산",
        "tags": [
            "우산",
            "공학관",
            "검정색"
        ],
        "status": true,
        "createdAt": "2024.12.30",
        "image": {
            "data": IMAGE_FILE_DATA
            "ext": ".png",
            "contentType": "image/png"
        },
        "__v": 0
        },
        ... other items
    ]
}
```
- **Error Response**
```JS
Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```
<br>

#### **GET** `/item/{itemId}`
- **Description**: Retrieve details of a specific item by its ID.
- **Authentication**: Not required.
- **Curl**
```Bash
curl -X 'GET' 
  'http://localhost:8081/item/<int:ItemId>' 
  -H 'accept: application/json'
```
- **Request URL**
```Bash
http://localhost:8081/item/<int:ItemId>
```
- **Success Response**
```JS
Status: 200 OK

{
    "success": true,
    "item" : {
        "_id": "6771f251f763dedbd48654da",
        "name": "우산",
        "tags": [
            "우산",
            "공학관",
            "검정색"
        ],
        "status": true,
        "createdAt": "2024.12.30",
        "image": {
            "data": 
            "ext": ".png",
            "contentType": "image/png"
        },
        "__v": 0
    }
}
```
- **Error Response**
```JS
Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "유효하지 않은 아이디 형식입니다."
}

Status: 404 NOT_FOUND
{
  "statusCode": 404,
  "success": false,
  "message": "해당 아이디의 데이터가 존재하지 않습니다."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```
<br>

#### **GET** `/items/{keyword}`
- **Description**: Search for items based on a keyword.
- **Authentication**: Not required.
- **Curl**
```Bash
curl -X 'GET' 
  'http://localhost:8081/items/<String:keyword>' 
  -H 'accept: application/json'
```
- **Request URL**
```Bash
http://localhost:8081/items/<String:keyword>
```
- **Success Response**
```JS
Status: 200 OK

# 검색에 대한 결과 존재
{
    "success": true,
        "count": 1,
        "items": [
        {
            "_id": "6771f251f763dedbd48654da",
            "name": "우산",
            "tags": [
            "우산",
            "공학관",
            "검정색"
            ],
            "status": true,
            "createdAt": "2024.12.30",
            "image": {
            "data": IMAGE_DATA
            "ext": ".png",
            "contentType": "image/png"
            },
            "__v": 0
        },
        ... other data
        ]
    }
}

# 검색에 대한 결과가 존재하지 않을때
{ "success":true, "count":0, "items":[]}
```
- **Error Response**
```JS
Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "유효하지 않은 키워드입니다. 검색어를 입력해주세요."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```
<br>

#### **POST** `/item`
- **Description**: Add a new item.
- **Authentication**: Required (JWT).
- **Curl**
```Bash
curl -X 'POST' 
  'http://localhost:8081/item' 
  -H 'accept: application/json' 
  -H 'Authorization: Bearer <JWT Token>' 
  -H 'Content-Type: multipart/form-data' 
  -F 'name=<String:name>' 
  -F 'tags=<String:tags>' 
  -F 'image=;type=image/*'
```
- **Request URL**
```Bash
http://localhost:8081/item
```
- **Success Response**
```JS
Status: 201 OK
{
  "success": true,
  "statusCode": 201,
  "message": "분실물 등록이 완료되었습니다."
}
```
- **Error Response**
```JS
Status: 499 Refresh_TOKEN 요청을 위해 특수한 에러코드 사용
{
  "success": false,
  "statusCode": 499,
  "message": "토큰이 만료되었습니다. 다시 로그인 해주세요."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "유효하지 않은 토큰입니다."
}

Status: 401 Unauthorized
{
  "success": false,
  "statusCode": 401,
  "message": "인증 토큰이 필요합니다."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "분실물에 대한 이름을 입력해주세요."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "분실물에 대한 사진을 등록해주세요."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "이미지 파일의 최대 크기는 5MB 입니다."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "이미지 파일만 등록가능합니다. 다시 시도해 주세요."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "이미지 처리 중 오류가 발생하였습니다. 다시 시도해주세요."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```

<br>

### Admin Actions

#### **PATCH** `/admin/item/{itemId}`
- **Description**: Update the status of an item.
- **Authentication**: Required (Admin JWT).
- **Curl**
```Bash
curl -X 'PATCH' 
  'http://localhost:8081/admin/item/<int:ItemId>'
  -H 'accept: application/json' 
  -H 'Authorization: Bearer <JWT Token>' 
  -H 'Content-Type: application/json' 
  -d '{ "status": <Boolean:status> }'
```
- **Request URL**
```Bash
http://localhost:8081/admin/item/<int:ItemId>
```
- **Success Response**
```JS
Status: 200 OK
{
  "success": true,
  "statusCode": 200,
  "message": "분실물 상태가 성공적으로 업데이트 되었습니다."
}
```
- **Error Response**
```JS
Status: 499 Refresh_TOKEN 요청을 위해 특수한 에러코드 사용
{
  "success": false,
  "statusCode": 499,
  "message": "토큰이 만료되었습니다. 다시 로그인 해주세요."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "유효하지 않은 토큰입니다."
}

Status: 401 Unauthorized
{
  "success": false,
  "statusCode": 401,
  "message": "인증 토큰이 필요합니다."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "관리자만 접근가능합니다."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "유효하지 않은 아이디 형식입니다."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "분실물에 대한 상태 데이터가 필요합니다."
}

Status: 404 NOT_FOUND
{
  "statusCode": 404,
  "success": false,
  "message": "해당 아이디의 데이터가 존재하지 않습니다."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```
<br>

#### **DELETE** `/admin/item/{itemId}`
- **Description**: Delete an item and its associated image.
- **Authentication**: Required (Admin JWT).
- **Curl**
```Bash
curl -X 'DELETE' 
  'http://localhost:8081/admin/item/<int:ItemId>'
  -H 'accept: application/json' 
  -H 'Authorization: Bearer <JWT Token>' 
  -H 'Content-Type: application/json' 
```
- **Request URL**
```Bash
http://localhost:8081/admin/item/<int:ItemId>
```
- **Success Response**
```JS
Status: 200 OK
{
  "success": true,
  "statusCode": 200,
  "message": "아이템과 해당 이미지 파일이 삭제되었습니다."
}
```
- **Error Response**
```JS
Status: 499 Refresh_TOKEN 요청을 위해 특수한 에러코드 사용
{
  "success": false,
  "statusCode": 499,
  "message": "토큰이 만료되었습니다. 다시 로그인 해주세요."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "유효하지 않은 토큰입니다."
}

Status: 401 Unauthorized
{
  "success": false,
  "statusCode": 401,
  "message": "인증 토큰이 필요합니다."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "관리자만 접근가능합니다."
}

Status: 400 BAD_REQUEST
{
  "statusCode": 400,
  "success": false,
  "message": "유효하지 않은 아이디 형식입니다."
}

Status: 404 NOT_FOUND
{
  "statusCode": 404,
  "success": false,
  "message": "해당 아이디의 데이터가 존재하지 않습니다."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```
<br>

#### **DELETE** `/admin/items`
- **Description**: Delete all items and their associated image files.
- **Authentication**: Required (Admin JWT).
- **Curl**
```Bash
curl -X 'DELETE' 
  'http://localhost:8081/admin/items'
  -H 'accept: application/json' 
  -H 'Authorization: Bearer <JWT Token>' 
  -H 'Content-Type: application/json' 
```
```Bash
http://localhost:8081/admin/items
```
- **Success Response**
```JS
Status: 200 OK
{
  "success": true,
  "statusCode": 200,
  "message": "아이템과 해당 이미지 파일이 삭제되었습니다."
}
```
- **Error Response**
```JS
Status: 499 Refresh_TOKEN 요청을 위해 특수한 에러코드 사용
{
  "success": false,
  "statusCode": 499,
  "message": "토큰이 만료되었습니다. 다시 로그인 해주세요."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "유효하지 않은 토큰입니다."
}

Status: 401 Unauthorized
{
  "success": false,
  "statusCode": 401,
  "message": "인증 토큰이 필요합니다."
}

Status: 403 Forbidden
{
  "success": false,
  "statusCode": 403,
  "message": "관리자만 접근가능합니다."
}

Status: 500 SERVER_ERROR
{
  "statusCode": 500,
  "success": false,
  "message": "데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요."
}
```

---

