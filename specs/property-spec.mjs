import { Food } from './index.mjs';
describe('Property Specifiction Test: ', () => {
    describe(`when creating a property given a property name and type, a target class and a value`, () => {
        let food = null;
        beforeAll(() => {
            food = new Food();
            food.name = 'epol';
            food.isAdultFood = true;
        });
        it(`should match set properties`, () => {
            expect(food.name).toBe('epol');
            expect(food.isAdultFood).toBeTrue();
        });
        it(`should return all properties of a class`, () => {
            expect(food.properties.length).toBeGreaterThan(0);
        });
    });
});