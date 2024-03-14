import { ReferenceOptions } from "../registry.mjs";
export class PropertyOptions extends ReferenceOptions {
    constructor() {
        super();
        Object.freeze(this);
    }
}