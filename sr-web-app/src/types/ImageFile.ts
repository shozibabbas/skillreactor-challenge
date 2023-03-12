export interface ImageFile {

  /**
   * ID of the image
   */
  id: string;

  /**
   * Name of image when it was uploaded
   */
  originalName: string;

  /**
   * Path at which the image can be accessed
   */
  filePath: string;
}