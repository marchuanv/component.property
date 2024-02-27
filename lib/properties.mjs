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
            const propMetadata = propertyDescriptors
                .filter(({ descriptor }) =>
                    (descriptor.get && descriptor.get.toString().indexOf('[native code]') === -1) ||
                    (descriptor.set && descriptor.set.toString().indexOf('[native code]') === -1)
                )
                .map(({ propertyName, descriptor }) => {
                    const getterPropertyScript = descriptor.get.toString().replace(/\s/g, '');
                    const setterPropertyScript = descriptor.set.toString().replace(/\s/g, '');
                    return {
                        getterPropertyScript,
                        setterPropertyScript,
                        isGetter: descriptor.get !== null && descriptor.get !== undefined,
                        isSetter: descriptor.set !== null && descriptor.set !== undefined,
                        propertyName
                    }
                }).filter(meta => meta);
            for (const { propertyName, getterPropertyScript, setterPropertyScript, isGetter, isSetter } of propMetadata) {
                let propertyScript = '';
                if (isGetter) {
                    propertyScript = getterRegEx.get(getterPropertyScript);
                }
                if (isSetter) {
                    propertyScript = setterRegEx.get(setterPropertyScript);
                }
                const typeName = propertyTypeRegEx.get(propertyScript);
                const prop = new Property(
                    typeNamespace,
                    propertyName,
                    isGetter,
                    isSetter,
                    typeName
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
     * @param { Boolean } isProperty
     * @returns { Object }
    */
    get(property, propertyType, isProperty = true) {
        const propertyName = Object.keys(property)[0];
        const properties = super.get({ name: 'properties' });
        const prop = properties.find(p =>
            p.name === propertyName &&
            (
                p.propertyType === propertyType ||
                p.typeName === propertyType.name
            ) &&
            p.isGetter
        );
        if (prop) {
            prop.propertyType = propertyType;
        } else {
            if (isProperty) {
                throw new Error(`get ${propertyName} property not found.`);
            }
            return super.get(property);
        }
    }
    /**
     * set the value of a property.
     * @param { Object } property .i.e { name: 'Joe Blog' }
     * @param { class } propertyType
     * @param { Boolean } isProperty
    */
    set(property, propertyType, isProperty = true) {
        const propertyName = Object.keys(property)[0];
        const propertyValue = property[propertyName];
        const properties = super.get({ name: 'properties' });
        const prop = properties.find(p =>
            p.name === propertyName &&
            (
                p.propertyType === propertyType ||
                p.typeName === propertyType.name
            ) &&
            p.isSetter
        );
        if (prop) {
            prop.propertyType = propertyType;
        } else {
            if (isProperty) {
                throw new Error(`set ${propertyName} property not found.`);
            }
            super.set(property, propertyValue);
        }
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