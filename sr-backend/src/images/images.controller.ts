import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ImageFindAllFilters } from './entities/ImageFindAllFilters';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {
  }

  @Get()
  findAll(@Query() filters: ImageFindAllFilters) {
    return this.imagesService.findAll(filters);
  }

  @Post()
  @UseInterceptors(FilesInterceptor(
    'images',
    20,
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const { originalname } = file;
          const uniqueId = uuidv4();
          const filename = `${uniqueId}${extname(originalname)}`;
          cb(null, filename);
        },
      }),
    },
  ))
  create(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .build(),
    ) images: Array<Express.Multer.File>,
  ) {
    return this.imagesService.create(images);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    const file = this.imagesService.findOne(id);
    if (!file) {
      throw new BadRequestException('image not found');
    }
    res.sendFile(join(__dirname, '../../', file.destination, file.filename));
  }
}
