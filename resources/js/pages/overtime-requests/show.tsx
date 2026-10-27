import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import OvertimeRequestController from '@/actions/App/Http/Controllers/OvertimeRequestController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { formatDate, formatTime, statusBadgeClass } from '@/lib/company';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';

type Item = {
    id: number;
    user: { id: number; name: string };
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    keperluan: string;
    status: number;
    status_label: string;
    catatan_approval: string | null;
};

type Props = {
    item: Item;
};

const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function OvertimeShow({ item }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isOwner = item.user.id === auth.user.id;
    const isPending = item.status === 0;

    const rows: Array<[string, string]> = [
        ['Karyawan', item.user.name],
        ['Tanggal', formatDate(item.tanggal)],
        [
            'Jam',
            `${formatTime(item.jam_mulai)} – ${formatTime(item.jam_selesai)}`,
        ],
        ['Keperluan', item.keperluan],
        ['Status', item.status_label],
    ];

    return (
        <>
            <Head title="Detail Permintaan Lembur" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Detail Permintaan Lembur"
                    description={`${item.user.name} — ${formatDate(item.tanggal)}`}
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

                        {item.catatan_approval && (
                            <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/40">
                                <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                    Catatan penolakan
                                </p>
                                <p className="mt-1 text-sm">
                                    {item.catatan_approval}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link
                                    href={OvertimeRequestController.index.url()}
                                >
                                    Kembali
                                </Link>
                            </Button>

                            {isOwner && isPending && (
                                <>
                                    <Button asChild>
                                        <Link
                                            href={OvertimeRequestController.edit.url(
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
                                                    'Hapus permintaan lembur ini?',
                                                )
                                            ) {
                                                router.delete(
                                                    OvertimeRequestController.destroy.url(
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

                            {!isOwner && isPending && (
                                <Button
                                    onClick={() =>
                                        router.post(
                                            OvertimeRequestController.approve.url(
                                                item.id,
                                            ),
                                        )
                                    }
                                >
                                    Setujui
                                </Button>
                            )}
                        </div>

                        {!isOwner && isPending && (
                            <Form
                                {...OvertimeRequestController.reject.form(
                                    item.id,
                                )}
                                className="mt-6 space-y-3 border-t pt-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="catatan_approval">
                                                Tolak dengan catatan
                                            </Label>
                                            <textarea
                                                id="catatan_approval"
                                                name="catatan_approval"
                                                required
                                                rows={3}
                                                className={textareaClassName}
                                            />
                                            <InputError
                                                message={
                                                    errors.catatan_approval
                                                }
                                            />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            disabled={processing}
                                        >
                                            Tolak Permintaan
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

OvertimeShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Permintaan Lembur',
            href: OvertimeRequestController.index.url(),
        },
        { title: 'Detail', href: OvertimeRequestController.index.url() },
    ],
};
