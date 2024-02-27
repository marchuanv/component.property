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
        const found = Array.from(Property.all(targetClass)).find(({ propertyName }) => Object.keys(property).find(key => propertyName === key));
        const { propertyName } = found;
        const refId = new RefId({ propertyName, propertyType, targetClass });
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
        const found = Array.from(Property.all(targetClass)).find(({ propertyName }) => Object.keys(property).find(key => propertyName === key));
        const { propertyName } = found;
        const value = property[propertyName];
        const refId = new RefId({ propertyName, propertyType, targetClass });
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
     * get an array of properties that belong to the target class
     * @param { class } targetClass
     * @returns { Array<{ propertyName: String, typeName: String, isGetter: Boolean, isSetter: Boolean }> }
    */
    static *all(targetClass) {
        const type = new GetType(targetClass, new TypeOptions());
        const { propertyMetadata } = type;
        const filteredPropertyMetadata = propertyMetadata.reduce((properies, propMetadata) => {
            if (!properies.find(p => p.propertyName === propMetadata.propertyName)) {
                properies.push(propMetadata);
            }
            return properies;
        },[]);
        for(const { propertyName } of filteredPropertyMetadata) {
            const found = propertyMetadata.find(m => m.propertyName === propertyName);
            const propertyType = Type.get(found.typeName);
            new PropertyCtor(propertyName, propertyType, targetClass);
            yield found;
        }
    }
}
class PropertyCtor extends Property { }
class GetType extends Type {}