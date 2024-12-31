# DKULF-BE-NODE

## Settings
### 1. Node.js ( 18.18.0 LTS )
[Node.js 다운로드](https://nodejs.org/ko/) <br>
[Node.js 다운로드 참고](https://offbyone.tistory.com/441)

### 2. MongoDB 다운로드 
[MongoDB 다운로드](https://www.mongodb.com/try/download/community) <br>
[MongoDB 다운로드 참고](https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)

### 3. 서버 실행
```ruby
git clone https://github.com/DKULF/DKULF-BE-NODE.git
```
```ruby
npm install
```
```ruby
node app.js
```

### 4. 테스트를 위한 JWT 토큰
#### 4-1. 관리자 용 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM4MTk2OTcwfQ.EanAuFNrMS3N6YU_L2FG3JbCXfM7-F0i0DpeCgGbad0
```
- Admin Payload
```Bash
{ roles: [ 'ROLE_ADMIN' ], iat: 1735605338, exp: 1738197338 }
```
  
#### 4-2. 유저 용 토큰 ( 기간 30일 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM1NjA1MzM4LCJleHAiOjE3MzgxOTczMzh9.hr2xPuDMpacD4WYSTWcfbZCRkyPYgJLfuN1dQ-rs3JA
```
- User Payload
```Bash
{ roles: [ 'ROLE_USER' ], iat: 1735605338, exp: 1738197338 }
```
 
#### 4-3. 기간 만료 된 토큰 ( 테스트 용 )
```Bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNTYwNDk3MCwiZXhwIjoxNzM1NjA0OTY5fQ.cCCQ0WzPu3SjypPNTxnQbTj5r-iiXOC4LUjeVfKbT10
```
