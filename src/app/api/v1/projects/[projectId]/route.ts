import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { _projectsLinks } from "@/app/api/v1/lib/links";

/**
 *@swagger
 * openapi: 3.0.0
 * info:
 *   title: Projects API
 *   version: 1.0.0
 * paths:
 *   # Existing paths...
 *
 *  /api/v1/projects/{projectId}:
 *     get:
 *       summary: Retrieve a single project
 *       tags:
 *        - projects
 *       description: Retrieves details of a specific project based on its ID.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the project
 *       responses:
 *         '200':
 *           description: Project details successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                      allOf:
 *                        - $ref: '#/components/schemas/Project'
 *                        - type: object
 *                          properties:
 *                            Task:
 *                              type: array
 *                              items:
 *                                type: object
 *                                properties:
 *                                  # Define Task object properties here
 *                   _links:
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
 *
 *     put:
 *       summary: Update a project
 *       tags:
 *        - projects
 *       description: Updates the details of a specific project based on its ID.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the project
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
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *       responses:
 *         '200':
 *           description: Project successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Project'
 *                   _links:
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
 *
 *     delete:
 *       summary: Delete a project
 *       tags:
 *          - projects
 *       description: Deletes a specific project based on its ID.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: integer
 *           description: Unique ID of the project
 *       responses:
 *         '200':
 *           description: Project successfully deleted
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Project'
 *                   _links:
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
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
 *                     $ref: '#/components/schemas/ProjectsLinks'
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    if (!projectId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _projectsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.project.findUnique({
      where: {
        id: +projectId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _projectsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _projectsLinks },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { name, description, startDate, endDate } = await req.json();
    const { projectId } = params;
    if (!projectId || !name || !description || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _projectsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.project.update({
      where: {
        id: +projectId,
      },
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _projectsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _projectsLinks },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    if (!projectId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _projectsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.project.delete({
      where: {
        id: +projectId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _projectsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _projectsLinks },
      { status: 500 },
    );
  }
}
