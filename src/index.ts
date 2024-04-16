//* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import  express  from 'express'


import userRouter from './routes/user.route'
import restaurantRouter from './routes/restaurant.route'


const app = express()
const PORT =3000

app.use(express.json())

app.use('/users', userRouter)
app.use('/restros', restaurantRouter)

app.listen(PORT, () => {
  console.log('Running on port', PORT)
})


export default app;
