import { PropertyRegEx } from "../registry.mjs";
let getter = new PropertyRegEx(`returnsuper\\.get\\(\\{[a-zA-Z0-9\\:null]+\\}\\,[\\w]+\\)`);
let setter = new PropertyRegEx(`super\\.set\\(\\{[a-zA-Z0-9\\:value]+\\}\\,[\\w]+\\)`);
let propertyType = new PropertyRegEx(`(?<=\\}\\,)[\\w]+(?=\\))`);
export class PropertyOptions {
    /**
     * @returns { PropertyRegEx }
    */
    get getterRegEx() {
        return getter;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set getterRegEx(value) {
        getter = value;
    }
    /**
     * @returns { PropertyRegEx }
    */
    get setterRegEx() {
        return setter;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set setterRegEx(value) {
        setter = value;
    }
    /**
     * @returns { PropertyRegEx }
    */
    get propertyTypeRegEx() {
        return propertyType;
    }
    /**
     * @param { PropertyRegEx } value
    */
    set propertyTypeRegEx(value) {
        propertyType = value;
    }
}