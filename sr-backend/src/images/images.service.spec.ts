import { Test, TestingModule } from '@nestjs/testing';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create images and return an array of their ids', () => {
      const files: any = [
        { originalname: 'image1.png', mimetype: 'image/png', buffer: Buffer.from([]) },
        { originalname: 'image2.jpg', mimetype: 'image/jpeg', buffer: Buffer.from([]) },
      ];

      const ids = service.create(files);

      expect(ids.length).toBe(2);
      expect(typeof ids[0]).toBe('string');
      expect(typeof ids[1]).toBe('string');
    });
  });

  describe('findAll', () => {
    it('should return all images when no filters are specified', () => {
      const images: any = {
        '1': { originalname: 'image1.jpg' },
        '2': { originalname: 'image2.jpg' },
      };
      ImagesService.images = images;
      // jasmine.spyOnProperty(ImagesService, 'images', 'get').mockReturnValue(images);

      const result = service.findAll({});

      expect(result.count).toEqual(2);
      expect(result.rows[0].id).toEqual('1');
      expect(result.rows[0].originalName).toEqual('image1.jpg');
      expect(result.rows[0].filePath).toEqual('images/1');
      expect(result.rows[1].id).toEqual('2');
      expect(result.rows[1].originalName).toEqual('image2.jpg');
      expect(result.rows[1].filePath).toEqual('images/2');
    });

    it('should filter images by originalName when specified', () => {
      const images: any = {
        '1': { originalname: 'image1.jpg' },
        '2': { originalname: 'image2.jpg' },
        '3': { originalname: 'another-image.jpg' },
      };

      ImagesService.images = images;
      // jest.spyOn(ImagesService, 'images', 'get').mockReturnValue(images);

      const result = service.findAll({ originalname: 'image' });

      expect(result.count).toEqual(3);
      expect(result.rows[0].id).toEqual('1');
      expect(result.rows[0].originalName).toEqual('image1.jpg');
      expect(result.rows[0].filePath).toEqual('images/1');
      expect(result.rows[1].id).toEqual('2');
      expect(result.rows[1].originalName).toEqual('image2.jpg');
      expect(result.rows[1].filePath).toEqual('images/2');
    });

    it('should filter images by pageNumber and pageSize when specified', () => {
      const images: any = {
        '1': { originalname: 'image1.jpg' },
        '2': { originalname: 'image2.jpg' },
        '3': { originalname: 'another-image.jpg' },
      };

      ImagesService.images = images;
      // jest.spyOn(ImagesService, 'images', 'get').mockReturnValue(images);

      const result = service.findAll({ pageNumber: 2, pageSize: 1 });

      expect(result.count).toEqual(3);
      expect(result.rows.length).toEqual(1);
      expect(result.rows[0].id).toEqual('2');
      expect(result.rows[0].originalName).toEqual('image2.jpg');
      expect(result.rows[0].filePath).toEqual('images/2');
    });
  });
});
