import { PropertiesReferenceContext, PropertiesTypeRegister, PropertyTypeRegister, Type } from '../registry.mjs';
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
const dogPropertiesTypeRegister = new PropertiesTypeRegister(dogProperties, Dog);
const foodPropertiesTypeRegister = new PropertiesTypeRegister(foodProperties, Food);
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
            dogA.food.name = 'dogmore';
            dogA.food.isAdultFood = false;

            const dogB = new Dog(dogContextB);
            dogB.name = 'Bella';
            dogB.food = new Food(foodContextB);
            dogB.food.name = 'epol';
            dogB.food.isAdultFood = true;

            expect(dogA.name).toBe('Luna');
            expect(dogB.name).toBe('Bella');

            expect(dogA.food.isAdultFood).toBeFalse();
            expect(dogB.food.isAdultFood).toBeTrue();

            expect(dogA.food.name).toBe('dogmore');
            expect(dogB.food.name).toBe('epol');
        });
    });
    describe(`when constructing the ${Food.name} class given singleton reference context`, () => {
        it(`should behave like a singleton`, () => {
            const dogContextA = new PropertiesReferenceContext(dogPropertiesTypeRegister, true);
            const dogContextB = new PropertiesReferenceContext(dogPropertiesTypeRegister, true);

            const foodContextA = new PropertiesReferenceContext(foodPropertiesTypeRegister);
            const foodContextB = new PropertiesReferenceContext(foodPropertiesTypeRegister);

            const dogA = new Dog(dogContextA);
            dogA.name = 'Luna';
            dogA.onSet({ name: null }, String, (value) => {
                expect(value).toBe('Bella');
                return value;
            });
            dogA.food = new Food(foodContextA);
            dogA.food.name = 'dogmore';
            dogA.food.isAdultFood = false;

            const dogB = new Dog(dogContextB);
            dogB.name = 'Bella';
            dogB.food = new Food(foodContextB);
            dogB.food.name = 'epol';
            dogB.food.isAdultFood = true;

            expect(dogA.name).toBe('Bella');
            expect(dogB.name).toBe('Bella');

            expect(dogA.food.isAdultFood).toBeTrue();
            expect(dogB.food.isAdultFood).toBeTrue();

            expect(dogA.food.name).toBe('epol');
            expect(dogB.food.name).toBe('epol');
        });
    });
});