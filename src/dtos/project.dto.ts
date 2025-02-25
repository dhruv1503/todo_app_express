import { ObjectId } from "mongodb";
import { TProjectStatus } from "../types/projectStatus.type.ts";

export class CreateProjectDto {
  title: string;
  description?: string;
  status: TProjectStatus;
  startDate: Date;
  endDate?: Date;
  tasks: string[];
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isSoftDelete: boolean;
  constructor(
    title: string,
    status: TProjectStatus,
    startDate: Date,
    userId: ObjectId,
    endDate?: Date,
    tasks?: string[],
    description?: string
  ) {
    this.title = title;
    this.description = description ?? "";
    this.status = status;
    this.startDate = startDate;
    if (endDate) {
      this.endDate = this.endDate;
    }
    this.tasks = tasks ? tasks : [];
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isSoftDelete = false;
  }
}
