class ErrorResponse extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    //@ts-ignore next-line
    this.statusCode = statusCode;
  }
}

export { ErrorResponse };
