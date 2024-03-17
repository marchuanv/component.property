import { PropertiesReferenceContext, PropertiesTypeRegister, PropertyTypeRegister, TypeRegister } from '../registry.mjs';
import { Food } from './index.mjs';
class FoodTypeRegister extends TypeRegister {
    constructor() {
        super(null, Food);
    }
}
const typeRegister = new FoodTypeRegister();
const { Id } = typeRegister.get();
const foodPropertiesTypeRegister = new PropertiesTypeRegister([
    new PropertyTypeRegister(Id, 'name', String, true, true),
    new PropertyTypeRegister(Id, 'isAdultFood', Boolean, true, true)
], Id);
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