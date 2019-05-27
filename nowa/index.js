const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('./expressApp');
const io = require('./socketIO');
const controller = require('./controller');
const errorHandler = require('./util/errorHandler');
const jwt = require('./util/jwt');
const mongodbConfig = require('./configs/mongodb');

const PORT = 9192;

io.on('connection', function (socket) {
    console.log('connected');
    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

mongoose.Promise = global.Promise;
mongoose.connect(mongodbConfig.uri, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt);

controller(app);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
