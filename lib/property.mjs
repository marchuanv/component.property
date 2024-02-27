import { Namespace } from '../registry.mjs';
export class Property extends Namespace {
    /**
     * Creates an instance of a Property.
     * @param { String } typeNamespace
     * @param { String } propertyName
     * @param { Boolean } isGetter
     * @param { Boolean } isSetter
     * @param { String } typeName
     * @returns { Property }
    */
    constructor(typeNamespace, propertyName, isGetter, isSetter, typeName) {
        if (new.target !== Property) {
            throw new Error(`${Property.name} is a sealed class.`);
        }
        if (typeNamespace === null || typeNamespace === undefined) {
            throw new Error(`The typeNamespace argument is null or undefined.`);
        }
        if (typeof typeNamespace !== 'string' || typeNamespace.replace(/\s/g, '') === '') {
            throw new Error(`The typeNamespace argument is an empty string or not a string.`);
        }
        if (propertyName === null || propertyName === undefined) {
            throw new Error(`The propertyName argument is null or undefined.`);
        }
        if (typeof propertyName !== 'string' || propertyName.replace(/\s/g, '') === '') {
            throw new Error(`The propertyName argument is an empty string or not a string.`);
        }
        if (isGetter === null || isGetter === undefined) {
            throw new Error(`The isGetter argument is null or undefined.`);
        }
        if (typeof isGetter !== 'boolean') {
            throw new Error(`The isGetter argument is not a boolean.`);
        }
        if (isSetter === null || isSetter === undefined) {
            throw new Error(`The isSetter argument is null or undefined.`);
        }
        if (typeof isSetter !== 'boolean') {
            throw new Error(`The isSetter argument is not a boolean.`);
        }
        if (typeName === null || typeName === undefined) {
            throw new Error(`The typeName argument is null or undefined.`);
        }
        if (typeof typeName !== 'string' || typeName.replace(/\s/g, '') === '') {
            throw new Error(`The typeName argument is an empty string or not a string.`);
        }
        super(`${typeNamespace}.${propertyName}`);
        Object.freeze(this);
        if (super.get({ name: 'propertyName' }) === undefined) {
            super.set({ name: 'propertyName' }, propertyName);
        }
        if (super.get({ name: 'typeName' }) === undefined) {
            super.set({ name: 'typeName' }, typeName);
        }

        let _isGetter = super.get({ name: 'isGetter' });
        if (_isGetter === undefined) {
            super.set({ name: 'isGetter' }, isGetter);
            _isGetter = super.get({ name: 'isGetter' });
        }
        if (isGetter !== _isGetter) {
            super.set({ name: 'isGetter' }, isGetter);
        }

        let _isSetter = super.get({ name: 'isSetter' });
        if (_isSetter === undefined) {
            super.set({ name: 'isSetter' }, isSetter);
            _isSetter = super.get({ name: 'isSetter' });
        }
        if (isSetter !== _isSetter) {
            super.set({ name: 'isSetter' }, isSetter);
        }
    }
    /**
     * @returns { String }
    */
    get name() {
        return super.get({ name: 'propertyName' });
    }
    /**
     * @returns { String }
    */
    get typeName() {
        return super.get({ name: 'typeName' });
    }
    /**
     * @returns { Boolean }
    */
    get isGetter() {
        return super.get({ name: 'isGetter' });
    }
    /**
     * @returns { Boolean }
    */
    get isSetter() {
        return super.get({ name: 'isSetter' });
    }
    /**
     * @returns { class }
    */
    get propertyType() {
        return super.get({ name: 'propertyType' });
    }
    /**
     * @param { class } value
    */
    set propertyType(value) {
        super.set({ name: 'propertyType' }, value);
    }
}