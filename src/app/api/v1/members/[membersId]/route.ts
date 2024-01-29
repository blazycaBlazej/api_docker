import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { _membersLinks } from "@/app/api/v1/lib/links";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Members API
 *   version: 1.0.0
 * paths:
 *   /api/v1/members/{membersId}:
 *     delete:
 *       summary: Deletes a member
 *       tags:
 *         - members
 *       description: Deletes a member by its ID and provides HATEOAS links.
 *       parameters:
 *         - in: path
 *           name: membersId
 *           required: true
 *           schema:
 *             type: string
 *           description: Unique ID of the member
 *       responses:
 *         '200':
 *           description: Member successfully deleted
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
 *                       projectId:
 *                         type: integer
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { membersId: string } },
) {
  try {
    const { membersId } = params;
    if (!membersId) {
      return NextResponse.json(
        { message: "Nieprawdiłowe dane", _links: _membersLinks },
        { status: 422 },
      );
    }

    const data = await prisma.members.delete({
      where: {
        id: +membersId,
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
