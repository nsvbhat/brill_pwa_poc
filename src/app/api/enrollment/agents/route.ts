import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    agents: [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Licensed Health Insurance Agent',
        phone: '1-800-AMBETTER',
        availability: 'Available now',
        languages: ['English', 'Spanish'],
        badge: '⭐ Top rated',
      },
      {
        id: 2,
        name: 'Michael Chen',
        title: 'Senior Enrollment Specialist',
        phone: '1-800-AMBETTER',
        availability: 'Available in 5 min',
        languages: ['English', 'Mandarin', 'Cantonese'],
        badge: '5+ years',
      },
      {
        id: 3,
        name: 'Patricia Rodriguez',
        title: 'Medicare Specialist',
        phone: '1-800-AMBETTER',
        availability: 'Available in 15 min',
        languages: ['English', 'Spanish'],
        badge: '✅ Certified',
      },
    ],
    enrollmentQuestions: [
      {
        id: 'q1',
        question: 'Are you new to Ambetter Health?',
        type: 'radio',
        options: ['Yes', 'No, renewing coverage'],
      },
      {
        id: 'q2',
        question: 'What is your primary reason for enrolling?',
        type: 'radio',
        options: [
          'Individual coverage',
          'Family coverage',
          'Medicare',
          'Medicaid',
        ],
      },
      {
        id: 'q3',
        question: 'Which services are most important to you?',
        type: 'checkbox',
        options: [
          'Preventive care',
          'Prescription coverage',
          'Dental coverage',
          'Vision coverage',
          'Mental health services',
        ],
      },
    ],
    lastUpdated: new Date().toISOString(),
  });
}
