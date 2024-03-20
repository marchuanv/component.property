import { Property, PropertyReferenceContext, Reference } from '../registry.mjs';
export class PropertyReference extends Reference {
    /**
     * @param { PropertyReferenceContext } context
    */
    constructor(context) {
        if (new.target !== PropertyReference) {
            throw new Error(`${PropertyReference.name} is a sealed class.`);
        }
        super(context);
        const propertyTypeRegister = context.get();
        const property = propertyTypeRegister.get();
        if (!super.exists) {
            super.set(property);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertyReference);
    }
    /**
     * @returns { String }
    */
    get name() {
        const { propertyName } = super.get(Property.prototype);
        return propertyName;
    }
    /**
     * @returns { Boolean }
    */
    get isGetter() {
        const { isGetter } = super.get(Property.prototype);
        return isGetter;
    }
    /**
     * @returns { Boolean }
    */
    get isSetter() {
        const { isSetter } = super.get(Property.prototype);
        return isSetter;
    }
    /**
     * @returns { class }
    */
    get type() {
        const { propertyType } = super.get(Property.prototype);
        return propertyType;
    }
    /**
     * @template T
     * @param { T } type
     * @returns { T }
    */
    get(type) {
        const { data } = super.get(Property.prototype);
        if (!this.isGetter) {
            throw new Error(`${this.name} does not have a getter property.`);
        }
        return data;
    }
    /**
     * @template T
     * @param { T } value
    */
    set(value) {
        const property = super.get(Property.prototype);
        if (!property.isSetter) {
            throw new Error(`${property.propertyName} does not have a setter property.`);
        }
        property.data = value;
    }
}