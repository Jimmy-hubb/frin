import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import OvertimeRequestController from '@/actions/App/Http/Controllers/OvertimeRequestController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatTime, statusBadgeClass } from '@/lib/company';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';

type Item = {
    id: number;
    user: { id: number; name: string };
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    status: number;
    status_label: string;
};

type Props = {
    requests: Item[];
};

export default function OvertimeIndex({ requests }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [filter, setFilter] = useState<'semua' | 'saya' | 'menunggu'>(
        'semua',
    );

    const shown = requests.filter((item) => {
        if (filter === 'saya') return item.user.id === auth.user.id;
        if (filter === 'menunggu') return item.status === 0;
        return true;
    });

    return (
        <>
            <Head title="Permintaan Lembur" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Permintaan Lembur"
                        description="Daftar permintaan lembur karyawan"
                    />
                    <Button asChild>
                        <Link href={OvertimeRequestController.create.url()}>
                            Ajukan Lembur
                        </Link>
                    </Button>
                </div>

                <div className="flex gap-2">
                    {(
                        [
                            ['semua', 'Semua'],
                            ['saya', 'Saya'],
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
                                Belum ada permintaan lembur.
                            </p>
                        )}
                        {shown.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Karyawan</th>
                                        <th className="py-2 pr-4">Tanggal</th>
                                        <th className="py-2 pr-4">Jam</th>
                                        <th className="py-2 pr-4">Status</th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shown.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2 pr-4 font-medium">
                                                {item.user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatDate(item.tanggal)}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatTime(item.jam_mulai)} –{' '}
                                                {formatTime(item.jam_selesai)}
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
                                                    href={OvertimeRequestController.show.url(
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

OvertimeIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Permintaan Lembur',
            href: OvertimeRequestController.index.url(),
        },
    ],
};
