import { 
    Reflection,
    TypeRegister,
    TypeRegisterId
} from '../registry.mjs';
export class PropertyTypeRegister extends TypeRegister {
    /**
     * Creates an instance of a PropertyTypeRegister.
     * @param { TypeRegisterId } typeRegisterId
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { Boolean } isGetter
     * @param { Boolean } isSetter
     * @returns { PropertyTypeRegister }
    */
    constructor(typeRegisterId, propertyName, propertyType = null, isGetter = null, isSetter = null) {
        if (new.target !== PropertyTypeRegister) {
            throw new Error(`${PropertyTypeRegister.name} is a sealed class.`);
        }
        if (typeRegisterId === null || typeRegisterId === undefined || !(typeRegisterId instanceof TypeRegisterId) ) {
            throw new Error(`The typeRegisterId argument is null, undefined or not a ${TypeRegisterId.name}.`);
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
        super(new TypeRegisterId({ typeRegisterId, propertyName }), propertyType);
        const { metadata } = super.get();
        if (!metadata) {
            super.set({
                classId: typeRegisterId,
                propertyName,
                isGetter,
                isSetter
            });
        }
    }
    /**
     * @returns { { Id: TypeRegisterId, classId: TypeRegisterId, typeName: String, type: Object, propertyName: String, isGetter: Boolean, isSetter: Boolean } }
    */
    get() {
        const { Id, typeName, type, metadata } = super.get();
        const { classId, propertyName, isGetter, isSetter } = metadata;
        return { Id, classId, typeName, type, propertyName, isGetter, isSetter };
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