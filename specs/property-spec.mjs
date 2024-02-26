import { Property } from '../registry.mjs';
class Food {
    get kind() {
        return Property.get({ kind: null }, String, Food);
    }
    set kind(value) {
        Property.set({ kind: null }, String, Food, value);
    }
}
describe('Property Specifiction Test: ', () => {
    describe(`when creating a property given a property name and type, a target class and a value`, () => {
        let food = null;
        beforeAll(() => {
            food = new Food();
            food.kind = '5a101433-db49-49fe-89f0-49e204212a9e';
        });
        it(`should return '5a101433-db49-49fe-89f0- 49e204212a9e'`, () => {
            expect(food.kind).toBe('5a101433-db49-49fe-89f0-49e204212a9e');
        });
    });
});