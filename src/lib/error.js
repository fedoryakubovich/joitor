class JoitorError extends Error {
  constructor(errors, options) {
    super();

    this.name = this.constructor.name;
    this.errors = errors;
    this.status = options.status || 400;
    this.statusText = options.statusText || 'Bad Request';
  }
}

JoitorError.prototype.toJSON = function() {
  return {
    status: this.status,
    statusText: this.statusText,
    errors: this.errors,
  };
};

module.exports = JoitorError;
