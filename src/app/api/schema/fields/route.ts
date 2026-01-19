import { NextResponse } from 'next/server';

// Scenario 2: Field name changes
// The API can change field names (e.g., 'phoneNumber' to 'contactNumber')
// without requiring app redeployment because the app fetches the schema from the server
export async function GET() {
  return NextResponse.json({
    // Old field names can be deprecated and new ones introduced
    schema: {
      fields: [
        {
          id: 'contactNumber',
          label: 'Contact Number',
          type: 'tel',
          required: true,
          helpText: 'Your primary contact number',
        },
        {
          id: 'emailAddress',
          label: 'Email Address',
          type: 'email',
          required: true,
          helpText: 'Where we can reach you',
        },
        {
          id: 'memberStatus',
          label: 'Membership Status',
          type: 'select',
          options: ['Active', 'Inactive', 'Suspended'],
          helpText: 'Your current membership status',
        },
        // {
        //   id: 'address',
        //   label: 'Address',
        //   type: 'text',
        //   required: true,
        //   helpText: 'Your residential address',
        // },
        // {
        //   id: 'city',
        //   label: 'City',
        //   type: 'text',
        //   required: true,
        //   helpText: 'Your residential city',
        // },
      ],
    },
    exampleData: {
      contactNumber: '+1-555-123-4567',
      emailAddress: 'member@example.com',
      memberStatus: 'Active',
    },
    timestamp: new Date().toISOString(),
  });
}
