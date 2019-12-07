const express = require('express');
const morgan = require('morgan');
const app = express();
var bodyParser = require('body-parser');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});

    }
    next();
});

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
    // settings
app.set('port', process.env.PORT || 4000);


// middlewares
app.use(morgan('dev'));


// routes
app.use(require('./routes'));
app.use('/api/gqrcode', require('./routes/User4Qr')); //Good
app.use('/api/usuarios', require('./routes/usuarios')); //DONE
app.use('/api/login', require('./routes/login')); //Good
app.use('/api/listaEventos', require('./routes/listaEventbride')); //1/2 DONE
app.use('/api/insertPosibleA', require('./routes/insertPosibleA')); //DONE
app.use('/api/insertEvento', require('./routes/insertEvento'));
app.use('/api/Mail', require('./routes/mail.js'));



// starting the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});