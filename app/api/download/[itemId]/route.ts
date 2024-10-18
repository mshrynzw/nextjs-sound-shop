import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = params
  console.log("itemId", itemId)
  const filePath = path.join(process.cwd(), 'private', `${itemId}.zip`)

  if (fs.existsSync(filePath)) {
    const fileBuffer = await fs.promises.readFile(filePath)
    const response = new NextResponse(fileBuffer)
    response.headers.set('Content-Type', 'application/zip')
    response.headers.set('Content-Disposition', `attachment; filename=order_${itemId}.zip`)
    return response
  } else {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 })
  }
}