import { CreateUserDto } from "../dtos/users.dto.js";
import { CONFIG } from "../config/index.js";
import { COLLECTION_NAMES } from "../constants/index.js";
import {
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
    const userCollection = await this.connect();
    const objectId : ObjectId = new ObjectId(id)
    console.log(id)
    console.log(objectId)
    const response = await userCollection.findOne({_id : objectId });
    console.log(response);
    return response;
  }
}
