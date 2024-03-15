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
        let propertiesMetadata = super.get(secureContext);
        if (propertiesMetadata === null) {
            propertiesMetadata = {};
            for (const propertyKey of Reflect.ownKeys(Class.prototype)) {
                const descriptor = Reflect.getOwnPropertyDescriptor(Class.prototype, propertyKey);
                if (descriptor && descriptor.get || descriptor.set) {
                    const isGetter = descriptor.get ? true : false;
                    const isSetter = descriptor.set ? true : false;
                    const Id = new PropertyId();
                    new Property(Id, propertyKey, isGetter, isSetter);
                    propertiesMetadata[propertyKey] = Id;
                }
            }
            super.set(propertiesMetadata);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== Properties);
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
        const propertiesMetadata = super.get(secureContext);
        const prop = getProperty(propertiesMetadata, propertyName, propertyType);
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
        const propertiesMetadata = super.get(secureContext);
        const prop = getProperty(propertiesMetadata, propertyName, propertyType);
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
        const propertiesMetadata = super.get(secureContext);
        const prop = getProperty(propertiesMetadata, propertyName, propertyType);
        prop.onSet(setterCallback);
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