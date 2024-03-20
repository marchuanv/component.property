import { PropertyTypeRegister, ReferenceContext, ReferenceId } from '../registry.mjs';
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
     * @returns { PropertyTypeRegister }
    */
    get() {
        return super.get(PropertyTypeRegister);
    }
}