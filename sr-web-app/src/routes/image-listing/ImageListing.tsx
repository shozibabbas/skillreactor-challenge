import React, { useState } from 'react';
import { useGetImagesQuery } from '../../redux/ImagesApi';
import { Button, Col, Container, Form, FormControl, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import ImagesMasonryGrid from './ImagesMasonryGrid';
import UltimatePaginationBootstrap5 from '../../shared/Bootstrap5Pagination';

function ImageListing() {
  const [search, setSearch] = useState('');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetImagesQuery({
    originalname: search,
    pageSize: rowsPerPage,
    pageNumber: page,
  });

  const closeModal = () => setModalImage(null);
  const openModal = (imageSrc: string) => setModalImage(imageSrc);

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
    <>
      <Container>
        <Row className={'my-3'}>
          <Col>
            <FormControl type={'text'} value={search} onChange={(e) => setSearch(e.target.value)}
                         placeholder={'Enter name to search'} />
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text>Rows per page</InputGroup.Text>
              <Form.Select name={'rowsPerPage'} value={rowsPerPage}
                           onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                <option value='12'>12</option>
                <option value='25'>32</option>
                <option value='60'>60</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ImagesMasonryGrid
              images={data?.rows}
              onImageClick={openModal}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {
              data && data.count > 0 ? (
                <UltimatePaginationBootstrap5
                  currentPage={page}
                  totalPages={Math.ceil(data.count / rowsPerPage)}
                  onChange={setPage}
                />
              ) : (
                <p className={'text-center'}>No records found</p>
              )
            }
          </Col>
        </Row>
      </Container>
      <Modal show={!!modalImage} onHide={closeModal} centered size={'xl'}>
        <Modal.Body>
          <Image fluid={true} src={`http://localhost:8000/${modalImage}`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageListing;