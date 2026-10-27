import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import HandoverController from '@/actions/App/Http/Controllers/HandoverController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, statusBadgeClass } from '@/lib/company';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';

type Item = {
    id: number;
    user: { id: number; name: string };
    penerima: { id: number; name: string };
    jabatan: string;
    tanggal_serah_terima: string;
    status: number;
    status_label: string;
};

type Props = {
    items: Item[];
};

export default function HandoverIndex({ items }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [filter, setFilter] = useState<
        'semua' | 'saya' | 'untuk-saya' | 'menunggu'
    >('semua');

    const shown = items.filter((item) => {
        if (filter === 'saya') return item.user.id === auth.user.id;
        if (filter === 'untuk-saya') return item.penerima.id === auth.user.id;
        if (filter === 'menunggu') return item.status === 0;
        return true;
    });

    return (
        <>
            <Head title="Penyerahan Jabatan" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Penyerahan Jabatan"
                        description="Serah terima jabatan antar karyawan"
                    />
                    <Button asChild>
                        <Link href={HandoverController.create.url()}>
                            Buat Penyerahan
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(
                        [
                            ['semua', 'Semua'],
                            ['saya', 'Saya Serahkan'],
                            ['untuk-saya', 'Untuk Saya'],
                            ['menunggu', 'Menunggu'],
                        ] as const
                    ).map(([key, label]) => (
                        <Button
                            key={key}
                            variant={filter === key ? 'default' : 'outline'}
                            onClick={() => setFilter(key)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>

                <Card>
                    <CardContent className="overflow-x-auto pt-6">
                        {shown.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada penyerahan jabatan.
                            </p>
                        )}
                        {shown.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Kode</th>
                                        <th className="py-2 pr-4">Pemberi</th>
                                        <th className="py-2 pr-4">Penerima</th>
                                        <th className="py-2 pr-4">Jabatan</th>
                                        <th className="py-2 pr-4">Tanggal</th>
                                        <th className="py-2 pr-4">Status</th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shown.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2 pr-4 font-medium">
                                                #STJ-
                                                {String(item.id).padStart(
                                                    5,
                                                    '0',
                                                )}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.penerima.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.jabatan}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatDate(
                                                    item.tanggal_serah_terima,
                                                )}
                                            </td>
                                            <td className="py-2 pr-4">
                                                <Badge
                                                    className={statusBadgeClass(
                                                        item.status_label,
                                                    )}
                                                >
                                                    {item.status_label}
                                                </Badge>
                                            </td>
                                            <td className="py-2">
                                                <Link
                                                    href={HandoverController.show.url(
                                                        item.id,
                                                    )}
                                                    className="text-primary hover:underline"
                                                >
                                                    Lihat
                                                </Link>
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

HandoverIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penyerahan Jabatan', href: HandoverController.index.url() },
    ],
};
