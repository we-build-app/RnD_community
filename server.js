var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var path = require('path');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

var app = express();
app.set('view engine', 'html');
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());
app.use(express.static(__dirname + '/public'));

nunjucks.configure('public', {
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var router = express.Router();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

// route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login)
app.use('/api', router);

app.get('/profile', async (req, res) => {
    const { Op } = require('sequelize');
    const { User } = require('./models');

    let user = await User.findOne({
        attributes: ['User_name', 'Profile_message', 'Profile_pic_url', 'nickname', 'birthday'],
        where: { User_id: 2 },  // User_id 2는 임시로 설정한 값. 나중에 변수로 갖고 오도록 수정해야 함!!!
        }
    );

    res.render('profile', {
        'userName': user.User_name, 
        'profileImg': user.Profile_pic_url, 
        'profileMsg': user.Profile_message,
        'nickname': user.nickname,
        'birthday': user.birthday
    });
});

app.listen(5001);
