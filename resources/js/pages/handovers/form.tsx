import { Form, Head, Link } from '@inertiajs/react';
import HandoverController from '@/actions/App/Http/Controllers/HandoverController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dateInputValue } from '@/lib/company';
import { dashboard } from '@/routes';

type UserOption = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    penerima_id: number;
    jabatan: string;
    tanggal_serah_terima: string;
    alasan: string;
    daftar_serah_terima: string;
};

type Props = {
    item: Item | null;
    users: UserOption[];
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function HandoverForm({ item, users }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head
                title={
                    isEdit
                        ? 'Ubah Penyerahan Jabatan'
                        : 'Buat Penyerahan Jabatan'
                }
            />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={
                        isEdit
                            ? 'Ubah Penyerahan Jabatan'
                            : 'Buat Penyerahan Jabatan'
                    }
                    description="Serah terima jabatan, tugas, dan aset"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? HandoverController.update.form(item.id)
                                : HandoverController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="penerima_id">
                                            Penerima
                                        </Label>
                                        <select
                                            id="penerima_id"
                                            name="penerima_id"
                                            defaultValue={
                                                item?.penerima_id ?? ''
                                            }
                                            required
                                            className={selectClassName}
                                        >
                                            <option value="">
                                                Pilih penerima
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.penerima_id}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="jabatan">Jabatan</Label>
                                        <Input
                                            id="jabatan"
                                            name="jabatan"
                                            defaultValue={item?.jabatan ?? ''}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.jabatan} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_serah_terima">
                                            Tanggal Serah Terima
                                        </Label>
                                        <Input
                                            id="tanggal_serah_terima"
                                            name="tanggal_serah_terima"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                item?.tanggal_serah_terima,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={
                                                errors.tanggal_serah_terima
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="alasan">Alasan</Label>
                                        <textarea
                                            id="alasan"
                                            name="alasan"
                                            defaultValue={item?.alasan ?? ''}
                                            required
                                            className={textareaClassName}
                                            rows={3}
                                        />
                                        <InputError message={errors.alasan} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="daftar_serah_terima">
                                            Daftar Serah Terima (tugas, dokumen,
                                            aset)
                                        </Label>
                                        <textarea
                                            id="daftar_serah_terima"
                                            name="daftar_serah_terima"
                                            defaultValue={
                                                item?.daftar_serah_terima ?? ''
                                            }
                                            required
                                            className={textareaClassName}
                                            rows={5}
                                        />
                                        <InputError
                                            message={errors.daftar_serah_terima}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={HandoverController.index.url()}
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

HandoverForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penyerahan Jabatan', href: HandoverController.index.url() },
        { title: 'Formulir', href: HandoverController.create.url() },
    ],
};
