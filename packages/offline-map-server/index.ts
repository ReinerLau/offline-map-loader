import express from "express";

const app = express();

app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log("瓦片服务：http://localhost:3000");
});
