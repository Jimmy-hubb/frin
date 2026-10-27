import { Head, Link, router } from '@inertiajs/react';
import KpiEvaluationController from '@/actions/App/Http/Controllers/KpiEvaluationController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard } from '@/routes';

type Aspect = {
    label: string;
    score: number;
    max: number;
};

type Item = {
    id: number;
    user: { name: string };
    periode: string;
    total_score: number;
    total_max: number;
    percentage: number;
};

type Props = {
    item: Item;
    aspects: Aspect[];
};

export default function KpiShow({ item, aspects }: Props) {
    return (
        <>
            <Head title="Detail Evaluasi KPI" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Detail Evaluasi KPI"
                    description={`${item.user.name} — periode ${item.periode}`}
                />

                <Card>
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex items-end gap-2">
                            <p className="text-4xl font-bold">
                                {item.percentage}%
                            </p>
                            <p className="pb-1 text-muted-foreground">
                                ({item.total_score} / {item.total_max})
                            </p>
                        </div>

                        {aspects.map((aspect) => {
                            const pct =
                                aspect.max > 0
                                    ? Math.round(
                                          (aspect.score / aspect.max) * 1000,
                                      ) / 10
                                    : 0;

                            return (
                                <div key={aspect.label}>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span className="font-medium">
                                            {aspect.label}
                                        </span>
                                        <span>
                                            {aspect.score} / {aspect.max} ({pct}
                                            %)
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <Button variant="outline" asChild>
                                <Link
                                    href={KpiEvaluationController.index.url()}
                                >
                                    Kembali
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={KpiEvaluationController.edit.url(
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
                                            'Hapus evaluasi KPI ini?',
                                        )
                                    ) {
                                        router.delete(
                                            KpiEvaluationController.destroy.url(
                                                item.id,
                                            ),
                                        );
                                    }
                                }}
                            >
                                Hapus
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

KpiShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        {
            title: 'Performance Indicator',
            href: KpiEvaluationController.index.url(),
        },
        { title: 'Detail', href: KpiEvaluationController.index.url() },
    ],
};
