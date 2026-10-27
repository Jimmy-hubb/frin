import { Head, Link } from '@inertiajs/react';
import KpiEvaluationController from '@/actions/App/Http/Controllers/KpiEvaluationController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

type Item = {
    id: number;
    user: { name: string };
    periode: string;
    total_score: number;
    total_max: number;
    percentage: number;
};

type Props = {
    items: Item[];
    averagePercentage: number;
    totalEvaluations: number;
    bestPercentage: number;
};

export default function KpiIndex({
    items,
    averagePercentage,
    totalEvaluations,
    bestPercentage,
}: Props) {
    return (
        <>
            <Head title="Performance Indicator" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Performance Indicator"
                        description="Evaluasi KPI karyawan"
                    />
                    <Button asChild>
                        <Link href={KpiEvaluationController.create.url()}>
                            Tambah Evaluasi
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Evaluasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {totalEvaluations}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Rata-rata Skor
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {averagePercentage}%
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Skor Terbaik
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {bestPercentage}%
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="overflow-x-auto pt-6">
                        {items.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Belum ada evaluasi KPI.
                            </p>
                        )}
                        {items.length > 0 && (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="py-2 pr-4">Karyawan</th>
                                        <th className="py-2 pr-4">Periode</th>
                                        <th className="py-2 pr-4">
                                            Total Skor
                                        </th>
                                        <th className="py-2 pr-4">
                                            Persentase
                                        </th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2 pr-4 font-medium">
                                                {item.user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.periode}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {item.total_score} /{' '}
                                                {item.total_max}
                                            </td>
                                            <td className="py-2 pr-4 font-medium">
                                                {item.percentage}%
                                            </td>
                                            <td className="py-2">
                                                <Link
                                                    href={KpiEvaluationController.show.url(
                                                        item.id,
                                                    )}
                                                    className="text-primary hover:underline"
                                                >
                                                    Lihat
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

KpiIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Performance Indicator',
            href: KpiEvaluationController.index.url(),
        },
    ],
};
