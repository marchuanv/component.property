import { 
    Reflection,
    TypeRegister,
    TypeRegisterId
} from '../registry.mjs';
export class PropertyTypeRegister extends TypeRegister {
    /**
     * Creates an instance of a PropertyTypeRegister.
     * @param { class } type
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { Boolean } isGetter
     * @param { Boolean } isSetter
     * @returns { PropertyTypeRegister }
    */
    constructor(type, propertyName, propertyType = null, isGetter = null, isSetter = null) {
        if (new.target !== PropertyTypeRegister) {
            throw new Error(`${PropertyTypeRegister.name} is a sealed class.`);
        }
        if (type !== null && type !== undefined && !Reflection.isPrimitiveType(type)) {
            if (type !== null && type !== undefined && !Reflection.isClass(type)) {
                throw new Error(`The type argument is null, undefined or not a class.`);
            }
        }
        if (propertyName === null || propertyName === undefined || Reflection.isEmptyString(propertyName)) {
            throw new Error(`The propertyName argument is null, undefined or not a string.`);
        }
        if (propertyType !== null && propertyType !== undefined && !Reflection.isPrimitiveType(propertyType)) {
            if (propertyType !== null && propertyType !== undefined && !Reflection.isClass(propertyType)) {
                throw new Error(`The propertyType argument is null, undefined or not a class.`);
            }
        }
        if (isGetter !== null && isGetter !== undefined && typeof isGetter !== 'boolean') {
            throw new Error(`The isGetter argument is null, undefined or not a boolean.`);
        }
        if (isSetter !== null && isSetter !== undefined && typeof isSetter !== 'boolean') {
            throw new Error(`The isSetter argument is null, undefined or not a boolean.`);
        }
        super(new TypeRegisterId({ type, propertyName }), propertyType);
        const { metadata } = super.get();
        if (!metadata) {
            super.set({
                propertyName,
                isGetter,
                isSetter
            });
        }
    }
    /**
     * @returns { { Id: TypeRegisterId, typeName: String, type: Object, propertyName: String, isGetter: Boolean, isSetter: Boolean } }
    */
    get() {
        const { Id, typeName, type, properties } = super.get();
        const { propertyName, isGetter, isSetter } = properties;
        return { Id, typeName, type, propertyName, isGetter, isSetter, propertyId : Id };
    }
    set() {
        throw new Error(`can't set property type register store data`);
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertyTypeRegister);
    }
}