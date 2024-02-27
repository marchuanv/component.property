import { TypeOptions } from 'component.type';
import { RefId, Reference, ReferenceOptions, Type } from '../registry.mjs';
export class Property extends Reference {
    /**
     * Creates an instance of a property.
     * @param { String } propertyName
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Property }
    */
    constructor(propertyName, propertyType, targetClass) {
        if (new.target !== PropertyCtor) {
            throw new Error(`${Property.name} is a static class.`);
        }
        const refId = new RefId({ propertyName, propertyType, targetClass });
        super(targetClass, refId, new ReferenceOptions());
        Object.freeze(this);
    }
    /**
     * get the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @returns { Object }
    */
    static get(property, propertyType, targetClass) {
        const _propertyType = propertyType;
        const found = Array.from(Property.all(targetClass)).find(({ propertyName, isGetter, propertyType }) => 
            Object.keys(property).find(key => propertyName === key) &&
            isGetter &&
            propertyType === _propertyType
        );
        const { propertyName, refId } = found;
        const ref = Reference.get(targetClass, refId);
        return ref.get({ propertyName, propertyType, targetClass });
    }
    /**
     * set the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Object } value
    */
    static set(property, propertyType, targetClass) {
        const _propertyType = propertyType;
        const found = Array.from(Property.all(targetClass)).find(({ propertyName, isSetter, propertyType }) => 
            Object.keys(property).find(key => propertyName === key) &&
            isSetter &&
            propertyType === _propertyType
        );
        const { propertyName, refId } = found;
        const value = property[propertyName];
        const ref = Reference.get(targetClass, refId);
        ref.set({ propertyName, propertyType, targetClass }, value);
    }
    /**
     * callback when property value changes
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { class } targetClass
     * @param { Function } callback
     * @param { Object } value
    */
    static onSet(property, propertyType, targetClass, callback) {
    }
    /**
     * get an iterator over property metadata for the target class
     * @param { class } targetClass
     * @returns { Array<{ propertyName: String, propertyType: class, typeName: String, isGetter: Boolean, isSetter: Boolean, refId: RefId }> }
    */
    static *all(targetClass) {
        const type = new GetType(targetClass, new TypeOptions());
        const { propertyMetadata } = type;
        for(const propMetadata of propertyMetadata) {
            const { propertyName, typeName } = propMetadata;
            const propertyType = Type.get(typeName);
            propMetadata.propertyType = propertyType;
            const refId = new RefId({ propertyName, propertyType, targetClass });
            propMetadata.refId = refId;
            if (!Reference.has(targetClass, refId)) {
                new PropertyCtor(propertyName, propertyType, targetClass);
            }
            yield propMetadata;
        }
    }
}
class PropertyCtor extends Property { }
class GetType extends Type {}