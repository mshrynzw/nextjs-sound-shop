import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const audioPath = path.resolve(`./public/audio/${id}.mp3`);

  const stat = fs.statSync(audioPath);
  const fileSize = stat.size;
  const range = request.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(audioPath, { start, end });
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize.toString(),
      'Content-Type': 'audio/mpeg',
    };

    return new NextResponse(file as any, {
      status: 206,
      headers: headers,
    });
  } else {
    const file = fs.createReadStream(audioPath);
    const headers = {
      'Content-Length': fileSize.toString(),
      'Content-Type': 'audio/mpeg',
    };

    return new NextResponse(file as any, {
      status: 200,
      headers: headers,
    });
  }
}