import { CreateUserDto } from "../dtos/users.dto.js";
import { CONFIG } from "../config/index.js";
import { COLLECTION_NAMES } from "../constants/index.js";
import {
  DeleteResult,
  FindCursor,
  InsertOneResult,
  MongoClient,
  ObjectId,
  WithId,
} from "mongodb";
import { User } from "../interface/user.interface.js";

const uri: string = CONFIG.MONGO_URI;
const dbName: string = CONFIG.DB_NAME;
const collection: string = COLLECTION_NAMES.users;

export class UserService {
  private client: MongoClient;
  constructor() {
    this.client = new MongoClient(uri);
  }
  private async connect() {
    await this.client.connect();
    return this.client.db(dbName).collection<User>(collection);
  }
  public async save(newUser: CreateUserDto): Promise<InsertOneResult<User>> {
    try {
      const userCollection = await this.connect();
      const user: User = {
        ...newUser,
        createdAt: new Date(),
        updatedAt: new Date(),
        isSoftDelete: false,
      };
      const response: InsertOneResult<User> = await userCollection.insertOne(
        user
      );
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }

  public async getUserById(id: string) {
    try {
      const userCollection = await this.connect();
      const objectId: ObjectId = new ObjectId(id);
      const response : User = await userCollection.findOne({ _id: objectId });
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
  public async getAlUsers() {
    try {
      const userCollection = await this.connect();
      const users = await userCollection.find({}).toArray();
      return users;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
  public async deleteUser(id: string): Promise<boolean> {
    try {
      const userCollection = await this.connect();
      const _id: ObjectId = new ObjectId(id);
      const response: DeleteResult = await userCollection.deleteOne({ _id });
      return response.acknowledged;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
}
