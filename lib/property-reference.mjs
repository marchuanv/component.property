import { PropertyReferenceContext, Reference } from '../registry.mjs';
/**
 * @callback SetterCallback
 * @param { Object } value
*/
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
        const { type, propertyName, isGetter, isSetter } = typeRegister.get();
        if (!super.get()) {
            super.set({
                setterCallback: null,
                propertyName,
                propertyType: type,
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
        store.data = store.callback ? store.callback(value) : value;
    }
    /**
     * @param { SetterCallback } setterCallback
    */
    onSet(setterCallback) {
        const store = super.get();
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
        const { propertyName } = super.get();
        return propertyName;
    }
    /**
     * @returns { class }
    */
    get type() {
        const { propertyType } = super.get();
        return propertyType;
    }
}