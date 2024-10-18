import {NextRequest, NextResponse} from "next/server"
import fs from "fs"
import path from "path"
import {supabase} from "@/lib/supabaseClient"

export async function POST(
  request: NextRequest,
  {params}: { params: { id: string } }
) {
  const {id} = params
  const body = await request.json()
  const {password, email} = body

  const {data: orderItem, error} = await supabase
  .from("orders")
  .select(`
    id,
    item_id,
    updated_at,
    email,
    password
    `)
    .eq("id", id)
    .single()
    
  if (error || !orderItem) {
    return NextResponse.json({error: "Order item not found."}, {status: 404})
  }

  if (orderItem.email !== email) {
    return NextResponse.json({error: "Invalid email."}, {status: 401})
  }

  if (orderItem.password !== password) {
    return NextResponse.json({error: "Invalid password."}, {status: 401})
  }

  const expirationDate = new Date(orderItem.updated_at)
  expirationDate.setDate(expirationDate.getDate() + Number(process.env.NEXT_PUBLIC_DEADLINE_DAYS))
  if (new Date() > expirationDate) {
    return NextResponse.json({error: "The download has expired."}, {status: 403})
  }

  const filePath = path.join(process.cwd(), "private", `${orderItem.item_id}.zip`)

  if (fs.existsSync(filePath)) {
    const fileBuffer = await fs.promises.readFile(filePath)
    const response = new NextResponse(fileBuffer)
    response.headers.set("Content-Type", "application/zip")
    response.headers.set("Content-Disposition", `attachment; filename=order_${id}.zip`)
    return response
  } else {
    return NextResponse.json({error: "File not found."}, {status: 404})
  }
}