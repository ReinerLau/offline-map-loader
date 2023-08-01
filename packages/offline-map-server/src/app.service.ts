import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as unzipper from 'unzipper';

export interface tileData {
  id: string;
  label: string;
  children: tileData[] | undefined;
}

function getData(directoryPath: string, preId: string): tileData[] {
  const files = fs.readdirSync(directoryPath);
  return files.map((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    const id = `${preId}_${file}`;
    return {
      id,
      label: file,
      children: stats.isDirectory() ? getData(filePath, id) : undefined,
    };
  });
}

@Injectable()
export class AppService {
  findAll() {
    const tilesPath = path.join(__dirname, '..', 'client', 'tiles');
    return getData(tilesPath, 'tiles');
  }

  remove(id: string) {
    const deletePath = path.join(
      __dirname,
      '..',
      'client',
      id.replaceAll('_', '/'),
    );
    const isExisting = fs.existsSync(deletePath);
    if (isExisting) {
      fs.removeSync(deletePath);
      return '文件删除成功';
    }
    throw new NotFoundException('文件不存在');
  }

  upload(files: Array<Express.Multer.File>) {
    files.forEach((file) => {
      fs.createReadStream(file.path)
        .pipe(
          unzipper.Extract({
            path: path.join(__dirname, '..', 'client', 'tiles'),
          }),
        )
        .on('finish', () => {
          fs.remove(file.path);
        });
    });
    return '上传成功';
  }
}
