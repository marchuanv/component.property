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
        if (new.target !== CreateProperty) {
            throw new Error(`${Property.name} is a static class.`);
        }
        const refId = new RefId({ propertyName, propertyType, targetClass });
        super(targetClass, refId);
        Object.freeze(this);
        for (const key of Reflect.ownKeys(targetClass.prototype)) {
            const { get, set } = Reflect.getOwnPropertyDescriptor(targetClass.prototype, key);
            if (get) {
                const getterRefId = new RefId({ propertyName, propertyType, targetClass, get });
                super.set({ getterRefId }, true);
            }
            if (set) {
                const setterRefId = new RefId({ propertyName, propertyType, targetClass, set });
                super.set({ setterRefId }, true);
            }
        }
    }
    get getter() {

    }
    get setter() {

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
        return ref.get({ propertyName, propertyType, targetClass })
    }
    /**
     * get the value of a property.
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
        ref.set({ propertyName, propertyType, targetClass }, value);
    }
    /**
     * call callback when property value changes
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