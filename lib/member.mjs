import { MemberParameter } from "./member.parameter.mjs";

export class Member {
    /**
     * @param { String } name
     * @param { Boolean } isClass
     * @param { Boolean } isProperty
     * @param { Boolean } isMethod
     * @param { Boolean } isStatic
     * @param { Object } type
     * @param { Array<MemberParameter> } parameters
     * @returns { Member }
    */
    update(name, isClass, isProperty, isMethod, isStatic, type, parameters) {
        this._name = name;
        this._member = null;
        this._children = [];
        this._index = -1;
        this._isClass = isClass;
        this._isProperty = isProperty;
        this._isMethod = isMethod;
        this._type = type;
        this._isStatic = isStatic;
        this._parameters = parameters;
    }
    /**
     * @returns { String }
     */
    get name() {
        return this._name;
    }
    /**
     * @returns { Boolean }
    */
    get next() {
        if (this._children.length > 0) {
            this._index = this._index + 1;
            const _child = this._children[this._index];
            if (_child) {
                return true
            }
        }
        return false;
    }
    /**
     * @param { String } name
     * @param { Boolean } isClass
     * @param { Boolean } isProperty
     * @param { Boolean } isMethod
     * @param { Boolean } isStatic
     * @returns { Member }
    */
    find(name, isClass, isProperty, isMethod, isStatic) {
        this.reset();
        while(this.next) {
            if (this.child.name === name) {
                if (isStatic) {
                    if (this.child.isStatic) {
                        if (this.child.isClass && isClass) {
                            return this.child;
                        }
                        if (this.child.isProperty && isProperty) {
                            return this.child;
                        }
                        if (this.child.isMethod && isMethod) {
                            return this.child;
                        }
                    }
                } else {
                    if (!this.child.isStatic) {
                        if (this.child.isClass && isClass) {
                            return this.child;
                        }
                        if (this.child.isProperty && isProperty) {
                            return this.child;
                        }
                        if (this.child.isMethod && isMethod) {
                            return this.child;
                        }
                    }
                }
            } else {
                const found = this.child.find(name, isClass, isProperty, isMethod);
                if (found) {
                    return found;
                }
            }
        }
        this.reset();
    }
    /**
     * @param { String } name
     * @param { Boolean } isClass
     * @param { Boolean } isProperty
     * @param { Boolean } isMethod
     * @param { Boolean } isCtor
     * @param { Boolean } isStatic
     * @returns { Member }
    */
    findAll(name, isClass, isProperty, isMethod, isCtor, isStatic) {
        this.reset();
        const found = [];
        while(this.next) {
            if (this.child.name === name) {
                if (this._isClass === isClass) {
                    found.push(this.child);
                }
                if (this._isProperty === isProperty) {
                    found.push(this.child);
                }
                if (this._isMethod === isMethod) {
                    found.push(this.child);
                }
            }
        }
        this.reset();
        return found;
    }
    reset() {
        this._index = -1;
    }
    /**
     * @returns { Member }
    */
    get child() {
        return this._children[this._index];
    }
    /**
     * @param { Member } value
    */
    set child(value) {
        this._children.push(value);
    }
    /**
     * @returns { Object }
    */
    get type() {
        return this._type;
    }
    /**
     * @returns { Boolean }
    */
    get isClass() {
        return this._isClass;
    }
    /**
     * @returns { Boolean }
    */
    get isProperty() {
        return this._isProperty;
    }
    /**
     * @returns { Boolean }
    */
    get isMethod() {
        return this._isMethod;
    }
    /**
     * @returns { Boolean }
    */
    get isStatic() {
        return this._isStatic;
    }
    /**
     * @returns { Boolean }
    */
    get parameters() {
        return this._parameters;
    }

}