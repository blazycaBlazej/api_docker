import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/db";
import { _commentsLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Comments API
 *   version: 1.0.0
 * paths:
 *   /api/v1/tasks/{taskId}/comments:
 *     get:
 *       summary: Retrieve comments for a task
 *       tags:
 *         - comments
 *       description: Retrieves a list of comments associated with a given task ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the task
 *       responses:
 *         '200':
 *           description: List of comments successfully retrieved
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
 *                        id:
 *                          type: number
 *                        text:
 *                          type: string
 *                        taskId:
 *                          type: number
 *                   _links:
 *                      $ref: '#/components/schemas/CommentsLinks'
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
 *                     $ref: '#/components/schemas/CommentsLinks'
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
 *                     $ref: '#/components/schemas/CommentsLinks'
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    const { taskId } = params;
    if (!taskId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _commentsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.comment.findMany({
      where: {
        id: +taskId,
      },
    });
    console.log(data);
    return NextResponse.json(
      { message: "ok", data: data, _links: _commentsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Comments API
 *   version: 1.0.0
 * paths:
 *   /api/v1/tasks/{taskId}/comments:
 *     post:
 *       summary: Add a new comment to a task
 *       tags:
 *         - comments
 *       description: Creates a new comment for a given task ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: taskId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the task
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - text
 *               properties:
 *                 text:
 *                   type: string
 *                   description: Text content of the comment
 *       responses:
 *         '200':
 *           description: Comment successfully created
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
 *                        id:
 *                          type: number
 *                        text:
 *                          type: string
 *                        taskId:
 *                          type: number
 *                   _links:
 *                     $ref: '#/components/schemas/CommentsLinks'
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
 *                     $ref: '#/components/schemas/CommentsLinks'
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
 *                      $ref: '#/components/schemas/CommentsLinks'
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    const { taskId } = params;
    const { text } = await req.json();
    if (!taskId || !text) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _commentsLinks },
        { status: 422 },
      );
    }
    const task = await prisma.task.findUnique({
      where: { id: +taskId },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "Nieprawdiłowe dane. Task o tym ID nie istnieje",
          _links: _commentsLinks,
        },
        { status: 422 },
      );
    }

    const data = await prisma.comment.create({
      data: {
        taskId: +taskId,
        text,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _commentsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
