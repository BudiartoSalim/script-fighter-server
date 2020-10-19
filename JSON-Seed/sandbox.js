let data = require('../JSON-Seed/db-item.json')
data = data.map((el) =>{
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
})
console.log(data)
