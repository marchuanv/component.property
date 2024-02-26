import { RefId, Reference } from '../registry.mjs';
export class Property extends Reference {
    /**
     * Creates an instance of a property.
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Property }
    */
    constructor(propertyName, propertyType, targetClass) {
        if (new.target !== Property) {
            throw new Error(`${Property.name} is a sealed class`);
        }
        const refId = new RefId({ propertyName, propertyType, targetClass });
        super(targetClass, refId);
        Object.freeze(this);
    }
    /**
     * get the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Property }
     */
    static get(property, propertyType, targetClass) {
        const propertyName = Object.keys(property)[0];
        const refId = new RefId({ propertyName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new Property(propertyName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        return ref.get({ propertyName, propertyType, targetClass })
    }
    /**
     * get the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Object } value
     * @returns { Property }
     */
    static set(property, propertyType, targetClass, value) {
        const propertyName = Object.keys(property)[0];
        const refId = new RefId({ propertyName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new Property(propertyName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        ref.set({ propertyName, propertyType, targetClass }, value);
    }
}