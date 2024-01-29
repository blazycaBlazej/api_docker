import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { _tasksLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Tasks API
 *   version: 1.0.0
 * paths:
 *   /api/v1/tasks/{taskId}:
 *     get:
 *       summary: Retrieve task details
 *       tags:
 *        - tasks
 *       description: Retrieves details of a specific task based on its ID.
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the task
 *       responses:
 *         '200':
 *           description: Task details successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       expectTerm:
 *                         type: string
 *                         format: date-time
 *                       piority:
 *                         type: string
 *                       projectId:
 *                         type: integer
 *                       Comment:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             text:
 *                               type: string
 *                             taskId:
 *                               type: integer
 *                   _links:
 *                    $ref: '#/components/schemas/TasksLinks'
 *
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
 *                     $ref: '#/components/schemas/TasksLinks'
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
  { params }: { params: { taskId: string } },
) {
  try {
    const { taskId } = params;
    if (!taskId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _tasksLinks },
        { status: 422 },
      );
    }

    const data = await prisma.task.findUnique({
      where: {
        id: +taskId,
      },
      include: {
        Comment: true,
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
 *   /api/v1/tasks/{taskId}:
 *     put:
 *       summary: Update a specific task
 *       tags:
 *        - tasks
 *       description: Updates a task based on its ID with provided data.
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the task
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 piority:
 *                   type: string
 *                 expectTerm:
 *                   type: string
 *                   format: date-time
 *       responses:
 *         '200':
 *           description: Task successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       expectTerm:
 *                         type: string
 *                         format: date-time
 *                       piority:
 *                         type: string
 *                       projectId:
 *                         type: integer
 *                   _links:
 *                     $ref: '#/components/schemas/TasksLinks'
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
 *                     $ref: '#/components/schemas/TasksLinks'
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
 * components:
 *   schemas:
 *     TasksLinks:
 *       type: object
 *       properties:
 *         getAll:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         getOne:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         post:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         delete:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         update:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 */

export async function PUT(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    const { taskId } = params;
    const { name, description, piority, expectTerm } = await req.json();
    if (!taskId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _tasksLinks },
        { status: 422 },
      );
    }

    const data = await prisma.task.update({
      where: {
        id: +taskId,
      },
      data: {
        name,
        description,
        piority,
        expectTerm,
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
 *   /api/v1/tasks/{taskId}:
 *     delete:
 *       summary: Delete a specific task
 *       tags:
 *        - tasks
 *       description: Deletes a task based on its ID.
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the task
 *       responses:
 *         '200':
 *           description: Task successfully deleted
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                   _links:
 *                     $ref: '#/components/schemas/TasksLinks'
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
 *                     $ref: '#/components/schemas/TasksLinks'
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
 * components:
 *   schemas:
 *     TasksLinks:
 *       type: object
 *       properties:
 *         getAll:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         getOne:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         post:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         delete:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 *         update:
 *           type: object
 *           properties:
 *             href:
 *               type: string
 */

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    const { taskId } = params;
    if (!taskId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _tasksLinks },
        { status: 422 },
      );
    }
    console.log(taskId);

    const data = await prisma.task.delete({
      where: {
        id: +taskId,
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
