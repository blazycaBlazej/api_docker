import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { _commentsLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Comments API
 *   version: 1.0.0
 * paths:
 *   /api/v1/comments/{commentId}:
 *     delete:
 *       summary: Deletes a comment
 *       tags:
 *         - comments
 *       description: Deletes a comment by its ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: commentId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the comment
 *       responses:
 *         '200':
 *           description: Comment successfully deleted
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
 *                           type: number
 *                         text:
 *                           type: string
 *                         taskId:
 *                           type: number
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
 *                     $ref: '#/components/schemas/CommentsLinks'
 * components:
 *   schemas:
 *     CommentsLinks:
 *       type: object
 *       properties:
 *         get:
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
 */

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } },
) {
  try {
    const { commentId } = params;
    if (!commentId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _commentsLinks },
        { status: 422 },
      );
    }

    const data = await prisma.comment.delete({
      where: {
        id: +commentId,
      },
    });

    return NextResponse.json(
      { message: "ok", data: data, _links: _commentsLinks },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error", _links: _commentsLinks },
      { status: 500 },
    );
  }
}
