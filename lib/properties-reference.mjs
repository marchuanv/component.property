import {
    PropertiesReferenceContext,
    PropertyReference,
    PropertyReferenceContext,
    Reference
} from '../registry.mjs';
/**
 * @callback SetterCallback
 * @param { Object } value
*/
export class PropertiesReference extends Reference {
    /**
     * @param { PropertiesReferenceContext } context
    */
    constructor(context) {
        if (new.target === PropertiesReference) {
            throw new Error(`${PropertiesReference.name} is an abstract class.`);
        }
        if (context === null || context === undefined || !(context instanceof PropertiesReferenceContext)) {
            throw new Error(`The context argument is null, undefined or not a ${PropertiesReferenceContext.name} type.`);
        }
        super(context);
        const { typeRegister } = context.get();
        if (!super.get()) {
            const { metadata } = typeRegister.get();
            super.set(metadata.map(propReg => {
                const propertyRefContext = new PropertyReferenceContext(propReg);
                return new PropertyReference(propertyRefContext);
            }));
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertiesReference);
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
 * @returns { PropertyReference }
*/
function getProperty(propertiesMetadata, propertyName, propertyType) {
    const propertyId = propertiesMetadata[propertyName];
    if (propertyId) {
        const prop = new PropertyReference(propertyId);
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