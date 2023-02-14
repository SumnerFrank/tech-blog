// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// routers
const sequelize = require('./config/connection');
const routes = require('./controllers');

// Server
const app = express();
const PORT = process.env.PORT || 3001;

// instance of express handlebars
const hbs = exphbs.create({});

// creates session
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
