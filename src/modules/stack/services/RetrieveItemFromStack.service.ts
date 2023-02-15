import { inject, injectable } from "tsyringe";

@injectable()
export class RetrieveItemFromStackService {
	constructor(
		@inject("Stack")
		private stack: (number | string)[]
	) {}

	execute(): number | string | undefined {
		return this.stack.pop();
	}
}
