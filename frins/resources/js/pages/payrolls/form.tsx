import { Form, Head, Link } from '@inertiajs/react';
import PayrollController from '@/actions/App/Http/Controllers/PayrollController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

type UserOption = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    user_id: number;
    periode: string;
    gaji_pokok: number;
    tunjangan: number;
    potongan: number;
};

type Props = {
    item: Item | null;
    users: UserOption[];
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const inputClassName = 'mt-1 block w-full';

export default function PayrollForm({ item, users }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head title={isEdit ? 'Ubah Slip Gaji' : 'Buat Slip Gaji'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Slip Gaji' : 'Buat Slip Gaji'}
                    description="Total gaji = gaji pokok + tunjangan − potongan"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? PayrollController.update.form(item.id)
                                : PayrollController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="user_id">
                                            Karyawan
                                        </Label>
                                        <select
                                            id="user_id"
                                            name="user_id"
                                            defaultValue={item?.user_id ?? ''}
                                            required
                                            className={selectClassName}
                                        >
                                            <option value="">
                                                Pilih karyawan
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
                                        <InputError message={errors.user_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="periode">Periode</Label>
                                        <Input
                                            id="periode"
                                            name="periode"
                                            defaultValue={item?.periode ?? ''}
                                            required
                                            placeholder="cth: 2026-10"
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.periode} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="gaji_pokok">
                                            Gaji Pokok (Rp)
                                        </Label>
                                        <Input
                                            id="gaji_pokok"
                                            name="gaji_pokok"
                                            type="number"
                                            min={0}
                                            defaultValue={
                                                item?.gaji_pokok ?? ''
                                            }
                                            required
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.gaji_pokok}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tunjangan">
                                            Tunjangan (Rp)
                                        </Label>
                                        <Input
                                            id="tunjangan"
                                            name="tunjangan"
                                            type="number"
                                            min={0}
                                            defaultValue={item?.tunjangan ?? 0}
                                            required
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.tunjangan}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="potongan">
                                            Potongan (Rp)
                                        </Label>
                                        <Input
                                            id="potongan"
                                            name="potongan"
                                            type="number"
                                            min={0}
                                            defaultValue={item?.potongan ?? 0}
                                            required
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.potongan} />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={PayrollController.index.url()}
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

PayrollForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Penggajian', href: PayrollController.index.url() },
        { title: 'Formulir', href: PayrollController.create.url() },
    ],
};
