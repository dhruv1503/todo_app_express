import { Project } from "../interface/project.interface.ts";
import { CONFIG } from "../config/index.js";
import { COLLECTION_NAMES } from "../constants/index.js";
import { CreateProjectDto } from "../dtos/project.dto.js";
import { InsertOneResult, MongoClient } from "mongodb";


const uri = CONFIG.MONGO_URI;
const dbName = CONFIG.DB_NAME;
const collectionName = COLLECTION_NAMES.projects

export class ProjectService{
private client : MongoClient
constructor(){
    this.client = new MongoClient(uri)
}
private async connect(){
    await this.client.connect()
    return this.client.db(dbName).collection(collectionName)
}
public async save(newProjectDto : CreateProjectDto) : Promise<InsertOneResult<Project>>{
    try{
        const projectsCollection = await this.connect();
        const result : InsertOneResult<Project> = await projectsCollection.insertOne(newProjectDto);
        return result
        
       
    }
    catch(error){
        throw error
    }
    finally{
        this.client.close()
    }
}
}


