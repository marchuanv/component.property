import { Property } from "../../registry.mjs"
import { Food } from "../index.mjs"
export class FoodKindProperty extends Property {
    constructor() {
        super('kind', Food);
    }
}