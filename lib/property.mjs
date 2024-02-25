import { GUID, Reference } from '../registry.mjs';
class PropertyRef extends Reference {}
export class Property extends Reference {
    /**
     * Creates an instance of a property.
     * @param { String } propertyName
     * @param { class } propertyType
     * @returns { Property }
    */
    constructor(propertyName, propertyType) {
        const target = new.target;
        if (target === Property) {
            throw new Error(`${Property.name} is an abstract class`);
        }
        const refId = new GUID({ propertyName });
        super(propertyType, refId);
        Object.freeze(this);
        super.set({ propertyName }, propertyName);
    }
    /**
     * @return { Object } property type
    */
    get value() {
        return super.instance();
    }
    /**
     * @param { Object } value
    */
    set value(value) {
        return super.set({ propertyName }, value);
    }
}