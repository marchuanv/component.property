import { PropertyTypeRegister, Reflection, TypeRegister } from '../registry.mjs';
export class PropertiesTypeRegister extends TypeRegister {
    /**
     * @param { Array<PropertyTypeRegister> } propertyTypeRegisters
     * @param { class } type
    */
    constructor(propertyTypeRegisters, type) {
        if (type === null || type === undefined || !(Reflection.isClass(type))) {
            if (type === null || type === undefined || !(Reflection.isPrimitiveType(type))) {
                throw new Error(`The type argument is null, undefined or not a class or primitive type.`);
            }
        }
        let _propertyTypeRegisters = propertyTypeRegisters;
        if (_propertyTypeRegisters === null || _propertyTypeRegisters === undefined) {
            throw new Error(`The propertyTypeRegisters argument is null or undefined.`);
        }
        _propertyTypeRegisters = Array.isArray(_propertyTypeRegisters) ? _propertyTypeRegisters : [_propertyTypeRegisters];
        if (_propertyTypeRegisters.length > 0 && !(_propertyTypeRegisters[0] instanceof PropertyTypeRegister)) {
            throw new Error(`The propertyTypeRegisters argument is not a ${PropertyTypeRegister.name} or an array of ${PropertyTypeRegister.name}.`);
        }
        super(null, type);
        if (!super.exists) {
            super.set(_propertyTypeRegisters);
        }
    }
    /**
     * @returns { Array<PropertyTypeRegister> }
    */
    get() {
        return super.get(Array);
    }
    set() {
        throw new Error(`can't set property type register store data`);
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertiesTypeRegister);
    }
}