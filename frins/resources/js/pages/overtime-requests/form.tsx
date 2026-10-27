import { Form, Head, Link } from '@inertiajs/react';
import OvertimeRequestController from '@/actions/App/Http/Controllers/OvertimeRequestController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dateInputValue, formatTime } from '@/lib/company';
import { dashboard } from '@/routes';

type Item = {
    id: number;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    keperluan: string;
};

type Props = {
    item: Item | null;
};

const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function OvertimeForm({ item }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head title={isEdit ? 'Ubah Permintaan Lembur' : 'Ajukan Lembur'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Permintaan Lembur' : 'Ajukan Lembur'}
                    description="Isi formulir permintaan lembur"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? OvertimeRequestController.update.form(item.id)
                                : OvertimeRequestController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal">Tanggal</Label>
                                        <Input
                                            id="tanggal"
                                            name="tanggal"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                item?.tanggal,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.tanggal} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="jam_mulai">
                                            Jam Mulai
                                        </Label>
                                        <Input
                                            id="jam_mulai"
                                            name="jam_mulai"
                                            type="time"
                                            defaultValue={formatTime(
                                                item?.jam_mulai,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.jam_mulai}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="jam_selesai">
                                            Jam Selesai
                                        </Label>
                                        <Input
                                            id="jam_selesai"
                                            name="jam_selesai"
                                            type="time"
                                            defaultValue={formatTime(
                                                item?.jam_selesai,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.jam_selesai}
                                        />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="keperluan">
                                            Keperluan
                                        </Label>
                                        <textarea
                                            id="keperluan"
                                            name="keperluan"
                                            defaultValue={item?.keperluan ?? ''}
                                            required
                                            className={textareaClassName}
                                            rows={3}
                                        />
                                        <InputError
                                            message={errors.keperluan}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={OvertimeRequestController.index.url()}
                                            className="text-sm text-muted-foreground hover:underline"
                                        >
                                            Batal
                                        </Link>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

OvertimeForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Permintaan Lembur',
            href: OvertimeRequestController.index.url(),
        },
        { title: 'Formulir', href: OvertimeRequestController.create.url() },
    ],
};
