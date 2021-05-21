const express = require("express");
const path = require('path');
const nunjucks = require('nunjucks');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const {sequelize} = require('./models');

const app = express();
app.set('port', process.env.PORT || 5001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});


sequelize.sync({ force: false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
});

app.use( express.urlencoded({ extended: true }));
app.use( express.json());
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

const router = express.Router();

app.use('/', indexRouter);
app.use('/users', usersRouter)

// route to handle user registration
app.listen(5001);




