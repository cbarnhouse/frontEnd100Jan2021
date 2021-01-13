import { Person } from "./person";

export class Employee extends Person {

    private _salary: number = 100_000;
    constructor(public firstName: string, public lastName: string, public department: string) {

        super(firstName, lastName);
    }

    get salary(): number {
        return this._salary;
    }

    giveRaise(amount: number): void {
        this._salary += amount;
    }
}