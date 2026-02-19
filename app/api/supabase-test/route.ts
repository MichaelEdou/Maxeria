import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();
        // Lightweight ping — fetch current user (null if not authed, but no network error = connected)
        const { error } = await supabase.auth.getUser();

        if (error && error.message !== 'Auth session missing!') {
            return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            connected: true,
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            message: 'Supabase connection OK ✅',
        });
    } catch (err) {
        return NextResponse.json({ connected: false, error: String(err) }, { status: 500 });
    }
}
