import { Link } from '@inertiajs/react';
import {
    ArrowLeftRight,
    BookOpen,
    CalendarCheck,
    Clock,
    FileText,
    FolderGit2,
    LayoutGrid,
    Megaphone,
    TrendingUp,
    User,
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
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Data Pribadi',
        href: ProfileController.show.url(),
        icon: User,
    },
    {
        title: 'Form Izin Cuti',
        href: LeaveRequestController.index.url(),
        icon: CalendarCheck,
    },
    {
        title: 'FIMP',
        href: FimpRequestController.index.url(),
        icon: FileText,
    },
    {
        title: 'Permintaan Lembur',
        href: OvertimeRequestController.index.url(),
        icon: Clock,
    },
    {
        title: 'Penyerahan Jabatan',
        href: HandoverController.index.url(),
        icon: ArrowLeftRight,
    },
    {
        title: 'Performance Indicator',
        href: KpiEvaluationController.index.url(),
        icon: TrendingUp,
    },
    {
        title: 'Penggajian',
        href: PayrollController.index.url(),
        icon: Wallet,
    },
    {
        title: 'Pengumuman',
        href: AnnouncementController.index.url(),
        icon: Megaphone,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
