import { NextResponse } from 'next/server';

// Scenario 3: New services can be added on the server
// The client will fetch the latest services list without requiring app marketplace updates
export async function GET() {
  return NextResponse.json({
    services: [
      {
        id: 'primary-care',
        name: 'Primary Care',
        description: 'Find and manage your primary care physician',
        icon: '👨‍⚕️',
        url: '/services/primary-care',
        isNew: false,
      },
      {
        id: 'prescription-management',
        name: 'Prescription Management',
        description: 'Refill prescriptions and track your medications',
        icon: '💊',
        url: '/services/prescriptions',
        isNew: false,
      },
      {
        id: 'claims-status',
        name: 'Claims Status',
        description: 'Track the status of your claims',
        icon: '📋',
        url: '/services/claims',
        isNew: false,
      },
      {
        id: 'urgent-care',
        name: 'Urgent Care Locator',
        description: 'Find nearby urgent care facilities',
        icon: '🏥',
        url: '/services/urgent-care',
        isNew: false,
      },
      {
        id: 'telehealth',
        name: 'Telehealth Visits',
        description: 'Schedule virtual doctor visits',
        icon: '💻',
        url: '/services/telehealth',
        isNew: true, // This is a newly added service
      },
      {
        id: 'wellness-programs',
        name: 'Wellness Programs',
        description: 'Access wellness and fitness programs',
        icon: '🏃',
        url: '/services/wellness',
        isNew: true, // This is a newly added service
      },
      {
        id: 'vaccine-scheduler',
        name: 'Vaccine Scheduler',
        description: 'Schedule and manage your vaccinations',
        icon: '💉',
        url: '/services/vaccine-scheduler',
        isNew: true, // This is a newly added service
      }
    ],
    totalServices: 6,
    timestamp: new Date().toISOString(),
  });
}
