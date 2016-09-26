var express = require("express"),
    multer = require("multer"),
    port = process.env.PORT || 3000,
    path = require("path"),
    bodyParser = require("body-parser"),
    fs = require("fs");

var app = express();
var THREE_DAYS = 1000 * 60 * 60 * 24 * 3;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/app/client'));


var storage = multer.diskStorage({
    destination: __dirname + '/app/client/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname /*file.originalname.replace(path.extname(file.originalname),'replaced') + '-' + Date.now() + path.extname(file.originalname)*/);
    }
});


var upload = multer({storage: storage});


app.get('/', function (req, res) {
    res.render('app/client/index.html');
});

app.post('/', /*upload.single('file'),*/ function (req, res) {
    var upl = upload.single('files');
    upl(req, res, function (err) {
    });
    res.end();

});


app.post('/cropped', function (req, res) {
    var img = decodeBase64Image(req.body.img);
    var dirname = __dirname + '/app/client/cropped/cropped_file.jpg';
    fs.writeFile(dirname, img.data, function (err) {
        setTimeout(function () {
            fs.unlinkSync(dirname);
            console.log('deleted ' + dirname);
        }, THREE_DAYS);
        console.log('written ' + dirname);
        res.send('/cropped/' + path.basename(dirname));
    });
});

app.use('/cropp/:file', function (req, res) {
    var file = req.params.file;
    console.log(file);
    var dest = path.join(__dirname,'/app/client/cropped/', file);
    res.download(dest);
});

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}
app.listen(port);
console.log('Express server  running at http://localhost:' + port);