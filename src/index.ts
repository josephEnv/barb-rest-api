import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import router from './app/routes'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use(router)


app.listen(app.get('port'), () => {
  console.log(`Server listening on http://localhost:${app.get('port')}`)
})
