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
import { join } from 'path';
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
