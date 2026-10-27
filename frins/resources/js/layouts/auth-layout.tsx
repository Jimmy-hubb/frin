import { usePage } from '@inertiajs/react';
import AnimeAuthLayout from '@/layouts/auth/anime-auth-layout';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const { component } = usePage();

    // Login & register get the anime split layout; the other auth pages
    // (forgot password, reset password) keep the simple layout.
    if (component === 'auth/login' || component === 'auth/register') {
        return (
            <AnimeAuthLayout title={title} description={description}>
                {children}
            </AnimeAuthLayout>
        );
    }

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
}
