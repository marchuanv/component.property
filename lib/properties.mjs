import { Namespace, Property, PropertyOptions } from '../registry.mjs';
export class Properties extends Namespace {
    /**
     * @param { Object } targetClass
     * @param { PropertyOptions} options
    */
    constructor(targetClass, options = new PropertyOptions()) {
        if (new.target === Properties) {
            throw new Error(`${Properties.name} is an abstract class.`);
        }
        if (targetClass === null || targetClass === undefined) {
            throw new Error(`The targetClass argument is null or undefined.`);
        }
        if (!targetClass.prototype || typeof targetClass !== 'function') {
            throw new Error(`The targetClass does not have a prototype.`);
        }
        const typeName = targetClass.name;
        const namespaceStr = `${Properties.namespace}.${typeName}.properties`;
        super(namespaceStr);
        if (options !== null && options !== undefined && !(options instanceof PropertyOptions)) {
            throw new Error(`options argument is not of type ${PropertyOptions.name}`);
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
                .map(({ propertyName, descriptor: { get, set } }) => {
                    const getterPropertyScript = get ? get.toString().replace(/\s/g, '') : '';
                    const setterPropertyScript = set ? set.toString().replace(/\s/g, '') : '';
                    return {
                        getterPropertyScript,
                        setterPropertyScript,
                        isGetter: get !== null && get !== undefined,
                        isSetter: set !== null && set !== undefined,
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
                const propertyTypeName = propertyTypeRegEx.get(propertyScript);
                const prop = new Property(
                    propertyName,
                    isGetter,
                    isSetter,
                    typeName,
                    propertyTypeName
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
        if (isProperty) {
            const properties = super.get({ name: 'properties' });
            const prop = properties.find(p =>
                p.name === propertyName &&
                (
                    p.propertyType === propertyType ||
                    p.propertyTypeName === propertyType.name
                ) &&
                p.isGetter
            );
            if (prop) {
                prop.propertyType = propertyType;
            }
            throw new Error(`get ${propertyName} property not found.`);
        } else {
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
        let propertyValue = property[propertyName];
        if (isProperty) {
            const properties = super.get({ name: 'properties' });
            const prop = properties.find(p =>
                p.name === propertyName &&
                (
                    p.propertyType === propertyType ||
                    p.propertyTypeName === propertyType.name
                ) &&
                p.isSetter
            );
            if (prop) {
                prop.propertyType = propertyType;
            }
            throw new Error(`set ${propertyName} property not found.`);
        } else {
            if (property[propertyValue] !== undefined) {
                const value = property[propertyValue];
                delete property[propertyValue];
                super.set(property, value);
            } else {
                throw new Error(`expected a field called ${propertyValue} on thhe property object argument.`);
            }
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