import { PropertyOptions } from '../registry.mjs';
import { Food } from './index.mjs';
describe('Property Specifiction Test: ', () => {
    describe(`when constructing the ${Food.name} class given default property options`, () => {
        it(`should not behave like a singleton`, () => {
            const options = new PropertyOptions();

            const foodA = new Food(options);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            const foodB = new Food(options);
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
            const propertyOptions = new PropertyOptions();
            propertyOptions.isSingleton = true;

            const foodA = new Food(propertyOptions);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            const foodB = new Food(propertyOptions);
            foodB.name = 'epol';
            foodB.isAdultFood = true;

            expect(foodA.name).toBe('epol');
            expect(foodA.isAdultFood).toBeTrue();
            expect(foodA.properties.length).toBeGreaterThan(0);

            expect(foodB.name).toBe('epol');
            expect(foodB.isAdultFood).toBeTrue();
            expect(foodB.properties.length).toBeGreaterThan(0);

        });
    });
});