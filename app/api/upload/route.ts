import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadPath = formData.get('path') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory path
    const dirPath = path.join(process.cwd(), 'public', 'uploads', uploadPath);
    await mkdir(dirPath, { recursive: true });

    // Save file
    const filePath = path.join(dirPath, file.name);
    await writeFile(filePath, buffer);

    // Return local URL
    const url = `/uploads/${uploadPath}/${file.name}`;

    return NextResponse.json({
      success: true,
      url,
      name: file.name,
      size: file.size
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
