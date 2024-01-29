import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/db";
import { _membersLinks, _tasksLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Members API
 *   version: 1.0.0
 * paths:
 *   /api/v1/projects/{projectId}/members:
 *     post:
 *       summary: Add a new member to a project
 *       tags:
 *         - members
 *       description: Adds a new member to a specified project.
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
 *               properties:
 *                 name:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Member successfully added to the project
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Unique identifier of the member
 *                         name:
 *                           type: string
 *                           description: Name of the member
 *                         projectId:
 *                           type: integer
 *                           description: Identifier of the associated project
 *                   _links:
 *                     $ref: '#/components/schemas/MembersLinks'
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
 *                     $ref: '#/components/schemas/MembersLinks'
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
 *                     $ref: '#/components/schemas/MembersLinks'
 *     get:
 *       summary: Retrieve all members of a project
 *       tags:
 *         - members
 *       description: Retrieves all members associated with a given project ID.
 *       parameters:
 *         - in: path
 *           name: projectId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the project
 *       responses:
 *         '200':
 *           description: List of members retrieved successfully
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
 *                         id:
 *                           type: integer
 *                           description: Unique identifier of the member
 *                         name:
 *                           type: string
 *                           description: Name of the member
 *                         projectId:
 *                           type: integer
 *                           description: Identifier of the associated project
 *                   _links:
 *                     $ref: '#/components/schemas/MembersLinks'
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
 *                     $ref: '#/components/schemas/MembersLinks'
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
 *                     $ref: '#/components/schemas/MembersLinks'
 * components:
 *   schemas:
 *     MembersLinks:
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

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    const { name } = await req.json();
    if (!projectId || !name) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _membersLinks },
        { status: 422 },
      );
    }

    const data = await prisma.members.create({
      data: {
        name,
        projectId: +projectId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _membersLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _membersLinks },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;
    if (!projectId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _membersLinks },
        { status: 422 },
      );
    }

    const data = await prisma.members.findMany({
      where: {
        projectId: +projectId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _membersLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _membersLinks },
      { status: 500 },
    );
  }
}
