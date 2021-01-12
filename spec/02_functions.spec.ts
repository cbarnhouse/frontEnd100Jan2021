describe('functions', () => {

    describe('parameters and overloading ', () => {
        it('you cannot overload', () => {

            /*
            function formatName(first: string, last: string): string {
                return `${last}, ${first}`;
            }

            function formatName(first: string, last: string, mi?: string): string {
                return `${last}, ${first}, ${mi}`;
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
            */

            function formatName(first: string, last: string, mi?: string) {
                let fullName = `${last}, ${first}`
                if (mi) {
                    fullName += ` ${mi}`;
                }

                return fullName;
            }
        });

        it('default values for parameters', () => {
            function add(a: number = 2, b: number = 10): number {
                return a + b;
            }

            //rest operator
            function add2(a: number = 2, b: number = 10, ...rest: number[]): number {
                const firstTwo = a + b;
                return rest.reduce((a, b) => a + b, firstTwo)
            }
        });

        it('side-hike "spread" operator ...', () => {
            const starter = [1, 2, 3, 4, 5];

            const result = [0, ...starter, 8];
            expect(result).toEqual([0, 1, 2, 3, 4, 5, 8]);

            const movie = {
                title: 'title',
                genre: 'action',
                yearReleased: 2005
            }

            const movie2 = {
                ...movie,
                yearReleased: 2010
            }
        });

        describe('higher-ordered functions', () => {
            //takes one or more functions as a parameter
            //returns a function as its result 

            it('making tags with normal old function', () => {
                // <element><content></element>
                //<h1>hello world</h1>

                function tagMaker(tag: string, content: string): string {
                    return `<${tag}>${content}</${tag}>`;
                }
                expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
            });

            it('higher-ordered function way', () => {
                function tagMaker(tag: string): (content: string) => string {
                    //closure - the function returned "closes around" the data that was used to create it.
                    return (c) => `<${tag}>${c}</${tag}>`;
                }
                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>')
                expect(pMaker('Hello')).toBe('<p>Hello</p>')
            });

            it('a function that takes a function as an argument', () => {
                function printTotal(message: string = 'has been paid', ...amounts: number[]): string {
                    const total = amounts.reduce((state, next) => state + next);
                    return `$${total} ${message}`;
                }

                expect(printTotal(undefined, 1, 2, 3)).toBe('$6 has been paid');
                expect(printTotal('got your money', 1, 2, 3, 4, 5, 6)).toBe('$21 got your money');

                function printTotal2(fn: (x: number) => string, ...amounts: number[]): string {
                    const total = amounts.reduce((state, next) => state + next); // for now, just a clever way to sum up an array.
                    return fn(total);
                }

                expect(printTotal2((x) => x.toString(), 1, 2, 3)).toBe('6');
                expect(printTotal2((y) => '***' + y + '***', 1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe('***45***');

                function doubleIt(num: number): string {
                    return (num * 2).toString();
                }

                expect(printTotal2(doubleIt, 1, 2)).toBe('6');
            });
        });

        //all array methods are immutable, they do not modify the original array object 
        describe('array methods', () => {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            it('has a way to visit each element of the array', () => {
                numbers.forEach((e, i, c) => {
                    console.log(e, i, c);
                })
                //e = element, i = index, c = whole array

                function logIt(e: number, i: number, c: number[]) {
                    console.log({ e, i, c });
                }
                numbers.forEach(logIt);
            });

            describe('array methods that return a new array', () => {
                it('filtering an array', () => {
                    const evens = numbers.filter(e => e % 2 === 0)

                    expect(evens).toEqual([2, 4, 6, 8]);
                });

                it('transform each element into a new thing for a new array', () => {
                    const doubled = numbers.map(n => n * 2)
                    expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18])

                    const answer = numbers
                        .filter(n => n % 2 === 0)
                        .map(n => n * 2)
                        .map(n => n.toString())

                    expect(answer).toEqual(['4', '8', '12', '16']);
                    //new array that is evens that are turned into strings and multiplied by 2 
                });
            });

            describe('array methods that return a single value', () => {

                it('check membership', () => {
                    const allEven = numbers.every(n => n % 2 === 0);
                    //if every element is even, it returns true

                    const anyEven = numbers.some(n => n % 2 === 0);
                    //if at least 1 element is even, return true
                });

                it('boiling array down into 1 thing using reduce', () => {
                    const total = numbers.reduce((state, next) => state + next);
                    expect(total).toBe(45);

                    const total2 = numbers.reduce((state, next) => state + next, 100);
                    expect(total2).toBe(145);
                });

                describe('a couple of practices', () => {

                    it('try this one', () => {
                        interface Vehicle {
                            vin: string;
                            make: string;
                            model: string;
                            mileage: number;
                        }

                        const vehicles: Vehicle[] = [
                            { vin: '89888', make: 'Chevy', model: 'Bolt', mileage: 18_230 },
                            { vin: '8389h3i38', make: 'Honda', model: 'Pilot', mileage: 52_123 },
                            { vin: '7390399333', make: 'Ram', model: '1500', mileage: 83_238 }
                        ];

                        // our rule is a high-mileage vehicle is any vehicle with 50,000 or over.
                        const highMileageVehicles = vehicles
                            .filter(vehicle => vehicle.mileage >= 50_000)
                            .map(vehicle => `${vehicle.make} ${vehicle.model}`)

                        expect(highMileageVehicles).toEqual(['Honda Pilot', 'Ram 1500']);
                    });

                    it('another practice', () => {
                        interface Game {
                            name: string;
                            score: number;
                        }

                        const bowlingNight: Game[] = [
                            { name: 'Jeff', score: 120 },
                            { name: 'Stacey', score: 260 },
                            { name: 'Henry', score: 110 },
                            { name: 'Violet', score: 135 }
                        ];

                        interface BowlingSummary {
                            highScore: number,
                            highScorer: string,
                            lowScore: number,
                            lowScorer: string
                        }
                        const initialState: BowlingSummary = {
                            highScore: -1,
                            highScorer: null,
                            lowScore: 301,
                            lowScorer: null
                        }
                        // Your Code Here
                        const result = bowlingNight.reduce((state: BowlingSummary, next: Game) => {
                            if (next.score > state.highScore) {
                                state.highScore = next.score;
                                state.highScorer = next.name;
                            }
                            if (next.score < state.lowScore) {
                                state.lowScore = next.score;
                                state.lowScorer = next.name;
                            }
                            return state;
                        }, initialState)


                        expect(result).toEqual({
                            highScore: 260,
                            highScorer: 'Stacey',
                            lowScore: 110,
                            lowScorer: 'Henry'
                        });

                        // if you get this done, how would you handle ties?
                    });

                });

            });

        });

    });
});
