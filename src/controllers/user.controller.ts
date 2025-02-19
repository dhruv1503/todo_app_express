import { CreateUserDto, GetUserDto } from "../dtos/users.dto.js";
import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { User } from "interface/user.interface.js";
import { InsertOneResult } from "mongodb";

export class UserController {
  private service;
  constructor() {
    this.service = new UserService();
  }
  async saveUser(request: Request, response: Response) {
    try {
      const { firstName, lastName, age, email, gender, password } =
        request.body;
      const createUserDto = new CreateUserDto(
        firstName,
        lastName,
        age,
        gender,
        email,
        password
      );
      const result: InsertOneResult<User> = await this.service.save(
        createUserDto
      );
      const userId = result.insertedId.toHexString();
      response
        .status(201)
        .json({ user: userId, message: "User Created Successfully!" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: error });
    }
  }
  async getUserById(request: Request, response: Response) {
    try {
      const { _id } = request.params;
      console.log("from params ", _id);
      const getUserByIdDto = new GetUserDto(_id);
      const result = await this.service.getUserById(_id);
      return response
        .status(200)
        .json({ user: result, message: "User found Successfully !" });
    } catch (error) {
      console.log(error);
      return response.sendStatus(404).json({ message: error });
    }
  }
  async getUsers(request: Request, response: Response) {
    try {
      const users = await this.service.getAlUsers();
      response
        .status(200)
        .json({
          users,
          total: users.length,
          message: "All Users found Successfully !",
        });
    } catch (error) {
      return response.sendStatus(400).json({ message: "Some error occured" });
    }
  }
}
