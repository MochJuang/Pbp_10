const secretkey = 'mysecretkey';
const jwt = require('jsonwebtoken');


const verifytoken = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        return res.status(401).json({message: 'Akses ditolak, token tidak ada.'});     
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({message: 'Akses ditolak, token tidak ada.'});
    }

    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'token tidak valid'});
    }
}

exports.verifytoken = verifytoken