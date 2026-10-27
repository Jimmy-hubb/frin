import { Head, Link, usePage } from '@inertiajs/react';
import AnnouncementController from '@/actions/App/Http/Controllers/AnnouncementController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime } from '@/lib/company';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';

type Item = {
    id: number;
    user: { id: number; name: string };
    title: string;
    published_at: string | null;
    expires_at: string | null;
    is_published: boolean;
};

type Props = {
    items: Item[];
};

export default function AnnouncementIndex({ items }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <>
            <Head title="Pengumuman" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Pengumuman"
                        description="Pengumuman perusahaan"
                    />
                    <Button asChild>
                        <Link href={AnnouncementController.create.url()}>
                            Buat Pengumuman
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="overflow-x-auto pt-6">
                        {items.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada pengumuman.
                            </p>
                        )}
                        {items.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Judul</th>
                                        <th className="py-2 pr-4">Penulis</th>
                                        <th className="py-2 pr-4">Terbit</th>
                                        <th className="py-2 pr-4">Berakhir</th>
                                        <th className="py-2 pr-4">Status</th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2 pr-4 font-medium">
                                                {item.title}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatDateTime(
                                                    item.published_at,
                                                )}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatDateTime(
                                                    item.expires_at,
                                                )}
                                            </td>
                                            <td className="py-2 pr-4">
                                                <Badge
                                                    variant={
                                                        item.is_published
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {item.is_published
                                                        ? 'Terbit'
                                                        : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td className="py-2">
                                                <Link
                                                    href={AnnouncementController.show.url(
                                                        item.id,
                                                    )}
                                                    className="text-primary hover:underline"
                                                >
                                                    Lihat
                                                </Link>
                                                {item.user.id ===
                                                    auth.user.id && (
                                                    <>
                                                        {' · '}
                                                        <Link
                                                            href={AnnouncementController.edit.url(
                                                                item.id,
                                                            )}
                                                            className="text-primary hover:underline"
                                                        >
                                                            Ubah
                                                        </Link>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AnnouncementIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pengumuman', href: AnnouncementController.index.url() },
    ],
};
