import { Namespace, Property, PropertyOptions } from '../registry.mjs';
export class Properties extends Namespace {
    /**
     * @param { String } typeNamespace
     * @param { Object } targetClass
     * @param { PropertyOptions} options
    */
    constructor(typeNamespace, targetClass, options = new PropertyOptions()) {
        if (new.target === Properties) {
            throw new Error(`${Properties.name} is an abstract class.`);
        }
        if (typeNamespace === null || typeNamespace === undefined) {
            throw new Error(`The typeNamespace argument is null or undefined.`);
        }
        if (typeof typeNamespace !== 'string' || typeNamespace.replace(/\s/g, '') === '') {
            throw new Error(`The typeNamespace argument is an empty string or not a string.`);
        }
        if (!typeNamespace.startsWith(Properties.namespace)) {
            throw new Error(`The typeNamespace argument does not start with ${Properties.namespace}`);
        }
        if (targetClass === null || targetClass === undefined) {
            throw new Error(`The targetClass argument is null or undefined.`);
        }
        if (!targetClass.prototype) {
            throw new Error(`The targetClass does not have a prototype.`);
        }
        super(typeNamespace);
        if (options !== null && options !== undefined && !(options instanceof PropertyOptions)) {
            throw new Error(`options argument is not of type ${TypeOptions.name}`);
        }
        let properties = super.get({ name: 'properties' });
        if (!properties) {
            properties = [];
            const { getterRegEx, setterRegEx, propertyTypeRegEx } = options;
            const propertyDescriptors = Reflect.ownKeys(targetClass.prototype)
                .map(key => {
                    return {
                        propertyName: key,
                        descriptor: Reflect.getOwnPropertyDescriptor(targetClass.prototype, key)
                    }
                })
                .filter(meta => meta)
            const propGetters = propertyDescriptors
                .filter(({ descriptor }) => descriptor.get && descriptor.get.toString().indexOf('[native code]') === -1)
                .map(({ propertyName, descriptor }) => {
                    const propertyScript = descriptor.get.toString().replace(/\s/g, '');
                    return {
                        propertyScript,
                        isGetter: true,
                        isSetter: false,
                        propertyRegEx: getterRegEx,
                        propertyName
                    }
                }).filter(meta => meta);
            const propSetters = propertyDescriptors
                .filter(({ descriptor }) => descriptor.set && descriptor.set.toString().indexOf('[native code]') === -1)
                .map(({ propertyName, descriptor }) => {
                    const propertyScript = descriptor.set.toString().replace(/\s/g, '');
                    return {
                        propertyScript,
                        isGetter: false,
                        isSetter: true,
                        propertyRegEx: setterRegEx,
                        propertyName
                    }
                }).filter(meta => meta);
            const propMetadata = propGetters.concat(propSetters);
            for (const { propertyScript, propertyName, isGetter, isSetter, propertyRegEx } of propMetadata) {
                const match = propertyRegEx.get(propertyScript);
                const typeName = propertyTypeRegEx.get(match);
                const prop = new Property(
                    typeNamespace,
                    propertyName,
                    isGetter,
                    isSetter,
                    typeName,
                    propertyRegEx,
                    propertyTypeRegEx
                );
                properties.push(prop);
            }
            super.set({ name: 'properties' }, properties);
        }
    }
    /**
     * get the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @returns { Object }
    */
    get(property, propertyType) {
        const propertyName = Object.keys(property)[0];
        const properties = super.get({ name: 'properties' });
        const prop = properties.find(p => p.name === propertyName && p.isGetter);
        if (!prop) {
            throw new Error(`get ${propertyName} property not found.`);
        }
        console.log();
    }
    /**
     * set the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
    */
    set(property, propertyType) {
        const propertyName = Object.keys(property)[0];
        const propertyValue = property[propertyName];
        const properties = super.get({ name: 'properties' });
        const prop = properties.find(p => p.name === propertyName && p.isSetter);
        if (!prop) {
            throw new Error(`set ${propertyName} property not found.`);
        }

        console.log();
    }
    /**
     * callback when property value changes
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { Function } callback
    */
    onSet(property, propertyType, callback) {
    }
    /**
     * @returns { String }
    */
    static get namespace() {
        return 'component.types';
    }
}