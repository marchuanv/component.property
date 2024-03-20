import { PropertyReferenceContext, Reference } from '../registry.mjs';
export class PropertyReference extends Reference {
    /**
     * @param { PropertyReferenceContext } context
    */
    constructor(context) {
        if (new.target !== PropertyReference) {
            throw new Error(`${PropertyReference.name} is a sealed class.`);
        }
        super(context);
        const { typeRegister } = context.get();
        const { propertyName, isGetter, isSetter, type } = typeRegister.get();
        if (!super.get()) {
            super.set({
                type,
                propertyName,
                data: null,
                isGetter,
                isSetter
            });
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== ReferenceProperty);
    }
    /**
     * @returns { String }
    */
    get name() {
        const { propertyName } = super.get();
        return propertyName;
    }
    /**
     * @returns { Boolean }
    */
    get isGetter() {
        const { isGetter } = super.get();
        return isGetter;
    }
    /**
     * @returns { Boolean }
    */
    get isSetter() {
        const { isSetter } = super.get();
        return isSetter;
    }
    /**
     * @returns { class }
    */
    get type() {
        const { type } = super.get();
        return type;
    }
    /**
     * @template T
     * @param { T } type
     * @returns { T }
    */
    get(type) {
        const { data, isGetter, propertyName } = super.get();
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
        const store = super.get();
        if (!store.isSetter) {
            throw new Error(`${store.propertyName} does not have a setter property.`);
        }
        store.data = value;
    }
}