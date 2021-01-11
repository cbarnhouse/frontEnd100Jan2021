describe('variables and types in typescript', () => {
    it('untyped variables', () => {
        let x;

        x = 12;
        expect(x).toBe(12);
        x = 'tacos';
        expect(x).toBe('tacos');
    });

    it('typed variables', () => {
        let x: number | string;

        x = 12;

        expect(x).toBe(12);
        x = 'tacos';
    });

    it('initializing with let', () => {
        let x = 12; //initializing
        let y = 'Gene';

        //x = "Bird";
    });

    describe('constants', () => {
        it('declaring them', () => {
            const PI = 3.14159
        });
        it('does not change underlying types', () => {
            const friends = ['Sean', 'Amy', 'David', 'Sarah'];
            friends[0] = 'Billy';
            expect(friends).toEqual(['Billy', 'Amy', 'David', 'Sarah']);

            const ep4 = { title: 'A New Hope', yearReleased: 1978 };
            ep4.yearReleased = 1977;
            expect(ep4).toEqual({ title: 'A New Hope', yearReleased: 1977 })
        });
    })

    it('what is so wrong with the var keyword anyway', () => {
        const age = 22;
        //counter example, dont do this, use let binding instead
        //var variables have global scope 
        if (age >= 21) {
            var message = "Old Enough";
        } else {
            var message = "Too Young";
        }

        expect(message).toBe("Old Enough");
    });
    it('the correct way', () => {
        const age = 22;
        let message: string

        if (age >= 21) {
            message = "Old Enough";
        } else {
            message = "Too Young";
        }

        expect(message).toBe("Old Enough");
    });

    describe('literals in typescript', () => {

        describe('it has numbers', () => {

            it('some examples ', () => {
                let sample: number;
                sample = 10;
                sample = 3.14159;
                sample = 0xff;
                sample = 0o22;
                sample = 0b10101010;
                sample = 123_654_478_912
                expect(sample).toBe(123654478912);

                sample = parseFloat('133.23');
                expect(sample).toBe(133.23);

                sample = parseInt('133.23');
                expect(sample).toBe(133);
            });
        });

        describe('string literals', () => {
            it('delimiting strings', () => {
                const myName = 'Christopher';
                expect(myName).toBe('Christopher');

                const name = 'Flannery O\'Conner';
                const dialog = "He said \"How's it going?\" to a stunned audience";
            });
            it('template strings', () => {
                const s1 = `This is a string`;
                const story = `Chapter 1.
                
                It was a dark and stormy night.

                The End`;

                const name = 'Bob';
                const job = "Dev";
                const info1 = "The name is " + name + " and the job is " + job;
                const info2 = `The name is ${name} and the job is ${job}`;
                expect(info1).toBe(info2);
            });
        });

        describe('array literals', () => {
            it('has them', () => {
                const stuff = [];
                stuff[0] = 'Birds';
                expect(stuff[0]).toBe('Birds');
                expect(stuff).toEqual(['Birds']);

                stuff[1] = 3.14159
                stuff[2] = stuff;
            });
            it('declaring typed arrays', () => {
                const stuff: string[] = [];
                stuff[0] = 'Birds';
                //stuff[1] = 3.14;
                const both: Array<string | number> = [1, 2, 'string'];
            });

        });

    });

});