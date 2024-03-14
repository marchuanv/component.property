import { GUID, Property, PropertyOptions, Reference } from '../registry.mjs';
const secureContext = {};
class PropertyId extends GUID { }
/**
 * @callback SetterCallback
 * @param { Object } value
*/
export class Properties extends Reference {
    /**
     * @param { PropertyOptions} options
    */
    constructor(options) {
        let Class = new.target;
        if (Class === Properties) {
            throw new Error(`${Properties.name} is an abstract class.`);
        }
        if (options !== null && options !== undefined && !(options instanceof PropertyOptions)) {
            throw new Error(`options argument is not of type ${PropertyOptions.name}`);
        }
        super(options);
        const { data } = super.get(secureContext);
        if (Object.keys(data).length === 0) {
            for (const propertyKey of Reflect.ownKeys(Class.prototype)) {
                const descriptor = Reflect.getOwnPropertyDescriptor(Class.prototype, propertyKey);
                if (descriptor && descriptor.get || descriptor.set) {
                    const isGetter = descriptor.get ? true : false;
                    const isSetter = descriptor.set ? true : false;
                    const Id = new PropertyId();
                    new Property(Id, propertyKey, isGetter, isSetter);
                    data[propertyKey] = Id;
                }
            }
        }
    }
    /**
     * get the value of a property.
     * @template T
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { T } propertyType
     * @returns { T }
    */
    get(property, propertyType) {
        const propertyName = Object.keys(property)[0];
        const { data } = super.get(secureContext);
        const prop = getProperty(data, propertyName, propertyType);
        return prop.get();
    }
    /**
     * set the value of a property.
     * @template T
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { T } propertyType
    */
    set(property, propertyType) {
        const propertyName = Object.keys(property)[0];
        const { data } = super.get(secureContext);
        const prop = getProperty(data, propertyName, propertyType);
        const propertyValue = property[propertyName];
        prop.set(propertyValue);
    }
    /**
     * callback when a property value changes
     * @template T
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { T } propertyType
     * @param { SetterCallback } setterCallback
    */
    onSet(property, propertyType, setterCallback) {
        const propertyName = Object.keys(property)[0];
        const { data } = super.get(secureContext);
        const prop = getProperty(data, propertyName, propertyType);
        prop.onSet(setterCallback);
    }
    /**
     * the class that was targeted when Properties was constructed
     * @returns { class }
    */
    get targetClass() {
        const { targetClass } = super.get(secureContext);
        return targetClass;
    }
}
/**
 * @template T
 * @param { Object} propertiesMetadata
 * @param { String } propertyName
 * @param { T } propertyType
 * @returns { Property }
*/
function getProperty(propertiesMetadata, propertyName, propertyType) {
    const propertyId = propertiesMetadata[propertyName];
    if (propertyId) {
        const prop = new Property(propertyId);
        if (prop.type === null) {
            prop.type = propertyType;
        } else if (prop.type !== propertyType) {
            throw new Error(`${propertyName} property type is not the same.`)
        }
        return prop;
    } else {
        throw new Error(`${propertyName} property does not exist.`);
    }
}