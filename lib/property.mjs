import { RefId, Reference, ReferenceOptions } from '../registry.mjs';
export class Property extends Reference {
    /**
     * Creates an instance of a property.
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Property }
    */
    constructor(propName, propertyType, targetClass) {
        if (new.target !== CreateProperty) {
            throw new Error(`${Property.name} is a static class.`);
        }
        const refId = new RefId({ propName, propertyType, targetClass });
        super(targetClass, refId, new ReferenceOptions());
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
        const propName = Object.keys(property)[0];
        const refId = new RefId({ propName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new CreateProperty(propName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        const getter = ref.propertyMetadata.find(({propertyName, isGetter }) => propertyName === propName && isGetter);
        if (!getter) {
            throw new Error(`${targetClass.name} does not have a ${propName} getter property.`);
        }
        return ref.get({ propName, propertyType, targetClass })
    }
    /**
     * set the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Object } value
    */
    static set(property, propertyType, targetClass) {
        const propName = Object.keys(property)[0];
        const value = property[propName];
        const refId = new RefId({ propName, propertyType, targetClass });
        if (!Reference.has(targetClass, refId)) {
            new CreateProperty(propName, propertyType, targetClass);
        }
        const ref = Reference.get(targetClass, refId);
        const setter = ref.propertyMetadata.find(({propertyName, isSetter }) => propertyName === propName && isSetter);
        if (!setter) {
            throw new Error(`${targetClass.name} does not have a ${propName} setter property.`);
        }
        ref.set({ propName, propertyType, targetClass }, value);
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
    /**
     * get an array of properties that belong to the target class
     * @param { class } targetClass
     * @returns { Array<Property } array of property
    */
    static all(targetClass) {
        // for(const prop of ref.propertyMetadata) {
        //     yield new CreateProperty(prop.name, propertyType, targetClass);
        // }
    }
}
class CreateProperty extends Property { }