import { PropertiesTypeRegister, ReferenceContext, ReferenceId } from '../registry.mjs';
export class PropertiesReferenceContext extends ReferenceContext {
    /**
     * @param { PropertiesTypeRegister } propertiesTypeRegister
     * @param { Boolean } singleton
     * @param { ReferenceId } refId
    */
    constructor(propertiesTypeRegister, singleton = false, refId = new ReferenceId()) {
        super(propertiesTypeRegister, singleton, refId);
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== PropertiesReferenceContext);
    }
    /**
     * @returns { PropertiesTypeRegister }
    */
    get() {
        return super.get();
    }
}