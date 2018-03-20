/**
 * 登录模块
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    res.header('Access-Control-Expose-Headers', 'access-token');
    const {account, password} = req.body;
    console.log(req.body);

    function _login(username,password){

        if (username === 'admin' && password === '123456') {
            return true;
        }else{
            return false;
        }
    }

    if (_login(username,password)) {
        res.header('access-token', Date.now());
        res.json(true);
    } else {
        res.json(false);
    }
}