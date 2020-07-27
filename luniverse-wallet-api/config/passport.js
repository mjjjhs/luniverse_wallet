const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./dbConn');
const crypto = require('crypto');

module.exports = async () => {
    const conn = await pool().getConnection(async conn => conn);
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (email, password, done) {
            try {
                const cipher = crypto.pbkdf2Sync(password, process.env.SALT, 100326, 128, 'sha512');
                const base64ToCipher = cipher.toString('base64');
                const [user] = await conn.query('SELECT * FROM `Users` WHERE `email` = ? AND `password` = ?', [email, base64ToCipher]);
                if(!user || !user.length) {
                    return done(null, false, {message: 'Incorrect email or password.'});
                }
                delete user[0].password;
                return done(null, user[0], {message: 'Logged In Successfully'});
            } catch(e) {
                console.log('Local Strategy Error::', e);
                return done(e);
            }
        }
    ));

    //JWT Strategy
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : process.env.SALT
        },
        async function (jwtPayload, done) {
            try {
                console.log('jwtPayload::', jwtPayload);
                const [user] = await conn.query('SELECT * FROM `Users` WHERE `email` = ?', [jwtPayload.email]);
                return done(null, user[0]);
            } catch(e) {
                console.log('JWT Strategy Error::', e);
                return done(e);
            }
        }
    ));
}