import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { writeBoard } from '@/service/board';
/**글쓰기 페이지 post api */

// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const POST = async (request: NextRequest) => {
  const form = await request.formData();
  const data = await writeBoard(form).then((data) => data.message);
  return NextResponse.json(data);
};

export const GET = async (req: NextRequest) => {
  const cookiesStorage = cookies();
  const token = cookiesStorage.get('refreshToken');
  console.log('리프레시 조회하기', token);
  const params = req.nextUrl.searchParams;
  const query = params.get('code');
  return NextResponse.json(query);
};
