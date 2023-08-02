import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AppService } from './app.service';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

@Controller('tiles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  findAll() {
    return this.appService.findAll();
  }

  @Delete(':id')
  @UseInterceptors(WrapResponseInterceptor)
  remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', 'client', 'tiles'));
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter(req, file, cb) {
        if (!file.mimetype.includes('zip'))
          return cb(new BadRequestException('文件格式错误'), false);

        cb(null, true);
      },
    }),
    WrapResponseInterceptor,
  )
  upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.appService.upload(files);
  }
}
