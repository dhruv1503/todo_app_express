import { CreateUserDto, DeleteUserDto, GetUserDto } from "../dtos/users.dto.js";
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
      const getUserByIdDto = new GetUserDto(_id);
      const result : User | null = await this.service.getUserById(getUserByIdDto._id);
      if(result){
        return response
        .status(200)
        .json({ user: result, message: "User found Successfully !" });
      }
      throw new Error("User does not exist")
    } catch (error) {
      return response.status(404).json({ message: error.message || "Some error occured" });
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
      return response.status(400).json({ message: "Some error occured" });
    }
  }
  async deleteUsers(request: Request, response : Response){
    try{
      const {_id} = request.params;
      const deleteUserDto : DeleteUserDto = new DeleteUserDto(_id);
      const userDeleted : boolean = await this.service.deleteUser(deleteUserDto._id);
      if(userDeleted) {
        return response.status(200).json({message : "User deleted successfully"})
      }
      throw new Error("Unable to delete User")
    }
    catch(error){
      return response.status(400).json({ message: "Some error occured" });
    }
  }
}
