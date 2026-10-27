import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import HandoverController from '@/actions/App/Http/Controllers/HandoverController';
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
    penerima: { id: number; name: string };
    jabatan: string;
    tanggal_serah_terima: string;
    alasan: string;
    daftar_serah_terima: string;
    status: number;
    status_label: string;
    reject_statement: string | null;
};

type Props = {
    item: Item;
};

const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function HandoverShow({ item }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isOwner = item.user.id === auth.user.id;
    const isPenerima = item.penerima.id === auth.user.id;
    const isPending = item.status === 0;

    const rows: Array<[string, string]> = [
        ['Kode', `#STJ-${String(item.id).padStart(5, '0')}`],
        ['Pemberi', item.user.name],
        ['Penerima', item.penerima.name],
        ['Jabatan', item.jabatan],
        ['Tanggal Serah Terima', formatDate(item.tanggal_serah_terima)],
        ['Alasan', item.alasan],
        ['Daftar Serah Terima', item.daftar_serah_terima],
        ['Status', item.status_label],
    ];

    return (
        <>
            <Head title="Detail Penyerahan Jabatan" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Detail Penyerahan Jabatan"
                    description={`${item.user.name} → ${item.penerima.name} — ${item.jabatan}`}
                />

                <Card>
                    <CardContent className="pt-6">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            {rows.map(([label, value]) => (
                                <div key={label}>
                                    <dt className="text-sm font-medium text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="mt-1 font-medium whitespace-pre-line">
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
                                <Link href={HandoverController.index.url()}>
                                    Kembali
                                </Link>
                            </Button>

                            {isOwner && isPending && (
                                <>
                                    <Button asChild>
                                        <Link
                                            href={HandoverController.edit.url(
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
                                                    'Hapus penyerahan jabatan ini?',
                                                )
                                            ) {
                                                router.delete(
                                                    HandoverController.destroy.url(
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

                            {isPenerima && isPending && (
                                <Button
                                    onClick={() =>
                                        router.post(
                                            HandoverController.terima.url(
                                                item.id,
                                            ),
                                        )
                                    }
                                >
                                    Saya Terima
                                </Button>
                            )}
                        </div>

                        {isPenerima && isPending && (
                            <Form
                                {...HandoverController.tolak.form(item.id)}
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
                                            Tolak Penyerahan
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

HandoverShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penyerahan Jabatan', href: HandoverController.index.url() },
        { title: 'Detail', href: HandoverController.index.url() },
    ],
};
