import { ObjectId } from "mongodb";
import { TGender } from "../types/gender.type.js";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    age: number;
    gender: TGender;
    email: string;
    password: string;
    constructor(
        firstName: string,
        lastName: string,
        age: number,
        gender: TGender,
        email: string,
        password: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }
}

export class GetUserDto {
    _id: string;
    constructor(_id: string) {
        this._id = _id;
    }
}

export class DeleteUserDto {
    _id: string;
    constructor(_id: string) {
        this._id = _id;
    }
}

export class UpdateUserDto {
    [key: string]: any
    _id: ObjectId;
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: TGender;
    email?: string;
    password?: string;
    constructor(
        _id: ObjectId,
        firstName?: string,
        lastName?: string,
        age?: number,
        gender?: TGender,
        email?: string,
        password?: string
    ) {
        this._id = _id
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }
}
