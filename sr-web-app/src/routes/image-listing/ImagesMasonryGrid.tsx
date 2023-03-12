import React from 'react';
import './ImagesMasonryGrid.scss';
import Masonry from 'react-masonry-css';
import { Image } from 'react-bootstrap';
import { ImageFile } from '../../types/ImageFile';

interface ImagesMasonryGridProps {
  images?: ImageFile[];
  onImageClick: Function;
  // any props that come into the component
}

function ImagesMasonryGrid({ images, onImageClick }: ImagesMasonryGridProps) {
  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      }}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {
        images && images.map(x => (
          <div key={x.id} onClick={() => onImageClick(x.filePath)} className={'image-container'}>
            <Image fluid={true} src={`http://localhost:8000/${x.filePath}`} />
          </div>
        ))
      }
    </Masonry>
  );
}

export default ImagesMasonryGrid;