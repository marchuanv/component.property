import { EventEmitter } from 'utils';
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
        if (!this.exists) {
            const propertiesTypeRegister = context.get();
            const propertyTypeRegisters = propertiesTypeRegister.get();
            super.set({
                propertyReferences: propertyTypeRegisters.map(propertyTypeRegister => {
                    const propertyRefContext = new PropertyReferenceContext(propertyTypeRegister);
                    return new PropertyReference(propertyRefContext);
                }),
                events: new EventEmitter()
            });
        }
    }
    /**
     * @returns { Array<PropertyReference> }
    */
    get properties() {
        const { propertyReferences } = super.get();
        return propertyReferences;
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
        const prop = this.properties.find(x => x.name === propertyName && x.targetClass === propertyType);
        if (!prop) {
            throw new Error(`${propertyName} property no found.`);
        }
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
        const { events } = super.get();
        const prop = this.properties.find(x => x.name === propertyName && x.targetClass === propertyType);
        if (!prop) {
            throw new Error(`${propertyName} property no found.`);
        }
        const propertyValue = property[propertyName];
        prop.set(propertyValue);
        events.emit(`set_${propertyName}`, propertyValue);
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
        const { events } = super.get();
        const prop = this.properties.find(x => x.name === propertyName && x.targetClass === propertyType);
        if (!prop) {
            throw new Error(`${propertyName} property no found.`);
        }
        events.once(`set_${propertyName}`, (propertyValue) => {
            const _value = setterCallback.call(this, propertyValue);
            prop.set(_value);
        });
    }
    /**
     * @returns { Boolean }
    */
    get exists() {
        if (!super.exists) {
            return false;
        };
        const { propertyReferences, events } = super.get(Object.prototype);
        return propertyReferences !== null && propertyReferences !== undefined && events !== null && events !== undefined;
    }
}