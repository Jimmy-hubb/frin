import { Head, Link, router, usePage } from '@inertiajs/react';
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
    status: number;
    status_label: string;
};

type Props = {
    item: Item;
};

export default function PayrollShow({ item }: Props) {
    const rows: Array<[string, string]> = [
        ['Karyawan', item.user.name],
        ['Periode', item.periode],
        ['Gaji Pokok', formatRupiah(item.gaji_pokok)],
        ['Tunjangan', formatRupiah(item.tunjangan)],
        ['Potongan', formatRupiah(item.potongan)],
        ['Total Gaji', formatRupiah(item.total_gaji)],
        ['Status', item.status_label],
    ];

    return (
        <>
            <Head title="Detail Slip Gaji" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Detail Slip Gaji"
                    description={`${item.user.name} — periode ${item.periode}`}
                />

                <Card>
                    <CardContent className="pt-6">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            {rows.map(([label, value]) => (
                                <div key={label}>
                                    <dt className="text-sm font-medium text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {label === 'Status' ? (
                                            <Badge
                                                className={statusBadgeClass(
                                                    value,
                                                )}
                                            >
                                                {value}
                                            </Badge>
                                        ) : (
                                            value
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link href={PayrollController.index.url()}>
                                    Kembali
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={PayrollController.edit.url(item.id)}
                                >
                                    Ubah
                                </Link>
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    if (
                                        window.confirm('Hapus slip gaji ini?')
                                    ) {
                                        router.delete(
                                            PayrollController.destroy.url(
                                                item.id,
                                            ),
                                        );
                                    }
                                }}
                            >
                                Hapus
                            </Button>
                            {item.status === 0 && (
                                <Button
                                    onClick={() =>
                                        router.post(
                                            PayrollController.publish.url(
                                                item.id,
                                            ),
                                        )
                                    }
                                >
                                    Terbitkan
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PayrollShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penggajian', href: PayrollController.index.url() },
        { title: 'Detail', href: PayrollController.index.url() },
    ],
};
