import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Absence from '@/models/Absence'; // You need to create this model if not present

export async function GET() {
  try {
    await connectDB();
    const absences = await Absence.find()
      .populate('student', 'name')
      .sort({ date: -1 })
      .lean();

    // Transform the data to include studentName while preserving student ID
    const transformedAbsences = absences.map(absence => ({
      ...absence,
      studentName: absence.student.name,
      student: absence.student._id // Keep the student ID
    }));

    return NextResponse.json(transformedAbsences);
  } catch (error) {
    console.error('Error fetching absences:', error);
    return NextResponse.json({ error: 'Failed to fetch absences' }, { status: 500 });
  }
}
