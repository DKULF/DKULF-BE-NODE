const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const Item = require('./models/item');
const app = express();
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'your_secret_key';

mongoose.connect('mongodb://localhost:27017/DKULF');
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection errors : "));
db.once("open",() => {
    console.log("DKULF Database Connected!");
});

const authenticateJWT = (req, res, next) => {
    
    if (req.originalUrl.includes('/admin')) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; 

        jwt.verify(token, JWT_SECRET, (err) => { 
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(499).json({
                        success: false,
                        statusCode: 499,
                        error: '토큰이 만료되었습니다. 다시 로그인 해주세요.'
                    });
                }
                return res.status(403).json({
                    success: false,
                    statusCode: 403,
                    error: '유효하지 않은 토큰입니다.'
                });
            }
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            error: '인증 토큰이 필요합니다.'
        });
    }
};

// app.use(authenticateJWT);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(16).toString('hex'); 
        const ext = path.extname(file.originalname); 
        cb(null, uniqueSuffix + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('IMAGE_FILE_TYPE'));
        }
    }
});

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); 
        const imageFolder = path.join(__dirname, 'public', 'images');
        const fetchItems = [];
        items.forEach(item => {
            const imagePath = path.join(imageFolder, item.image);
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath); 
                const updatedItem = {
                    ...item.toObject(),
                    image: {
                        data: imageBuffer.toString('base64'),
                        ext: path.extname(item.image), 
                        contentType: `image/${path.extname(item.image).slice(1)}`  
                    }
                };
                fetchItems.push(updatedItem); 
            } else {
                const updatedItem = {
                    ...item.toObject(),
                    image: null 
                };
                fetchItems.push(updatedItem);
            }
        });
        res.status(200).json({ success : true, count : fetchItems.length, items : fetchItems}); 
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ 
            statusCode : 500, 
            success : false, 
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.' });
    }
});

app.get('/item/:id', async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            statusCode : 400, 
            success : false, 
            message: '유효하지 않은 아이디 형식입니다.' });
    }    
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ 
                statusCode : 404, 
                success : false, 
                message: '해당 아이디의 데이터가 존재하지 않습니다.' });
        }
        const imagePath = path.join(__dirname, 'public', 'images', item.image);
        let image = null;
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            image = {
                data: imageBuffer.toString('base64'),
                ext: path.extname(item.image),
                contentType: `image/${path.extname(item.image).slice(1)}`
            };
        }
        res.status(200).json({
            success : true,
            item : {
                ...item.toObject(),
                image
            }
        });
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ 
            statusCode : 500, 
            success : false, 
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.' });
    }
});

app.get('/items/:keyword', async (req, res) => {
    const { keyword } = req.params;
    if (!keyword || keyword.trim().length === 0) {
        return res.status(400).json({
            statusCode : 400,
            success: false,
            message: "유효하지 않은 키워드입니다. 검색어를 입력해주세요.",
        });
      }
    try {
        const items = await Item.find({ tags: { $regex: keyword, $options: 'i' } }); 
        const imageFolder = path.join(__dirname, 'public', 'images');
        const fetchItems = [];
        items.forEach(item => {
            const imagePath = path.join(imageFolder, item.image);
            let image = null;
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath);
                image = {
                    data: imageBuffer.toString('base64'),
                    ext: path.extname(item.image),
                    contentType: `image/${path.extname(item.image).slice(1)}`
                };
            }
            fetchItems.push({
                ...item.toObject(),
                image
            });
        });
        res.status(200).json({ success : true, count : fetchItems.length, items : fetchItems});
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ 
            statusCode : 500, 
            success : false, 
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.' 
        });
    }
});

