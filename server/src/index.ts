import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000
app.get('/', (_, res) => {
    console.log('hi');
    res.send('PONG')
})

app.listen(PORT, ()=>{
    console.log('server ' + PORT);
    
})