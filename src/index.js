const { app, PORT } = require('./Server/server')

app.listen(PORT, () => console.log(`My port is ${PORT}`))
    