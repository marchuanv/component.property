import { PropertyTypeRegister, Reflection, Type, TypeRegister, TypeRegisterId } from '../registry.mjs';
export class PropertiesTypeRegister extends TypeRegister {
    /**
     * @param { Array<PropertyTypeRegister> } propertyTypeRegister
     * @param { class } type
    */
    constructor(propertyTypeRegister, type) {
        if (type === null || type === undefined || !(Reflection.isClass(type))) {
            if (type === null || type === undefined || !(Reflection.isPrimitiveType(type))) {
                throw new Error(`The type argument is null, undefined or not a class or primitive type.`);
            }
        }
        let _propertyTypeRegister = propertyTypeRegister;
        if (_propertyTypeRegister === null || _propertyTypeRegister === undefined) {
            throw new Error(`The propertyTypeRegister argument is null or undefined.`);
        }
        _propertyTypeRegister = Array.isArray(_propertyTypeRegister) ? _propertyTypeRegister : [_propertyTypeRegister];
        if (_propertyTypeRegister.length > 0 && !(_propertyTypeRegister[0] instanceof PropertyTypeRegister)) {
            throw new Error(`The propertyTypeRegister argument is not a ${PropertyTypeRegister.name} or an array of ${PropertyTypeRegister.name}.`);
        }
        new Type(type);
        super(null, type);
        const { properties } = super.get();
        if (properties === null || properties === undefined) {
            super.set(_propertyTypeRegister)
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertiesTypeRegister);
    }
}