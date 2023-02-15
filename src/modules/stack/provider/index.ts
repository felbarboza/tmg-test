import { container } from "tsyringe";

const stack: (number | string)[] = [];

container.registerInstance("Stack", stack);
