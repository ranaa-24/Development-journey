// const ejs = require('ejs')
// let template = `
//     <h1> hello <%=name%> </h1>
// `;

// let html = ejs.render(template, {name : "Lina"});
// console.log(html);


const express = require('express');
const app = express();
const path = require('path');

// Set view engine to EJS
app.set('view engine', 'ejs');

// app.set('views', path.join(__dirname, 'my_views')); // to set the custom path, o/w only views folder auto 

// Serve views from the 'views' folder by default
app.get('/', (req, res) => {
  res.render('index', { name : "",     // rendering index.ejs from views folder
  loves : ["her", "only her"]
   });
  
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
