exports.myMiddleware = (req, res, next) => {
    req.name ='New Name';
    next();
}

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render('index');
}