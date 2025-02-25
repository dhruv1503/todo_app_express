import { ObjectId } from "mongodb";
import { TProjectStatus } from "../types/projectStatus.type.js";

export interface Project {
    _id : ObjectId,
    title : string,
    description?: string,
    status : TProjectStatus,
    startDate: Date,
    endDate: Date,
    tasks : string[],
    createdAt : Date,
    updatedAt : Date,
    isSoftDelete : boolean

}