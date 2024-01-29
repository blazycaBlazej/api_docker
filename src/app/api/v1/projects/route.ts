import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { _projectsLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Projects API
 *   version: 1.0.0
 * paths:
 *   /api/v1/projects:
 *     get:
 *       summary: Retrieve all projects
 *       tags:
 *         - projects
 *       description: Retrieves a list of all projects.
 *       responses:
 *         '200':
 *           description: A list of projects
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
 *                       $ref: '#/components/schemas/Project'
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
 *     post:
 *       summary: Add a new project
 *       tags:
 *         - projects
 *       description: Creates a new project.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - description
 *                 - startDate
 *                 - endDate
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
 *           description: Project successfully created
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
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *     ProjectsLinks:
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
export async function GET(req: NextRequest) {
  try {
    const data = await prisma.project.findMany({});
    return NextResponse.json(
      { message: "Dane pobrano pomyslnie", data: data, _links: _projectsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Błąd serwera. Spróbuj dodać pyanie później.",
        _links: _projectsLinks,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, startDate, endDate } = await req.json();
    if (!name || !description || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _projectsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(
      { message: "projekt został dodany.", data: data, _links: _projectsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Błąd serwera. Spróbuj dodać pyanie później.",
        _links: _projectsLinks,
      },
      { status: 500 },
    );
  }
}
