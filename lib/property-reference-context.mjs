import { ReferenceId, PropertyTypeRegister, ReferenceContext } from '../registry.mjs';
export class PropertyReferenceContext extends ReferenceContext {
    /**
     * @param { PropertyTypeRegister } propertyTypeRegister
     * @param { Boolean } singleton
     * @param { ReferenceId } refId
    */
    constructor(propertyTypeRegister, singleton = false, refId = new ReferenceId()) {
        super(propertyTypeRegister, singleton, refId);
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertyTypeRegister);
    }
    /**
     * @returns { { Id: ReferenceId, singleton: Boolean, propertyTypeRegister: PropertyTypeRegister } }
    */
    get() {
        return super.get();
    }
    set() {
        throw new Error(`can't change reference context.`);
    }
}