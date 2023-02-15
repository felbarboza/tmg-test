import { container } from "tsyringe";

const store: { [key: string]: any } = {};

container.registerInstance("Store", store);
