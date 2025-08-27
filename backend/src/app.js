import express from 'express'; 
import cors from 'cors'; 
import { connectDB } from './config/db.js';
import registerRouter from './route/registerRoute.js';
import loginRouter from './route/loginRoute.js';
import swapRoute from './route/swapRoute.js';
import matchRoute from './route/matchRoute.js';
import userRoute from './route/userRoute.js';

const PORT = 5000; 
const app = express(); 

app.use(express.json()); 
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//routes
app.use('/', registerRouter); 
app.use('/', loginRouter); 
app.use('/', swapRoute); 
app.use('/', matchRoute); 
app.use('/', userRoute); 



app.use('/test', (req, res) => {
    res.json('testing works'); 
}); 

connectDB(); 
app.listen(PORT, () => {
    console.log(`backend at http://localhost:${PORT}`);
}); 