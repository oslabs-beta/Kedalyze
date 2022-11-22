const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log('backend and frontend are talking');
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
})

app.use('*', (req, res) => {
    return res.status(404);
});

app.use((err, req, res, next) => {
    const defaultError = {
        log: 'express error handler triggered',
        status: 500,
       message: {err: `${err}: An error occured`}
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message); 
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});