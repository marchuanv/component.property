import { PropertiesContext } from '../registry.mjs';
import { Food } from './index.mjs';
describe('Property Specifiction Test: ', () => {
    describe(`when constructing the ${Food.name} class given default property options`, () => {
        it(`should not behave like a singleton`, () => {
            const contextA = new PropertiesContext(Food);
            const contextB = new PropertiesContext(Food);

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
            const contextA = new PropertiesContext(Food, true);
            const contextB = new PropertiesContext(Food, true);

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