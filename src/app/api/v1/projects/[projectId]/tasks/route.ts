import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/db";
import { _tasksLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Tasks API
 *   version: 1.0.0
 * paths:
 *   /api/v1/projects/{projectId}/tasks:
 *     post:
 *       summary: Add a new task to a project
 *       tags:
 *        - tasks
 *       description: Creates a new task for a given project ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the project
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - description
 *                 - piority
 *                 - expectTerm
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the task
 *                 description:
 *                   type: string
 *                   description: Description of the task
 *                 piority:
 *                   type: string
 *                   description: Priority level of the task
 *                 expectTerm:
 *                   type: date-time
 *                   example: '2024-01-27T12:45:00Z'
 *                   description: Expected term for task completion
 *       responses:
 *         '200':
 *           description: Task successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   _links:
 *                      $ref: '#/components/schemas/TasksLinks'
 *                   data:
 *                     type: object
 *                     properties:
 *                        name:
 *                            type: string
 *                        description:
 *                            type: string
 *                        piority:
 *                            type: string
 *                        expectTerm:
 *                            type: date-time
 *                            example: '2024-01-27T12:45:00Z'
 *                        projectId:
 *                            type: number

 *         '422':
 *           description: Unprocessable Entity - Invalid Data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   _links:
 *                    $ref: '#/components/schemas/TasksLinks'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   _links:
 *                    $ref: '#/components/schemas/TasksLinks'
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    const { name, description, piority, expectTerm } = await req.json();
    if (!projectId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _tasksLinks },
        { status: 422 },
      );
    }

    const data = await prisma.task.create({
      data: {
        name,
        description,
        piority,
        expectTerm,
        projectId: +projectId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _tasksLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _tasksLinks },
      { status: 500 },
    );
  }
}

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Tasks API
 *   version: 1.0.0
 * paths:
 *   /api/v1/projects/{projectId}/tasks:
 *     get:
 *       summary: Retrieve tasks for a project
 *       tags:
 *        - tasks
 *       description: Retrieves tasks associated with a given project ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the project
 *       responses:
 *         '200':
 *           description: List of tasks successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         piority:
 *                           type: string
 *                         expectTerm:
 *                           type: string
 *                           format: date-time
 *                           example: '2024-01-27T12:45:00Z'
 *                         projectId:
 *                           type: number
 *                         _links:
 *                           $ref: '#/components/schemas/TasksLinks'
 *         '422':
 *           description: Unprocessable Entity - Invalid Data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   _links:
 *                      $ref: '#/components/schemas/TasksLinks'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   _links:
 *                     $ref: '#/components/schemas/TasksLinks'
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    if (!projectId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _tasksLinks },
        { status: 422 },
      );
    }

    const data = await prisma.project.findUnique({
      where: {
        id: +projectId,
      },
      select: {
        Task: true,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _tasksLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _tasksLinks },
      { status: 500 },
    );
  }
}
