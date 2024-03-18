import { PropertiesReferenceContext, PropertiesTypeRegister, PropertyReference, PropertyTypeRegister, Reference, Type, TypeRegister } from '../registry.mjs';
import { Dog, Food } from './index.mjs';
new Type(Food);
new Type(Dog);
const dogProperties = [
    new PropertyTypeRegister(Dog, 'name', String, true, true),
    new PropertyTypeRegister(Dog, 'food', Food, true, true)
];
const foodProperties = [
    new PropertyTypeRegister(Food, 'name', String, true, true),
    new PropertyTypeRegister(Food, 'isAdultFood', Boolean, true, true)
];
const dogPropertiesTypeRegister =  new PropertiesTypeRegister(dogProperties, Dog);
const foodPropertiesTypeRegister =  new PropertiesTypeRegister(foodProperties, Food);
describe('Properties Specifiction Test: ', () => {
    describe(`when constructing the ${Food.name} class given default reference context`, () => {
        it(`should not behave like a singleton`, () => {

            const dogContextA = new PropertiesReferenceContext(dogPropertiesTypeRegister);
            const dogContextB = new PropertiesReferenceContext(dogPropertiesTypeRegister);

            const foodContextA = new PropertiesReferenceContext(foodPropertiesTypeRegister);
            const foodContextB = new PropertiesReferenceContext(foodPropertiesTypeRegister);

            const dogA = new Dog(dogContextA);
            dogA.name = 'Luna';
            dogA.food = new Food(foodContextA);

            const dogB = new Dog(dogContextB);
            dogB.name = 'Bella';
            dogB.food = new Food(foodContextB);

            expect(dogA.name).toBe('Luna');
            expect(dogB.name).toBe('Bella');
        });
    });
    describe(`when constructing the ${Food.name} class given singleton reference context`, () => {
        it(`should behave like a singleton`, () => {
            const dogContextA = new PropertiesReferenceContext(dogPropertiesTypeRegister);
            const dogContextB = new PropertiesReferenceContext(dogPropertiesTypeRegister);

            const foodContextA = new PropertiesReferenceContext(foodPropertiesTypeRegister);
            const foodContextB = new PropertiesReferenceContext(foodPropertiesTypeRegister);

            const dogA = new Dog(dogContextA);
            dogA.name = 'Luna';
            dogA.food = new Food(foodContextA);

            const dogB = new Dog(dogContextB);
            dogB.name = 'Bella';
            dogB.food = new Food(foodContextB);

            expect(dogA.name).toBe('Bella');
            expect(dogB.name).toBe('Bella');
        });
    });
});