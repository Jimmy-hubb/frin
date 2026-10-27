import { Head, Link } from '@inertiajs/react';
import PayrollController from '@/actions/App/Http/Controllers/PayrollController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatRupiah, statusBadgeClass } from '@/lib/company';
import { dashboard } from '@/routes';

type Item = {
    id: number;
    user: { name: string };
    periode: string;
    gaji_pokok: number;
    tunjangan: number;
    potongan: number;
    total_gaji: number;
    status_label: string;
};

type Props = {
    items: Item[];
};

export default function PayrollIndex({ items }: Props) {
    return (
        <>
            <Head title="Penggajian" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Penggajian"
                        description="Slip gaji karyawan"
                    />
                    <Button asChild>
                        <Link href={PayrollController.create.url()}>
                            Buat Slip Gaji
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="overflow-x-auto pt-6">
                        {items.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada slip gaji.
                            </p>
                        )}
                        {items.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Karyawan</th>
                                        <th className="py-2 pr-4">Periode</th>
                                        <th className="py-2 pr-4">
                                            Gaji Pokok
                                        </th>
                                        <th className="py-2 pr-4">Tunjangan</th>
                                        <th className="py-2 pr-4">Potongan</th>
                                        <th className="py-2 pr-4">Total</th>
                                        <th className="py-2 pr-4">Status</th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2 pr-4 font-medium">
                                                {item.user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.periode}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatRupiah(item.gaji_pokok)}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatRupiah(item.tunjangan)}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatRupiah(item.potongan)}
                                            </td>
                                            <td className="py-2 pr-4 font-medium">
                                                {formatRupiah(item.total_gaji)}
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
                                                    href={PayrollController.show.url(
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

PayrollIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penggajian', href: PayrollController.index.url() },
    ],
};
