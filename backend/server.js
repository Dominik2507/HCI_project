const express = require('express');
const app = express();
var path = require('path');

app.use(express.urlencoded());  // To parse URL-encoded bodies
app.use(express.json()); //To parse JSON bodies

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const loginRouter = require('./routes/login.routes');
const registerRouter = require('./routes/register.routes');
const userRouter = require('./routes/user.routes');
const categoriesRouter = require('./routes/categories.routes');
const popularQuizesRouter = require('./routes/popularQuizes.routes');
const quizRouter = require('./routes/quiz.routes');
const quizTypesRouter = require('./routes/quizTypes.routes');
const quizesRouter = require('./routes/quizes.routes');
const quizQuestionsRouter = require('./routes/quizQuestions.routes');
const createQuizRouter = require('./routes/createQuiz.routes');

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/popularQuizes', popularQuizesRouter);
app.use('/quiz', quizRouter);
app.use('/quizTypes', quizTypesRouter);
app.use('/quizes', quizesRouter);
app.use('/quizQuestions', quizQuestionsRouter);
app.use('/createQuiz', createQuizRouter);


app.listen(8000);