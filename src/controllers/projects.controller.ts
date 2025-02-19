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
      const user = request.query.user as string;
      if (!user) {
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

      const userId = new ObjectId(user);

      const newProjectDto: CreateProjectDto = new CreateProjectDto(
        title,
        status,
        startDate,
        userId,
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
