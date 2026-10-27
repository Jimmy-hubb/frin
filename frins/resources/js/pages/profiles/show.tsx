import { Head, Link } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/company';
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

export default function ProfileShow({ profile, user }: Props) {
    const rows: Array<[string, string]> = profile
        ? [
              ['Nama', user.name],
              ['Email', user.email],
              ['NIK', profile.nik ?? '-'],
              ['Jenis Kelamin', profile.jenis_kelamin ?? '-'],
              [
                  'Tempat, Tanggal Lahir',
                  `${profile.tempat_lahir ?? '-'} , ${formatDate(profile.tanggal_lahir)}`,
              ],
              ['Alamat', profile.alamat ?? '-'],
              ['Kota', profile.kota ?? '-'],
              ['Provinsi', profile.provinsi ?? '-'],
              ['Telepon', profile.telepon ?? '-'],
              ['Telepon Alternatif', profile.telepon_alternatif ?? '-'],
              ['Pendidikan Terakhir', profile.pendidikan_terakhir ?? '-'],
              ['Jabatan', profile.jabatan ?? '-'],
              ['Departemen', profile.departemen ?? '-'],
              ['Tanggal Masuk', formatDate(profile.tanggal_masuk)],
          ]
        : [];

    return (
        <>
            <Head title="Data Pribadi" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Data Pribadi"
                        description="Profil dan data karyawan"
                    />
                    <Button asChild>
                        <Link href={ProfileController.edit.url()}>
                            {profile ? 'Ubah Data' : 'Lengkapi Data'}
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        {!profile && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada data pribadi. Silakan lengkapi data
                                Anda.
                            </p>
                        )}
                        {profile && (
                            <dl className="grid gap-4 sm:grid-cols-2">
                                {rows.map(([label, value]) => (
                                    <div key={label}>
                                        <dt className="text-sm font-medium text-muted-foreground">
                                            {label}
                                        </dt>
                                        <dd className="mt-1 font-medium">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProfileShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Data Pribadi', href: ProfileController.show.url() },
    ],
};
