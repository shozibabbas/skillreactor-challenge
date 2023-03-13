import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ImageUpload from './ImageUpload';
import { useUploadImagesMutation } from '../../redux/ImagesApi';

const mockStore = configureStore([]);
const store = mockStore({});

// Mock the uploadImages mutation
jest.mock('../../redux/ImagesApi', () => ({
  useUploadImagesMutation: jest.fn(),
}));

describe('ImageUpload component', () => {
  const server = setupServer(
    rest.post('/api/images', (req, res, ctx) => {
      const response = {
        data: {
          ids: ['1', '2', '3'],
        },
      };
      return res(ctx.json(response));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders the form and uploads images successfully', async () => {
    // Mock the useUploadImagesMutation hook to return a mock mutation
    const mockMutation = jest.fn();
    global.URL.createObjectURL = jest.fn();
    (useUploadImagesMutation as jest.Mock).mockReturnValue([mockMutation, {
      isLoading: false,
      isUninitialized: true,
      isSuccess: false,
    }]);

    render(
      <Provider store={store}>
        <ImageUpload />
      </Provider>,
    );

    // Select some files and fire the upload button click event
    const file1 = new File(['file1 contents'], 'file1.png', { type: 'image/png' });
    const file2 = new File(['file2 contents'], 'file2.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Select images to Upload'), { target: { files: [file1, file2] } });

    fireEvent.click(screen.getByText('Upload Images'));

    // Assert that the mutation was called with the correct arguments
    await waitFor(() => expect(mockMutation).toHaveBeenCalledWith([file1, file2]));
  });

  it('disables the form while uploading', async () => {
    // Mock the useUploadImagesMutation hook to return a loading mutation
    const mockMutation = jest.fn();
    (useUploadImagesMutation as jest.Mock).mockReturnValue([mockMutation, {
      isLoading: true,
      isUninitialized: true,
      isSuccess: false,
    }]);

    render(
      <Provider store={store}>
        <ImageUpload />
      </Provider>,
    );

    // Assert that the form is disabled
    expect(screen.getByLabelText('Select images to Upload')).toBeDisabled();
    expect(screen.getByText('Upload Images')).toBeDisabled();
  });

  it('disables the form after uploading', async () => {
    // Mock the useUploadImagesMutation hook to return a success mutation
    const mockMutation = jest.fn();
    (useUploadImagesMutation as jest.Mock).mockReturnValue([mockMutation, {
      isLoading: false,
      isUninitialized: false,
      isSuccess: true,
    }]);

    render(
      <Provider store={store}>
        <ImageUpload />
      </Provider>,
    );

    // Assert that the form is disabled
    expect(screen.getByLabelText('Select images to Upload')).toBeDisabled();
    expect(screen.getByText('Images Uploaded Successfully')).toBeDisabled();
  });
});