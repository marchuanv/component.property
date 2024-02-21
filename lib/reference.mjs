import { GUID, Type } from '../registry.mjs';
const references = new WeakMap();
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { String } refName reference name
    */
    constructor(namespace, target, refName) {
        Object.freeze(this);
        const type = new Type(namespace, target);
        const Id = new GUID({ typeId: type.toString(), refName });
        if (references.has(Id)) {
            return references.get(Id);
        } else {
            references.set(Id, this);
            references.set(this, { Id, target, instance: null });
        }
    }
    toString() {
        const { Id } = references.get(this);
        return Id.toString();
    }
    /**
     * @param { Array<Object> } args
    */
    construct(args = []) {
        const ref = references.get(this);
        const { target } = ref;
        if (ref.instance) {
            return ref.instance;
        } else {
            ref.instance = Reflect.construct(target, args);
            return ref.instance;
        }
    }
}