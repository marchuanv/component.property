import { PropertyRegEx, ReferenceOptions } from "../registry.mjs";
export class PropertyOptions extends ReferenceOptions {
    constructor() {
        super();
        this._getter = new PropertyRegEx(`returnsuper\\.get\\(\\{[a-zA-Z0-9\\:null]+\\}\\,[\\w]+\\)`);
        this._setter = new PropertyRegEx(`super\\.set\\(\\{[a-zA-Z0-9\\:value]+\\}\\,[\\w]+\\)`);
        this._propertyType = new PropertyRegEx(`(?<=\\}\\,)[\\w]+(?=\\))`);
        Object.seal(this);
    }
    /**
     * @returns { PropertyRegEx }
    */
    get getterRegEx() {
        return this._getter;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set getterRegEx(value) {
        this._getter = value;
    }
    /**
     * @returns { PropertyRegEx }
    */
    get setterRegEx() {
        return this._setter;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set setterRegEx(value) {
        this._setter = value;
    }
    /**
     * @returns { PropertyRegEx }
    */
    get propertyTypeRegEx() {
        return this._propertyType;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set propertyTypeRegEx(value) {
        this._propertyType = value;
    }
}