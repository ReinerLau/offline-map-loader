import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "tiles")));

app.listen(3000, () => {
  console.log("瓦片服务：http://localhost:3000");
});
