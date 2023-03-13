import React, { useState } from 'react';
import { useUploadImagesMutation } from '../../redux/ImagesApi';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadImages, { isLoading, isUninitialized, isSuccess }] = useUploadImagesMutation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      await uploadImages(filesArray);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId='formFile' className='mb-3 mt-3'>
            <Form.Label>Select images to Upload</Form.Label>
            <Form.Control type='file' multiple onChange={handleFileSelect}
                          disabled={isLoading || (!isUninitialized && isSuccess)} />
          </Form.Group>
          <Row className={'mb-3'}>
            {
              selectedFiles && Array.from(selectedFiles).map((f, i) => (
                <Col md={2} key={i}>
                  <Image thumbnail={true} src={URL.createObjectURL(f)} />
                  {f.name}
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className={'text-center'}>
          <Button onClick={handleUpload} disabled={!selectedFiles || isLoading || (!isUninitialized && isSuccess)}>
            {!isUninitialized && isSuccess ? 'Images Uploaded Successfully' : 'Upload Images'}
          </Button>
          {!isUninitialized && isSuccess && (
            <Button className={'ms-2'} onClick={() => window.location.reload()}>
              Upload More
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ImageUpload;