app.patch('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            statusCode : 400, 
            success : false, 
            message: '유효하지 않은 아이디 형식입니다.' });
    }
    if (status !== undefined) {
        try {
            const updatedItem = await Item.findByIdAndUpdate(id, { status: status === 'true' }, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ 
                    statusCode : 404, 
                    success : false, 
                    message: '해당 아이디의 데이터가 존재하지 않습니다.' });
            }
            res.status(200).json({ 
                statusCode : 200, 
                success : false, 
                message: '분실물 상태가 성공적으로 업데이트 되었습니다.', 
            });
        } catch (err) {
            console.error('Error updating item:', err);
            res.status(500).json({ 
                statusCode : 500, 
                success : false, 
                error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.' 
            });
        }
    } else {
        return res.status(400).json({ 
            statusCode : 400, 
            success : false, 
            error: '분실물에 대한 상태 데이터가 필요합니다.' 
        });
    }
});

app.post('/item', upload.single('image'), async (req, res) => {
    try {
        const { name, tags } = req.body;
        if (!name) {
            return res.status(400).json({ 
                statusCode : 400, 
                success : false, 
                error: '분실물에 대한 이름을 입력해주세요.' 
            });
        }
        if (!req.file) {
            return res.status(400).json({ 
                statusCode : 400, 
                success : false, 
                error: '분실물에 대한 사진을 등록해주세요.' 
            });
        }
        const now = new Date();
        const offset = 9 * 60 * 60 * 1000; 
        const koreaTime = new Date(now.getTime() + offset);
        const year = koreaTime.getFullYear();
        const month = String(koreaTime.getMonth() + 1).padStart(2, '0'); 
        const day = String(koreaTime.getDate()).padStart(2, '0'); 
        const createAt = `${year}.${month}.${day}`;
                
        let tagItem = tags ? tags.split(',') : [];
        tagItem = tagItem.map(tag => tag.trim());

        const newItem = new Item({
            name,
            tags: tagItem,
            status: true,
            createAt,
            image: req.file.filename,
        });
        await newItem.save();
        res.status(201).json({ 
            success : true, 
            statusCode : 201, 
            message: '분실물 등록이 완료되었습니다.' 
        });
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(500).json({ 
            statusCode : 500, 
            success : false, 
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.' 
        });
    }
});

app.delete('/admin/item/:id', async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            statusCode: 400, 
            success: false, 
            message: '유효하지 않은 아이디 형식입니다.'
        });
    }

    try {
        
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ 
                statusCode: 404, 
                success: false, 
                message: '해당 아이디의 데이터가 존재하지 않습니다.'
            });
        }

        const imagePath = path.join(__dirname, 'public', 'images', item.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        await Item.findByIdAndDelete(id);

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: '아이템과 해당 이미지 파일이 삭제되었습니다.'
        });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({
            statusCode: 500,
            success: false,
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.'
        });
    }
});

app.delete('/admin/items', async (req, res) => {
    try {
        const items = await Item.find();

        if (items.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: '삭제할 아이템이 존재하지 않습니다.'
            });
        }
        for (const item of items) {
            const imagePath = path.join(__dirname, 'public', 'images', item.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            await Item.findByIdAndDelete(item._id);
        }

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: '모든 아이템과 해당 이미지 파일이 삭제되었습니다.'
        });
    } catch (err) {
        console.error('Error deleting items:', err);
        res.status(500).json({
            statusCode: 500,
            success: false,
            error: '데이터 처리 중 문제가 발생하였습니다. 다시 시도해주세요.'
        });
    }
});

app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                statusCode : 400, 
                success : false, 
                error: '이미지 파일의 최대 크기는 5MB 입니다.' 
            });
        }
        return res.status(500).json({ 
            statusCode : 500, 
            success : false, 
            error: '이미지 처리 중 오류가 발생하였습니다. 다시 시도해주세요.'
        });
    }
    if (err.message === 'IMAGE_FILE_TYPE') {
        return res.status(400).json({ 
            statusCode : 400, 
            success : false, 
            error: '이미지 파일만 등록가능합니다. 다시 시도해 주세요.'
        });
    }
    res.status(500).json({ 
        statusCode : 500, 
        success : false, 
        error: '내부 서버에 문제가 생겼습니다. 다시 시도해 주세요.' 
    });
});

app.listen(8081,() => {
    console.log("App is listening on port 8081");
});