import { inject, injectable } from "tsyringe";

@injectable()
export class InsertItemOnStackService {
	constructor(
		@inject("Stack")
		private stack: (number | string)[]
	) {}

	execute(value: string | number) {
		this.stack.push(value);
	}
}
