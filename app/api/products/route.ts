// app/api/products/route.ts
import { NextResponse } from 'next/server';
import axiosInstance from '../../../lib/axiosInstance';

export async function GET() {
  try {
    const response = await axiosInstance.get('/products');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error); // Log error for debugging
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
