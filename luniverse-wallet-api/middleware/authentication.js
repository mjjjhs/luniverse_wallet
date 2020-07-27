const passport = require('passport');
module.exports = (req, res, next) => {
    return passport.authenticate("jwt", { sessions: false }, (error, user) => {
        //verifyUser에서 user를 찾았다면 서버에게 요청하는 req객체의 user에 담아서 서버에게 넘겨줌
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};