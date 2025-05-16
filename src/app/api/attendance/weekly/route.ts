import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';

export async function GET() {
  await connectDB();

  const today = new Date();
  const days = 7;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const present = await Attendance.countDocuments({
      date: { $gte: date, $lt: nextDate },
      status: 'present'
    });
    const absent = await Attendance.countDocuments({
      date: { $gte: date, $lt: nextDate },
      status: 'absent'
    });

    data.push({
      date: date.toISOString().slice(0, 10),
      present,
      absent,
    });
  }

  return NextResponse.json(data);
} 