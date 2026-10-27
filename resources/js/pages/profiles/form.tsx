import { Form, Head, Link } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dateInputValue } from '@/lib/company';
import { dashboard } from '@/routes';

type Profile = {
    nik: string | null;
    jenis_kelamin: string | null;
    tempat_lahir: string | null;
    tanggal_lahir: string | null;
    alamat: string | null;
    kota: string | null;
    provinsi: string | null;
    telepon: string | null;
    telepon_alternatif: string | null;
    pendidikan_terakhir: string | null;
    jabatan: string | null;
    departemen: string | null;
    tanggal_masuk: string | null;
};

type Props = {
    profile: Profile | null;
    user: { name: string; email: string };
};

const inputClassName = 'mt-1 block w-full';
const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';

export default function ProfileForm({ profile, user }: Props) {
    return (
        <>
            <Head title="Ubah Data Pribadi" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Ubah Data Pribadi"
                    description={`Data untuk ${user.name} (${user.email})`}
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...ProfileController.update.form()}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="nik">NIK</Label>
                                        <Input
                                            id="nik"
                                            name="nik"
                                            defaultValue={profile?.nik ?? ''}
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.nik} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="jenis_kelamin">
                                            Jenis Kelamin
                                        </Label>
                                        <select
                                            id="jenis_kelamin"
                                            name="jenis_kelamin"
                                            defaultValue={
                                                profile?.jenis_kelamin ?? ''
                                            }
                                            className="mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none"
                                        >
                                            <option value="">Pilih</option>
                                            <option value="Laki-laki">
                                                Laki-laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.jenis_kelamin}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                        </Label>
                                        <Input
                                            id="tempat_lahir"
                                            name="tempat_lahir"
                                            defaultValue={
                                                profile?.tempat_lahir ?? ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.tempat_lahir}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            id="tanggal_lahir"
                                            name="tanggal_lahir"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                profile?.tanggal_lahir,
                                            )}
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.tanggal_lahir}
                                        />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="alamat">Alamat</Label>
                                        <textarea
                                            id="alamat"
                                            name="alamat"
                                            defaultValue={profile?.alamat ?? ''}
                                            className={textareaClassName}
                                            rows={3}
                                        />
                                        <InputError message={errors.alamat} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="kota">Kota</Label>
                                        <Input
                                            id="kota"
                                            name="kota"
                                            defaultValue={profile?.kota ?? ''}
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.kota} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="provinsi">
                                            Provinsi
                                        </Label>
                                        <Input
                                            id="provinsi"
                                            name="provinsi"
                                            defaultValue={
                                                profile?.provinsi ?? ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.provinsi} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="telepon">Telepon</Label>
                                        <Input
                                            id="telepon"
                                            name="telepon"
                                            defaultValue={
                                                profile?.telepon ?? ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.telepon} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="telepon_alternatif">
                                            Telepon Alternatif
                                        </Label>
                                        <Input
                                            id="telepon_alternatif"
                                            name="telepon_alternatif"
                                            defaultValue={
                                                profile?.telepon_alternatif ??
                                                ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.telepon_alternatif}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                        </Label>
                                        <Input
                                            id="pendidikan_terakhir"
                                            name="pendidikan_terakhir"
                                            defaultValue={
                                                profile?.pendidikan_terakhir ??
                                                ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.pendidikan_terakhir}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="jabatan">Jabatan</Label>
                                        <Input
                                            id="jabatan"
                                            name="jabatan"
                                            defaultValue={
                                                profile?.jabatan ?? ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.jabatan} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="departemen">
                                            Departemen
                                        </Label>
                                        <Input
                                            id="departemen"
                                            name="departemen"
                                            defaultValue={
                                                profile?.departemen ?? ''
                                            }
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.departemen}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_masuk">
                                            Tanggal Masuk
                                        </Label>
                                        <Input
                                            id="tanggal_masuk"
                                            name="tanggal_masuk"
                                            type="date"
                                            defaultValue={dateInputValue(
                                                profile?.tanggal_masuk,
                                            )}
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.tanggal_masuk}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={ProfileController.show.url()}
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

ProfileForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Data Pribadi', href: ProfileController.show.url() },
        { title: 'Ubah', href: ProfileController.edit.url() },
    ],
};
