import { NextRequest, NextResponse } from "next/server";
import { seed } from "../../../../../seed/seed";

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Database Seeding API
 *   version: 1.0.0
 * paths:
 *   /api/v1/seed:
 *     get:
 *       summary: Seed the Database
 *       tags:
 *        - SEED
 *       description: Executes the seeding process for the database.
 *       responses:
 *         '200':
 *           description: Database successfully seeded
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */

export async function GET(req: NextRequest) {
  try {
    await seed();
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
