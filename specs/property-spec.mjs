import { PropertyOptions } from '../registry.mjs';
import { Food } from './index.mjs';
describe('Property Specifiction Test: ', () => {
    describe(`when constructing the ${Food.name} class given default property options`, () => {
        let foodA = null;
        let foodB = null;
        beforeAll(() => {
            
            const propertyOptions = new PropertyOptions();
            
            foodA = new Food(propertyOptions);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            foodB = new Food(propertyOptions);
            foodB.name = 'epol';
            foodB.isAdultFood = true;

        });
        it(`should not behave like a singleton`, () => {
            
            expect(foodA.name).toBe('dogmore');
            expect(foodA.isAdultFood).toBeFalse();
            expect(foodA.properties.length).toBeGreaterThan(0);

            expect(foodB.name).toBe('epol');
            expect(foodB.isAdultFood).toBeTrue();
            expect(foodB.properties.length).toBeGreaterThan(0);
            
        });
    });
    describe(`when constructing the ${Food.name} class given singleton property options`, () => {
        let foodA = null;
        let foodB = null;
        beforeAll(() => {
            
            const propertyOptions = new PropertyOptions();
            propertyOptions.isSingleton = true;

            foodA = new Food(propertyOptions);
            foodA.name = 'dogmore';
            foodA.isAdultFood = false;

            foodB = new Food(propertyOptions);
            foodB.name = 'epol';
            foodB.isAdultFood = true;

        });
        it(`should behave like a singleton`, () => {
            
            expect(foodA.name).toBe('epol');
            expect(foodA.isAdultFood).toBeTrue();
            expect(foodA.properties.length).toBeGreaterThan(0);

            expect(foodB.name).toBe('epol');
            expect(foodB.isAdultFood).toBeTrue();
            expect(foodB.properties.length).toBeGreaterThan(0);

        });
    });
});