import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { paginate } from '../utils';
import { ImageFindAllFilters } from './entities/ImageFindAllFilters';

@Injectable()
export class ImagesService {
  static images: { [id: string]: Express.Multer.File } = {};

  static getImages = () => ImagesService.images;

  create(files: Express.Multer.File[]): string[] {
    const newIds = [];
    for (const file of files) {
      const id = uuidv4();
      ImagesService.images[id] = file;
      newIds.push(id);
    }
    return newIds;
  }

  findAll(filters: ImageFindAllFilters) {
    let entries = Object.entries(ImagesService.images)
      .filter(([, Value]) => {
        for (const [k, V] of Object.entries(filters)) {
          if (!Value.hasOwnProperty(k)) {
            continue;
          }
          switch (typeof Value[k]) {
            case 'string':
              if (!Value[k].toLowerCase().includes(V)) {
                return false;
              }
              break;
            case 'number':
              if (Value[k] !== V) {
                return false;
              }
              break;
          }
        }
        return true;
      })
      .reduce((a, [k, V]) => {
        a.push({
          id: k,
          originalName: V.originalname,
          // fileName: V.filename,
          filePath: `images/${k}`,
        });
        return a;
      }, []);
    let result = {
      count: entries.length,
      rows: entries,
    };
    if (filters.pageSize && filters.pageNumber) {
      result.rows = paginate(result.rows, filters.pageSize, filters.pageNumber);
    }
    return result;
  }

  findOne(id: string): Express.Multer.File {
    return ImagesService.images[id];
  }
}
