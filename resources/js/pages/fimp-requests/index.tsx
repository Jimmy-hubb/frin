import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FimpRequestController from '@/actions/App/Http/Controllers/FimpRequestController';
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
    pengganti: { id: number; name: string };
    tanggal_awal: string;
    tanggal_akhir: string;
    total_hari: number;
    status: number;
    status_label: string;
};

type Props = {
    requests: Item[];
};

export default function FimpIndex({ requests }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [filter, setFilter] = useState<
        'semua' | 'saya' | 'untuk-saya' | 'menunggu'
    >('semua');

    const shown = requests.filter((item) => {
        if (filter === 'saya') return item.user.id === auth.user.id;
        if (filter === 'untuk-saya') return item.pengganti.id === auth.user.id;
        if (filter === 'menunggu') return item.status === 0;
        return true;
    });

    return (
        <>
            <Head title="FIMP" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="FIMP"
                        description="Izin dengan karyawan pengganti"
                    />
                    <Button asChild>
                        <Link href={FimpRequestController.create.url()}>
                            Ajukan FIMP
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(
                        [
                            ['semua', 'Semua'],
                            ['saya', 'Saya'],
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
                                Belum ada pengajuan FIMP.
                            </p>
                        )}
                        {shown.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Karyawan</th>
                                        <th className="py-2 pr-4">Pengganti</th>
                                        <th className="py-2 pr-4">Tanggal</th>
                                        <th className="py-2 pr-4">Hari</th>
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
                                                {item.pengganti.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatDate(item.tanggal_awal)}{' '}
                                                –{' '}
                                                {formatDate(item.tanggal_akhir)}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.total_hari}
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
                                                    href={FimpRequestController.show.url(
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

FimpIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'FIMP', href: FimpRequestController.index.url() },
    ],
};
