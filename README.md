# SkillReactor Challenge

This repo has code for skillreactor challenge

## Context

You are a senior member of a team that has been tasked with developing a programmatic image storage and processing
service called ImageProg.com.
Unlike other image storage services that have a web front-end and target end-user, ImageProg is designed as a
specialized image storage and processing engine to be used by other applications, and will (only) provide
high-performance programmatic access via its
API.
Apart from bulk image storage and retrieval, ImageProg provides a number of images processing and transformation
capabilities such as compression, rotation, a variety of filters, thumbnail creation, and masking.
These capabilities are all delivered as a set of high-performance web services that can operate on images provided as
data in a request, operate on a remote image via a URL, or on images that are already in the repository. All of the
processing features should be able to operate in bulk, and at a significant scale.

## Backend Challenge

- Build a simple service using that can receive an uploaded image and return a unique identifier for the uploaded image
  that can be used subsequently to retrieve the image.
- An endpoint to list all stored images, it should allow filtering based on the name of the image using a query
  parameter
- This service should be written using Typescript and NodeJS
- Include at least 1 unit test demonstrating how you would set up a larger testing suite
- This should be an ‘MVP’ version, and any further extensions you’d like to make can be talked through during the
  interview and do not need to be implemented.
- Target time: 2hrs (max 4hrs)

## Notes:

- Data Storage can be mocked however you like but the service should be functional
- Transformations don't need to be implemented

## Frontend Challenge

- Create a typescript-based react app that can connect with the image service and list all the images
- The image list should be paginated
- The initial image should be a thumbnail but clicking it should show a full image in a modal
- A search bar should exist that allows filtering the results with a serverside query.
- At least 1 unit test should exist
- The UI should be implemented using Typescript and React
- Target time: 1hr (max 2hrs)

You can use a GitHub repository to share your code for both challenges.

____________

# Solution

We will start by creating two applications:

1. React web app (for frontend)
2. NestJS app (for backend)

## Backend Features

- Bulk upload files
- Save uploaded files to a folder
- generate ID for each image and serve image using ID
- pagination handled on get images API

### Improvements to be made

- add authentication to secure access to images
- add image processing library to implement features

## Frontend Features

- image listing and upload page
- pagination handled on image page
- upload page shows files before uploading
- redux integrated
- masonry layout for images

### Improvements to be made

- add authentication