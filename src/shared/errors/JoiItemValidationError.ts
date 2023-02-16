import { ApplicationError } from "@shared/errors/ApplicationError";

export class JoiValidationError extends ApplicationError {
	constructor(message: string) {
		super();
		this.message = message;
		this.errCode = 400;
	}
}
