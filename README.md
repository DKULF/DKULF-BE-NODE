# DKULF-BE-NODE

## Settings
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

### 4. 테스트를 위한 JWT 토큰
#### 4-1. 관리자 권한 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM4MTk2OTcwfQ.EanAuFNrMS3N6YU_L2FG3JbCXfM7-F0i0DpeCgGbad0
```
- Admin Payload
```Bash
{ roles: [ 'ROLE_ADMIN' ], iat: 1735605338, exp: 1738197338 }
```
<br>

#### 4-2. 유저 권한 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM1NjA1MzM4LCJleHAiOjE3MzgxOTczMzh9.hr2xPuDMpacD4WYSTWcfbZCRkyPYgJLfuN1dQ-rs3JA
```
- User Payload
```Bash
{ roles: [ 'ROLE_USER' ], iat: 1735605338, exp: 1738197338 }
```
<br>

#### 4-3. 기간 만료 된 토큰 ( 테스트 용 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM1NjA0OTY5fQ.cCCQ0WzPu3SjypPNTxnQbTj5r-iiXOC4LUjeVfKbT10
```
<br>

## Test with Postman
### Register Item ( Test Page )
- http://localhost:8081
- 해당 URL을 통해 테스트 페이지에서 분실물 등록이 가능합니다.
<img src="https://github.com/user-attachments/assets/7d96ac36-c3fa-4bc1-8470-9527aa9e489b" alt="Register Item Form" width="400" height="400">
<img src="https://github.com/user-attachments/assets/57f02ee0-db1b-42f0-8163-eff434d313f7" alt="Postman Test Result" width="400" height="400">

### 토큰에 대한 인증 미들웨어 테스트
#### 1. 헤더에 토큰이 없는 경우
![image](https://github.com/user-attachments/assets/6f1f74a4-44f7-45ec-896a-d2d68b4b6fdf)

#### 2. 기간이 만료 된 토큰인 경우 ( 4-3 토큰 이용 )
![image](https://github.com/user-attachments/assets/6f1157b9-8e54-4239-95fc-f79e8ceeda55)

#### 3. 유효하지 않은 토큰인 경우  
![image](https://github.com/user-attachments/assets/3b3a5fad-e22d-4221-9331-cd4cb2b72612)

#### 4, 유저 권한 토큰으로 관리자 API 접근 하는 경우 ( 4-2 토큰 이용 )
![image](https://github.com/user-attachments/assets/b943b741-6f8f-4cc0-92e4-18c1b0e9a6f3)

#### 5. 관리자 권한 토큰으로 관리자 API에 정상적으로 접근하는 경우 ( 4-1 토큰 이용 )
![image](https://github.com/user-attachments/assets/173cbd9d-35e9-4565-9981-a885bfb53898)

