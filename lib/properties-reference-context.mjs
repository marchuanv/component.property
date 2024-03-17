import { ReferenceId, PropertiesTypeRegister, ReferenceContext } from '../registry.mjs';
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
     * @returns { { Id: ReferenceId, singleton: Boolean, typeRegister: TypeRegister } }
    */
    get() {
        return super.get();
    }
    set() {
        throw new Error(`can't change reference context.`);
    }
}