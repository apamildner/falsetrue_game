
const express = require('express');
var bodyParser = require('body-parser')
var randomIntFromInterval = require('./utils/helpers')
const {db_storage,generateString} = require('./storage/db')
const app = express();
app.use(bodyParser.json())
/* const session = require('express-session');
app.use(session({
  resave: true,
  secret: "foo",
  saveUninitialized: true
})) */
app.use(express.static(__dirname + '/client'))
// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  names = req.query.names
  id = req.query.id
  //sess = req.session
  //sess.used_strings = (typeof sess.used_strings === 'undefined') ? [] : sess.used_strings;
  res.send(generateString(names))
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);