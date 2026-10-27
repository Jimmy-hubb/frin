import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeftRight,
    CalendarCheck,
    Clock,
    FileText,
    Megaphone,
    TrendingUp,
    User,
    Users,
    Wallet,
} from 'lucide-react';
import AnnouncementController from '@/actions/App/Http/Controllers/AnnouncementController';
import FimpRequestController from '@/actions/App/Http/Controllers/FimpRequestController';
import HandoverController from '@/actions/App/Http/Controllers/HandoverController';
import KpiEvaluationController from '@/actions/App/Http/Controllers/KpiEvaluationController';
import LeaveRequestController from '@/actions/App/Http/Controllers/LeaveRequestController';
import OvertimeRequestController from '@/actions/App/Http/Controllers/OvertimeRequestController';
import PayrollController from '@/actions/App/Http/Controllers/PayrollController';
import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, statusBadgeClass } from '@/lib/company';
import { dashboard } from '@/routes';

type Stats = {
    totalUsers: number;
    leavePending: number;
    overtimePending: number;
    fimpPending: number;
    handoverPending: number;
};

type AnnouncementItem = {
    id: number;
    title: string;
    content: string;
    user: { name: string };
};

type LeaveItem = {
    id: number;
    user: { name: string };
    category: { nama: string };
    tanggal_awal: string;
    tanggal_akhir: string;
    status_label: string;
};

type OvertimeItem = {
    id: number;
    user: { name: string };
    tanggal: string;
    status_label: string;
};

type HandoverItem = {
    id: number;
    user: { name: string };
    penerima: { name: string };
    jabatan: string;
    status_label: string;
};

type Props = {
    stats: Stats;
    activeAnnouncements: AnnouncementItem[];
    recentLeave: LeaveItem[];
    recentOvertime: OvertimeItem[];
    recentHandovers: HandoverItem[];
};

const menus = [
    {
        title: 'Data Pribadi',
        description: 'Profil dan data karyawan',
        href: ProfileController.show.url(),
        icon: User,
    },
    {
        title: 'Form Izin Cuti',
        description: 'Pengajuan dan persetujuan cuti',
        href: LeaveRequestController.index.url(),
        icon: CalendarCheck,
    },
    {
        title: 'FIMP',
        description: 'Izin dengan karyawan pengganti',
        href: FimpRequestController.index.url(),
        icon: FileText,
    },
    {
        title: 'Permintaan Lembur',
        description: 'Pengajuan dan persetujuan lembur',
        href: OvertimeRequestController.index.url(),
        icon: Clock,
    },
    {
        title: 'Penyerahan Jabatan',
        description: 'Serah terima jabatan antar karyawan',
        href: HandoverController.index.url(),
        icon: ArrowLeftRight,
    },
    {
        title: 'Performance Indicator',
        description: 'Evaluasi KPI karyawan',
        href: KpiEvaluationController.index.url(),
        icon: TrendingUp,
    },
    {
        title: 'Penggajian',
        description: 'Slip gaji karyawan',
        href: PayrollController.index.url(),
        icon: Wallet,
    },
    {
        title: 'Pengumuman',
        description: 'Pengumuman perusahaan',
        href: AnnouncementController.index.url(),
        icon: Megaphone,
    },
];

export default function Dashboard({
    stats,
    activeAnnouncements,
    recentLeave,
    recentOvertime,
    recentHandovers,
}: Props) {
    const statCards = [
        { label: 'Total Karyawan', value: stats.totalUsers },
        { label: 'Cuti Menunggu', value: stats.leavePending },
        { label: 'Lembur Menunggu', value: stats.overtimePending },
        { label: 'FIMP Menunggu', value: stats.fimpPending },
        { label: 'Jabatan Menunggu', value: stats.handoverPending },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Dashboard Perusahaan"
                    description="Ringkasan dan menu perusahaan"
                />

                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
                    {statCards.map((stat) => (
                        <Card key={stat.label}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div>
                    <h2 className="mb-3 text-lg font-semibold">
                        Menu Perusahaan
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {menus.map((menu) => (
                            <Link key={menu.title} href={menu.href}>
                                <Card className="transition hover:shadow-md">
                                    <CardHeader className="flex flex-row items-center gap-3">
                                        <menu.icon className="size-6 text-primary" />
                                        <CardTitle className="text-base">
                                            {menu.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 text-sm text-muted-foreground">
                                        {menu.description}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="size-5" /> Pengumuman
                                Aktif
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {activeAnnouncements.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Belum ada pengumuman aktif.
                                </p>
                            )}
                            {activeAnnouncements.map((item) => (
                                <Link
                                    key={item.id}
                                    href={AnnouncementController.show.url(
                                        item.id,
                                    )}
                                    className="block rounded-lg border p-3 hover:bg-muted/50"
                                >
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        oleh {item.user.name}
                                    </p>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="size-5" /> Aktivitas Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {recentLeave.map((item) => (
                                <div
                                    key={`cuti-${item.id}`}
                                    className="flex items-center justify-between gap-2"
                                >
                                    <span>
                                        Cuti {item.user.name} (
                                        {item.category.nama},{' '}
                                        {formatDate(item.tanggal_awal)} –{' '}
                                        {formatDate(item.tanggal_akhir)})
                                    </span>
                                    <Badge
                                        className={statusBadgeClass(
                                            item.status_label,
                                        )}
                                    >
                                        {item.status_label}
                                    </Badge>
                                </div>
                            ))}
                            {recentOvertime.map((item) => (
                                <div
                                    key={`lembur-${item.id}`}
                                    className="flex items-center justify-between gap-2"
                                >
                                    <span>
                                        Lembur {item.user.name} (
                                        {formatDate(item.tanggal)})
                                    </span>
                                    <Badge
                                        className={statusBadgeClass(
                                            item.status_label,
                                        )}
                                    >
                                        {item.status_label}
                                    </Badge>
                                </div>
                            ))}
                            {recentHandovers.map((item) => (
                                <div
                                    key={`jabatan-${item.id}`}
                                    className="flex items-center justify-between gap-2"
                                >
                                    <span>
                                        Jabatan {item.user.name} →{' '}
                                        {item.penerima.name} ({item.jabatan})
                                    </span>
                                    <Badge
                                        className={statusBadgeClass(
                                            item.status_label,
                                        )}
                                    >
                                        {item.status_label}
                                    </Badge>
                                </div>
                            ))}
                            {recentLeave.length === 0 &&
                                recentOvertime.length === 0 &&
                                recentHandovers.length === 0 && (
                                    <p className="text-muted-foreground">
                                        Belum ada aktivitas.
                                    </p>
                                )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
