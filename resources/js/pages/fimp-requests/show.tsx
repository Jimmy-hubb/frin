import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import FimpRequestController from '@/actions/App/Http/Controllers/FimpRequestController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    keperluan: string;
    pengganti_mengetahui: boolean;
    pengganti_bersedia: boolean;
    status: number;
    status_label: string;
    reject_statement: string | null;
};

type Props = {
    item: Item;
};

const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function FimpShow({ item }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isOwner = item.user.id === auth.user.id;
    const isPengganti = item.pengganti.id === auth.user.id;
    const isPending = item.status === 0;

    const rows: Array<[string, string]> = [
        ['Karyawan', item.user.name],
        ['Karyawan Pengganti', item.pengganti.name],
        ['Tanggal Awal', formatDate(item.tanggal_awal)],
        ['Tanggal Akhir', formatDate(item.tanggal_akhir)],
        ['Total Hari', String(item.total_hari)],
        ['Keperluan', item.keperluan],
        ['Pengganti Mengetahui', item.pengganti_mengetahui ? 'Ya' : 'Belum'],
        ['Pengganti Bersedia', item.pengganti_bersedia ? 'Ya' : 'Belum'],
        ['Status', item.status_label],
    ];

    return (
        <>
            <Head title="Detail FIMP" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Detail FIMP"
                    description={`${item.user.name} — pengganti ${item.pengganti.name}`}
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

                        {item.reject_statement && (
                            <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/40">
                                <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                    Alasan penolakan
                                </p>
                                <p className="mt-1 text-sm">
                                    {item.reject_statement}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link href={FimpRequestController.index.url()}>
                                    Kembali
                                </Link>
                            </Button>

                            {isOwner && isPending && (
                                <>
                                    <Button asChild>
                                        <Link
                                            href={FimpRequestController.edit.url(
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
                                                    'Hapus pengajuan FIMP ini?',
                                                )
                                            ) {
                                                router.delete(
                                                    FimpRequestController.destroy.url(
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

                            {isPengganti && isPending && (
                                <Button
                                    onClick={() =>
                                        router.post(
                                            FimpRequestController.confirm.url(
                                                item.id,
                                            ),
                                        )
                                    }
                                >
                                    Konfirmasi (Mengetahui & Bersedia)
                                </Button>
                            )}
                        </div>

                        {isPengganti && isPending && (
                            <Form
                                {...FimpRequestController.reject.form(item.id)}
                                className="mt-6 space-y-3 border-t pt-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="reject_statement">
                                                Tolak dengan alasan
                                            </Label>
                                            <textarea
                                                id="reject_statement"
                                                name="reject_statement"
                                                required
                                                rows={3}
                                                className={textareaClassName}
                                            />
                                            <InputError
                                                message={
                                                    errors.reject_statement
                                                }
                                            />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            disabled={processing}
                                        >
                                            Tolak FIMP
                                        </Button>
                                    </>
                                )}
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

FimpShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'FIMP', href: FimpRequestController.index.url() },
        { title: 'Detail', href: FimpRequestController.index.url() },
    ],
};
