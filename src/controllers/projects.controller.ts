import { CreateProjectDto } from "../dtos/project.dto.js";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ProjectService } from "../services/projects.service.js";

export class ProjectsController {
  private service: ProjectService;
  constructor() {
    this.service = new ProjectService();
  }
  async createProject(request: Request, response: Response) {
    try {
      if (!request.body || Object.keys(request.body).length <= 0) {
        return response
          .status(400)
          .json({ message: "Body is required to create a Project" });
      }
      console.log(request.query)
      const userId = request.query.userId as string;
      if (!userId) {
        return response
          .status(400)
          .json({ message: "User is required to create a Project" });
      }
      const {
        title,
        status,
        startDate,
        endDate,
        tasks = [],
        description,
      } = request.body;

      const userIdObject = new ObjectId(userId);

      const newProjectDto: CreateProjectDto = new CreateProjectDto(
        title,
        status,
        startDate,
        userIdObject,
        endDate,
        tasks,
        description
      );
      const result = await this.service.save(newProjectDto);
      if (result.acknowledged)
        return response.status(201).json({
          project: result.insertedId,
          message: "Project created Successfully!",
        });
      return response.status(400).json({
        message: "New Project could not be created. Please try again!",
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message ?? "Some error occured, Please try again later!",
      });
    }
  }
}
