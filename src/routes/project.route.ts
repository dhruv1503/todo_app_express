import { Router } from "express";
import { ProjectsController } from "../controllers/projects.controller.js";

class ProjectRouter{
    private controller : ProjectsController
    public router : Router
    constructor(){
        this.controller = new ProjectsController()
        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post("/", this.controller.createProject.bind(this.controller))
    }
}

export default new ProjectRouter().router