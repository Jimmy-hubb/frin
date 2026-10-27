import { Form, Head, Link } from '@inertiajs/react';
import LeaveRequestController from '@/actions/App/Http/Controllers/LeaveRequestController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dateInputValue } from '@/lib/company';
import { dashboard } from '@/routes';

type Category = {
    id: number;
    nama: string;
};

type Item = {
    id: number;
    leave_category_id: number;
    tanggal_awal: string;
    tanggal_akhir: string;
    keterangan: string | null;
};

type Props = {
    item: Item | null;
    categories: Category[];
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function LeaveForm({ item, categories }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head title={isEdit ? 'Ubah Pengajuan Cuti' : 'Ajukan Cuti'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Pengajuan Cuti' : 'Ajukan Cuti'}
                    description="Isi formulir pengajuan cuti"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? LeaveRequestController.update.form(item.id)
                                : LeaveRequestController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="leave_category_id">
                                            Jenis Cuti
                                        </Label>
                                        <select
                                            id="leave_category_id"
                                            name="leave_category_id"
                                            defaultValue={
                                                item?.leave_category_id ?? ''
                                            }
                                            required
                                            className={selectClassName}
                                        >
                                            <option value="">
                                                Pilih jenis cuti
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.leave_category_id}
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
                                        <Label htmlFor="keterangan">
                                            Keterangan
                                        </Label>
                                        <textarea
                                            id="keterangan"
                                            name="keterangan"
                                            defaultValue={
                                                item?.keterangan ?? ''
                                            }
                                            className={textareaClassName}
                                            rows={3}
                                        />
                                        <InputError
                                            message={errors.keterangan}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={LeaveRequestController.index.url()}
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

LeaveForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Form Izin Cuti', href: LeaveRequestController.index.url() },
        { title: 'Formulir', href: LeaveRequestController.create.url() },
    ],
};
