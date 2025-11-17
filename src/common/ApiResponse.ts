export class CustomApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data?: T) {
    return new CustomApiResponse<T>(true, message, data);
  }

  static error(message: string) {
    return new CustomApiResponse(false, message);
  }
}
