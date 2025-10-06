import { NextResponse } from 'next/server';

// Define the POST handler function
export async function POST(request: Request) {
    // 1. Parse the JSON body from the incoming request
    const { email, password } = await request.json();

    // Basic input validation
    if (!email || !password) {
        // Return a 400 Bad Request response
        return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // 🔒 MOCK AUTHENTICATION LOGIC (Replace this section with your actual database/auth logic)
    const MOCK_EMAIL = 'user@example.com';
    const MOCK_PASSWORD = 'password123';

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        // 2. Success: Authentication passed

        // In a real application, you would set a cookie or return a JWT here.

        // Return a 200 OK status with a success message and mock user data
        return NextResponse.json({
            message: 'Authentication successful',
            user: { id: 101, email: email },
        }, { status: 200 });

    } else {
        // 3. Failure: Invalid credentials
        // Return a 401 Unauthorized status
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
}

// Optional: Define a handler for other methods (like GET) to prevent errors
export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
