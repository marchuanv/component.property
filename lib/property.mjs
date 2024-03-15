import { GUID, Store } from 'component.uuid';
const secureContext = {};
/**
 * @callback SetterCallback
 * @param { Object } value
*/
export class Property extends Store {
    /**
     * Creates an instance of a Property.
     * @param { GUID } Id
     * @param { String } propertyName
     * @param { Boolean } isSetter
     * @param { Boolean } isGetter
     * @returns { Property }
    */
    constructor(Id, propertyName = null, isGetter = null, isSetter = null) {
        if (new.target !== Property) {
            throw new Error(`${Property.name} is a sealed class.`);
        }
        super({ Id }, secureContext);
        if (!super.get(secureContext)) {
            super.set({
                setterCallback: null,
                propertyName,
                propertyType: null,
                data: null,
                isGetter,
                isSetter,
                extended: []
            }, secureContext);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        const { extended } = super.get(secureContext);
        return extended;
    }
    /**
     * @template T
     * @param { T } type
     * @returns { T }
    */
    get(type) {
        const { data, isGetter, propertyName } = super.get(secureContext);
        if (!isGetter) {
            throw new Error(`${propertyName} does not have a getter property.`);
        }
        return data;
    }
    /**
     * @template T
     * @param { T } value
    */
    set(value) {
        const store = super.get(secureContext);
        if (!store.isSetter) {
            throw new Error(`${store.propertyName} does not have a setter property.`);
        }
        store.data = store.callback ? store.callback(value) : value;
    }
    /**
     * @param { SetterCallback } setterCallback
    */
    onSet(setterCallback) {
        const store = super.get(secureContext);
        if (!store.isSetter) {
            throw new Error(`${store.propertyName} does not have a setter property.`);
        }
        if (store.setterCallback) {
            throw new Error('setterCallback is already set');
        }
        store.setterCallback = setterCallback;
    }
    /**
     * @returns { String }
    */
    get name() {
        const { propertyName } = super.get(secureContext);
        return propertyName;
    }
    /**
     * @returns { class }
    */
    get type() {
        const { propertyType } = super.get(secureContext);
        return propertyType;
    }
    /**
     * @param { class } value
    */
    set type(value) {
        const store = super.get(secureContext);
        store.propertyType = value;
    }
}