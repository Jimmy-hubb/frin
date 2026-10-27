import { Head, Link, router, usePage } from '@inertiajs/react';
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
    content: string;
    published_at: string | null;
    expires_at: string | null;
    is_published: boolean;
};

type Props = {
    item: Item;
};

export default function AnnouncementShow({ item }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAuthor = item.user.id === auth.user.id;

    return (
        <>
            <Head title={item.title} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={item.title}
                    description={`oleh ${item.user.name} — terbit ${formatDateTime(item.published_at)}`}
                />

                <Card>
                    <CardContent className="pt-6">
                        <div className="mb-4">
                            <Badge
                                variant={
                                    item.is_published ? 'default' : 'secondary'
                                }
                            >
                                {item.is_published ? 'Terbit' : 'Draft'}
                            </Badge>
                            {item.expires_at && (
                                <span className="ml-3 text-sm text-muted-foreground">
                                    Berakhir {formatDateTime(item.expires_at)}
                                </span>
                            )}
                        </div>

                        <p className="leading-relaxed whitespace-pre-line">
                            {item.content}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link href={AnnouncementController.index.url()}>
                                    Kembali
                                </Link>
                            </Button>
                            {isAuthor && (
                                <>
                                    <Button asChild>
                                        <Link
                                            href={AnnouncementController.edit.url(
                                                item.id,
                                            )}
                                        >
                                            Ubah
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    'Hapus pengumuman ini?',
                                                )
                                            ) {
                                                router.delete(
                                                    AnnouncementController.destroy.url(
                                                        item.id,
                                                    ),
                                                );
                                            }
                                        }}
                                    >
                                        Hapus
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AnnouncementShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pengumuman', href: AnnouncementController.index.url() },
        { title: 'Detail', href: AnnouncementController.index.url() },
    ],
};
