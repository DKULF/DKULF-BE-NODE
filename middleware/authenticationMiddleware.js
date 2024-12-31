const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mySecretKey12345678987654321234567812341234';

const authenticateJWT = async (req, res, next) => {

    if (req.method === 'GET' || req.url.includes('/test')) {
        return next();
    }
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: '인증 토큰이 필요합니다.'
        });
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const decodeToken = jwt.decode(token);
        const role = decodeToken.roles[0];

        if (req.url.includes('/admin')) {
            if (role !== 'ROLE_ADMIN'){
                return res.status(403).json({
                    success: false,
                    statusCode: 403,
                    message: '관리자만 접근가능합니다.'
                });
            }
        }
        jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });       
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(499).json({
                success: false,
                statusCode: 499,
                message: '토큰이 만료되었습니다. 다시 로그인 해주세요.'
            });
        }
        return res.status(403).json({
            success: false,
            statusCode: 403,
            message: '유효하지 않은 토큰입니다.'
        });
    }
};

module.exports = authenticateJWT;