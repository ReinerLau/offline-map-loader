import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import * as StreamZip from 'node-stream-zip';
import * as path from 'path';

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
  constructor() {
    fs.ensureDirSync(path.join(__dirname, '..', 'client', 'tiles'));
  }

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

  async upload(files: Array<Express.Multer.File>) {
    const fileExtractPromises = files.map((file) => {
      return new Promise(async (resolve, reject) => {
        const zip = new StreamZip.async({ file: file.path });
        try {
          await zip.extract(
            null,
            path.join(__dirname, '..', 'client', 'tiles'),
          );
          await zip.close();
          await fs.remove(file.path);
          resolve('success');
        } catch {
          reject();
        }
      });
    });
    try {
      await Promise.all(fileExtractPromises);
      return '上传成功';
    } catch {
      throw new InternalServerErrorException('上传失败');
    }
  }
}
