import React, { useState } from 'react';
import { useGetImagesQuery } from '../../redux/ImagesApi';

function ImageListing() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useGetImagesQuery({ originalname: search });
  if (isLoading) {
    return (
      <p>loading</p>
    );
  }
  if (error) {
    return (
      <p>Error {JSON.stringify(error)}</p>
    );
  }
  return (
    <div>
      <div>
        <input type={'text'} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {
        data && data.rows.map(x => (
          <img key={x.id} src={`http://localhost:8000/${x.filePath}`} />
        ))
      }
    </div>
  );
}

export default ImageListing;