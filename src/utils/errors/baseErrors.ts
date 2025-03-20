class BaseError extends Error {
  errorName: string;
  errorDescription: string;
  statusCode: number;
  isOperationalError: boolean;
  errorFieldName: string;

  constructor({
    errorName = "Error",
    errorDescription = "No error description provided",
    statusCode = 500,
    isOperationalError = false,
    errorFieldName = "",
  } = {}) {
    super(errorDescription);
    Object.setPrototypeOf(this, new.target.prototype);

    this.errorName = errorName;
    this.statusCode = statusCode;
    this.isOperationalError = isOperationalError;
    this.errorDescription = errorDescription;
    this.errorFieldName = errorFieldName;
    Error.captureStackTrace(this);
  }
}

export { BaseError };
