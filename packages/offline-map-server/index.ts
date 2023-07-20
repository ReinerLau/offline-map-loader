import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import unzipper from "unzipper";

const app = express();
const upload = multer({
  dest: path.join(__dirname, "tiles"),
});

app.use(express.static(__dirname));

app.post("/upload", upload.single("tiles"), (req, res, next) => {
  try {
    req.file &&
      fs
        .createReadStream(req.file.path)
        .pipe(
          unzipper.Extract({
            path: path.join(__dirname, "tiles"),
          })
        )
        .on("finish", () => {
          req.file &&
            fs.unlink(req.file?.path, (err) => {
              err && console.error(err);
              res.send("文件上传成功");
            });
        })
        .on("error", () => {
          res.send("文件上传失败");
        });
  } catch {
    res.send("文件上传失败");
  }
});

interface Data {
  id: string;
  label: string;
  children: Data[] | undefined;
}

function getData(directoryPath: string, preId: string) {
  let data: Data[] = [];
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    const id = `${preId}_${file}`;
    data.push({
      id,
      label: file,
      children: stats.isDirectory() ? getData(filePath, id) : undefined,
    });
  });
  return data;
}

app.get("/list", (req, res) => {
  const tilesPath = path.join(__dirname, "tiles");
  const data: Data[] = getData(tilesPath, "tile");
  res.json(data);
});

app.listen(3000, () => {
  console.log("瓦片服务：http://localhost:3000");
});
