import { Form, Head, Link } from '@inertiajs/react';
import FimpRequestController from '@/actions/App/Http/Controllers/FimpRequestController';
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
    pengganti_id: number;
    tanggal_awal: string;
    tanggal_akhir: string;
    keperluan: string;
};

type Props = {
    item: Item | null;
    users: UserOption[];
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function FimpForm({ item, users }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head title={isEdit ? 'Ubah Pengajuan FIMP' : 'Ajukan FIMP'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Pengajuan FIMP' : 'Ajukan FIMP'}
                    description="Izin dengan karyawan pengganti"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? FimpRequestController.update.form(item.id)
                                : FimpRequestController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="pengganti_id">
                                            Karyawan Pengganti
                                        </Label>
                                        <select
                                            id="pengganti_id"
                                            name="pengganti_id"
                                            defaultValue={
                                                item?.pengganti_id ?? ''
                                            }
                                            required
                                            className={selectClassName}
                                        >
                                            <option value="">
                                                Pilih pengganti
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
                                            message={errors.pengganti_id}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_awal">
                                            Tanggal Awal
                                        </Label>
                                        <Input
                                            id="tanggal_awal"
                                            name="tanggal_awal"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                item?.tanggal_awal,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.tanggal_awal}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_akhir">
                                            Tanggal Akhir
                                        </Label>
                                        <Input
                                            id="tanggal_akhir"
                                            name="tanggal_akhir"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                item?.tanggal_akhir,
                                            )}
                                            required
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.tanggal_akhir}
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
                                            href={FimpRequestController.index.url()}
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

FimpForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'FIMP', href: FimpRequestController.index.url() },
        { title: 'Formulir', href: FimpRequestController.create.url() },
    ],
};
