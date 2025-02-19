import { ObjectId } from "mongodb";
import { TGender } from "../types/gender.type.js";

export interface User {
  _id?: ObjectId;
  firstName: string;
  lastName?: string;
  gender: TGender;
  age: number;
  email: string;
  password: string;
  isSoftDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
