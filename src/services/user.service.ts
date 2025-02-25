import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto.js";
import { CONFIG } from "../config/index.js";
import { COLLECTION_NAMES } from "../constants/index.js";
import {
  Collection,
  DeleteResult,
  FindCursor,
  InsertOneResult,
  MongoClient,
  ObjectId,
  WithId,
} from "mongodb";
import { User } from "../interface/user.interface.js";

const uri = process.env.MONGO_URI;
const dbName= process.env.DB_NAME;
const collection: string = COLLECTION_NAMES.users;

export class UserService {
  private client: MongoClient;
  constructor() {
    this.client = new MongoClient(uri as string);
  }
  private async connect() {
    await this.client.connect();
    return this.client
      .db(dbName)
      .collection<User>(collection) as Collection<User>;
  }
  public async save(newUser: CreateUserDto): Promise<InsertOneResult<User>> {
    try {
      const userCollection: Collection<User> = await this.connect();
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
      const userCollection: Collection<User> = await this.connect();
      const objectId: ObjectId = new ObjectId(id);
      const response: WithId<User> | null = await userCollection.findOne({ _id: objectId });
      return response;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
  public async getAlUsers() {
    try {
      const userCollection: Collection<User> = await this.connect();
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
      const userCollection: Collection<User> = await this.connect();
      const _id: ObjectId = new ObjectId(id);
      const response: DeleteResult = await userCollection.deleteOne({ _id });
      return response.acknowledged;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
  public async upateUser(updateUserObject: UpdateUserDto) {
    try {
      const userCollection: Collection<User> = await this.connect();
      const { _id, ...updatedFields } = updateUserObject;

      const noUndefinedValuesObject: Partial<UpdateUserDto> = Object.keys(
        updatedFields
      ).reduce((prevValue, key) => {
        if (updatedFields[key as keyof UpdateUserDto] !== undefined) {
          prevValue[key as keyof UpdateUserDto] =
            updatedFields[key as keyof UpdateUserDto];
        }
        return prevValue;
      }, {} as Partial<UpdateUserDto>);
      delete (noUndefinedValuesObject as any)._id;
      const response = await userCollection.updateOne(
        { _id: _id },
        { $set: { ...noUndefinedValuesObject, updatedAt: new Date() } }
      );
      if (response.matchedCount === 0) {
        throw new Error("User does not exist");
      }

      return response;
    } catch (error) {
      throw error;
    } finally {
      this.client.close();
    }
  }
}
