const express = require('express');
const app = express();
const path = require('path');
const index = require('./routes/index');

//set app handlebar
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
//go to route 
app.use('/', index);

app.listen(3000, () => console.log('init.....'));

const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 3000, subdomain: 'lostandfound' });
  
  console.log(tunnel.url); 

  tunnel.on('close', () => {
    // tunnels are closed
    console.log('tunnel closed');
  });
})();

//tunnel.close();
