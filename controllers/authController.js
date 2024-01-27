const secretkey = 'mysecretkey';
const jwt = require('jsonwebtoken');
const db = require("../models/db");
const Joi = require('joi')

module.exports = (app) => {    
    // sign user
    app.post('/login', (req, res) => {
        const schema = Joi.object({
            username: Joi.string().min(5).required(),
            password: Joi.string().required(),
        });
        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
    
        }

        const { username, password } = req.body;
        db.query(
            "SELECT * FROM user WHERE username = ? AND password = ?",
            [username, password],
            (error, results) => {
                if (error) {
                    console.error("Error fetching class:", error);
                    res.status(500).json({ message: "Internal Server Error" });
                } else if (results.length === 0) {
                    res.status(404).json({ message: "user not found" });
                } else {
                    const user = {
                        username: results[0].username,
                        password: results[0].password,
                    }
                    const token = jwt.sign(user, secretkey.toString('utf-8'), { algorithm: 'HS256', allowInsecureKeySizes: true, allowInvalidAsymmetricKeyTypes: true })
                    res.json({
                        token
                    });
                }
            }
        );

        
    });

}