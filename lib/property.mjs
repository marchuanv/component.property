import { RefId, Reference, Type } from '../registry.mjs';
export class Property extends Reference {
    /**
     * Creates an instance of a property.
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Property }
    */
    constructor(propertyName, propertyType, targetClass) {
        if (new.target !== CreateProperty) {
            throw new Error(`${Property.name} is a static class.`);
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
     * @returns { Object }
     */
    static get(property, propertyType, targetClass) {
        const propertyName = Object.keys(property)[0];
        const refId = new RefId({ propertyName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new CreateProperty(propertyName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        const getter = ref.propertyMetadata.find(propMeta => propMeta.name.startsWith('get') && propMeta.name.endsWith(propertyName));
        if (!getter) {
            throw new Error(`getter ${propertyName} not found in class`);
        }
        return ref.get({ propertyName, propertyType, targetClass })
    }
    /**
     * set the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Object } value
     */
    static set(property, propertyType, targetClass) {
        const propertyName = Object.keys(property)[0];
        const value = property[propertyName];
        const refId = new RefId({ propertyName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new CreateProperty(propertyName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        const setter = ref.propertyMetadata.find(propMeta => propMeta.name.startsWith('set') && propMeta.name.endsWith(propertyName));
        if (!setter) {
            throw new Error(`setter ${propertyName} not found in class`);
        }
        ref.set({ propertyName, propertyType, targetClass }, value);
    }
    /**
     * callback when property value changes
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Function } callback
     * @param { Object } value
     */
    static onSet(property, propertyType, targetClass, callback) {
    }
}
class CreateProperty extends Property { }