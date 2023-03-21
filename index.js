const app=require("./app");

app.listen(app.get("PORT"));
console.log(`Server run http://localhost:${app.get("PORT")}`)
