import { Store } from '../registry.mjs';
const schema = {
    propertyName: 'string',
    isGetter: 'boolean',
    isSetter: 'boolean',
    propertyType: 'function'
};
const secureContext = {};
export class Property extends Store {
    /**
     * @param { String } propertyName
     * @param { Boolean } isGetter
     * @param { Boolean } isSetter
     * @param { class } propertyType
    */
    constructor(propertyName, isGetter, isSetter, propertyType) {
        super({ propertyName, isGetter, isSetter, propertyType }, secureContext, schema);
    }
    /**
     * @returns { String }
    */
    get propertyName() {
        const { propertyName } = super.get(secureContext);
        return propertyName;
    }
    /**
     * @returns { Boolean }
    */
    get isGetter() {
        const { isGetter } = super.get(secureContext);
        return isGetter;
    }
    /**
     * @returns { Boolean }
    */
    get isSetter() {
        const { isSetter } = super.get(secureContext);
        return isSetter;
    }
    /**
     * @returns { class }
    */
    get propertyType() {
        const { propertyType } = super.get(secureContext);
        return propertyType;
    }
    /**
     * @returns { Object }
    */
    get data() {
        const { data } = super.get(secureContext);
        return data;
    }
    /**
     * @param { Boolean } value
    */
    set isGetter(value) {
        const store = super.get(secureContext);
        store.isGetter = value;
    }
    /**
     * @param { Boolean } value
    */
    set isSetter(value) {
        const store = super.get(secureContext);
        store.isSetter = value;
    }
    /**
     * @param { Object } value
    */
    set data(value) {
        const store = super.get(secureContext);
        store.data = value;
    }
}