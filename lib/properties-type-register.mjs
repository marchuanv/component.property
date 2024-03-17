import { TypeRegisterId, TypeRegister, PropertyTypeRegister } from '../registry.mjs';
export class PropertiesTypeRegister extends TypeRegister {
    /**
     * @param { Array<PropertyTypeRegister> } propertyTypeRegister
     * @param { TypeRegisterId } typeRegisterId
    */
    constructor(propertyTypeRegister, typeRegisterId) {
        if (new.target !== PropertiesTypeRegister) {
            throw new Error(`${PropertiesTypeRegister.name} is a sealed class.`);
        }
        if (typeRegisterId === null || typeRegisterId === undefined || !(typeRegisterId instanceof TypeRegisterId)) {
            throw new Error(`The typeRegisterId argument is null, undefined or not a ${TypeRegisterId.name}.`);
        }
        let _propertyTypeRegister = propertyTypeRegister;
        if (_propertyTypeRegister === null || _propertyTypeRegister === undefined) {
            throw new Error(`The propertyTypeRegister argument is null or undefined.`);
        }
        _propertyTypeRegister = Array.isArray(_propertyTypeRegister) ? _propertyTypeRegister : [_propertyTypeRegister];
        if (_propertyTypeRegister.length > 0 && !(_propertyTypeRegister[0] instanceof PropertyTypeRegister)) {
            throw new Error(`The propertyTypeRegister argument is not a ${PropertyTypeRegister.name} or an array of ${PropertyTypeRegister.name}.`);
        }
        super(typeRegisterId);
        const { metadata } = super.get();
        if (!metadata) {
            super.set(_propertyTypeRegister);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertiesTypeRegister);
    }
    /**
     * @returns { { classId: TypeRegisterId, typeName: String, type: Object, propertyTypeRegister: Array<PropertyTypeRegister> } }
    */
    get() {
        const { Id, typeName, type, metadata } = super.get();
        const propertyTypeRegister = metadata;
        return { classId: Id, typeName, type, propertyTypeRegister };
    }
    /**
     * Set Metadata
     * @param { Object } metadata
    */
    set(metadata) {
        super.set(metadata);
    }
}