import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  // Convert studentId to ObjectId
  const studentObjectId = new mongoose.Types.ObjectId(studentId);

  // Aggregate attendance by class (subject)
  const summary = await Attendance.aggregate([
    { $match: { student: studentObjectId } },
    {
      $group: {
        _id: '$class',
        present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
        absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } }
      }
    },
    {
      $lookup: {
        from: 'classes',
        localField: '_id',
        foreignField: '_id',
        as: 'classInfo'
      }
    },
    { $unwind: '$classInfo' },
    {
      $project: {
        _id: 0,
        subject: '$classInfo.name',
        present: 1,
        total: { $add: ['$present', '$absent'] }
      }
    }
  ]);

  return NextResponse.json(summary);
}
