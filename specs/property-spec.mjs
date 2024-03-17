import { PropertiesReferenceContext, PropertiesTypeRegister, PropertyReference, PropertyTypeRegister, Reference, TypeRegister } from '../registry.mjs';
import { Food } from './index.mjs';
class FoodTypeRegister extends TypeRegister {
    constructor() {
        super(null, Food);
    }
}
class StringTypeRegister extends TypeRegister {
    constructor() {
        super(null, String);
    }
}
class BooleanTypeRegister extends TypeRegister {
    constructor() {
        super(null, Boolean);
    }
}
let typeRegisters = [
    new FoodTypeRegister(),
    new StringTypeRegister(),
    new BooleanTypeRegister()
];
typeRegisters = typeRegisters.map(register => {
    const { Id, type, typeName } = register.get();
    switch(type) {
        case Food: {
            const properties = typeRegisters.map(register => {
                const { Id, type } = register.get();
                switch(type) {
                    case String: {
                        return new PropertyTypeRegister(Id, 'name', type, true, true);
                    }
                    case Boolean: {
                        return new PropertyTypeRegister(Id, 'isAdultFood', type, true, true);
                    }
                    default: {
                        return null;
                    }
                }
            }).filter(x => x);
            return {
                key: typeName,
                value: new PropertiesTypeRegister(properties, Id)
            };
        }
        default: {
            return null;
        }
    }
}).filter(x => x).reduce((obj, { key, value }) => {
    obj[key] = value;
    return obj;
},{});
const foodPropertiesTypeRegister = typeRegisters[Food.name];
describe('Property Specifiction Test: ', () => {
    describe(`when constructing the ${Food.name} class given default property options`, () => {
        it(`should not behave like a singleton`, () => {

            const contextA = new PropertiesReferenceContext(foodPropertiesTypeRegister);
            const contextB = new PropertiesReferenceContext(foodPropertiesTypeRegister);

            const foodA = new Food(contextA);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            const foodB = new Food(contextB);
            foodB.name = 'epol';
            foodB.isAdultFood = true;

            expect(foodA.name).toBe('dogmore');
            expect(foodA.isAdultFood).toBeFalse();
            expect(foodB.name).toBe('epol');
            expect(foodB.isAdultFood).toBeTrue();
        });
    });
    describe(`when constructing the ${Food.name} class given singleton property options`, () => {
        it(`should behave like a singleton`, () => {
            const contextA = new PropertiesReferenceContext(foodPropertiesTypeRegister, true);
            const contextB = new PropertiesReferenceContext(foodPropertiesTypeRegister, true);

            const foodA = new Food(contextA);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            const foodB = new Food(contextB);
            foodB.name = 'epol';
            foodB.isAdultFood = true;

            expect(foodA.name).toBe('epol');
            expect(foodA.isAdultFood).toBeTrue();

            expect(foodB.name).toBe('epol');
            expect(foodB.isAdultFood).toBeTrue();
        });
    });
});