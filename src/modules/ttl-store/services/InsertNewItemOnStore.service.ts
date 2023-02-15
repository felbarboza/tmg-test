import { inject, injectable } from "tsyringe";
import { Item } from "../dtos/Item";

@injectable()
export class InsertNewItemOnStoreService {
	constructor(
		@inject("Store")
		private store: { [key: string]: any }
	) {}

	execute(item: Item) {
		this.store[item.key] = item.value;

		setTimeout(() => {
			delete this.store[item.key];
		}, item.ttl);

		return item;
	}
}
