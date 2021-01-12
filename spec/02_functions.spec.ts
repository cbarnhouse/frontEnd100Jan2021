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

    });
});
