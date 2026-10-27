import { Form, Head, Link } from '@inertiajs/react';
import KpiEvaluationController from '@/actions/App/Http/Controllers/KpiEvaluationController';
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
    kedisiplinan_score: number;
    kedisiplinan_max: number;
    mengajar_score: number;
    mengajar_max: number;
    daily_report_score: number;
    daily_report_max: number;
    teamwork_score: number;
    teamwork_max: number;
};

type Props = {
    item: Item | null;
    users: UserOption[];
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const inputClassName = 'mt-1 block w-full';

const aspects = [
    {
        label: 'Kedisiplinan',
        score: 'kedisiplinan_score',
        max: 'kedisiplinan_max',
    },
    { label: 'Mengajar', score: 'mengajar_score', max: 'mengajar_max' },
    {
        label: 'Daily Report',
        score: 'daily_report_score',
        max: 'daily_report_max',
    },
    { label: 'Teamwork', score: 'teamwork_score', max: 'teamwork_max' },
] as const;

export default function KpiForm({ item, users }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head
                title={isEdit ? 'Ubah Evaluasi KPI' : 'Tambah Evaluasi KPI'}
            />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Evaluasi KPI' : 'Tambah Evaluasi KPI'}
                    description="Nilai tiap aspek tidak boleh melebihi nilai maksimumnya"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? KpiEvaluationController.update.form(item.id)
                                : KpiEvaluationController.store.form())}
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
                                            placeholder="cth: 2026-Q4"
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.periode} />
                                    </div>

                                    {aspects.map((aspect) => (
                                        <div
                                            key={aspect.score}
                                            className="grid grid-cols-2 gap-4 sm:col-span-2"
                                        >
                                            <div className="grid gap-2">
                                                <Label htmlFor={aspect.score}>
                                                    {aspect.label} (skor)
                                                </Label>
                                                <Input
                                                    id={aspect.score}
                                                    name={aspect.score}
                                                    type="number"
                                                    min={0}
                                                    defaultValue={
                                                        item?.[aspect.score] ??
                                                        ''
                                                    }
                                                    required
                                                    className={inputClassName}
                                                />
                                                <InputError
                                                    message={
                                                        errors[aspect.score]
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={aspect.max}>
                                                    {aspect.label} (maksimal)
                                                </Label>
                                                <Input
                                                    id={aspect.max}
                                                    name={aspect.max}
                                                    type="number"
                                                    min={1}
                                                    defaultValue={
                                                        item?.[aspect.max] ??
                                                        100
                                                    }
                                                    required
                                                    className={inputClassName}
                                                />
                                                <InputError
                                                    message={errors[aspect.max]}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={KpiEvaluationController.index.url()}
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

KpiForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Performance Indicator',
            href: KpiEvaluationController.index.url(),
        },
        { title: 'Formulir', href: KpiEvaluationController.create.url() },
    ],
};
