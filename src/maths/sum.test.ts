import { sum } from './sum'

describe('sum test', (): void => {
    test('Simple addition is correct.', (): void => {
        expect(sum(1, 2)).toBe(3)
    })
})
