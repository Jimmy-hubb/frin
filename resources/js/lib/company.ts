export function formatDate(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export function formatDateTime(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function dateInputValue(value: string | null | undefined): string {
    if (!value) {
        return '';
    }

    return value.slice(0, 10);
}

export function formatTime(value: string | null | undefined): string {
    if (!value) {
        return '-';
    }

    return value.slice(0, 5);
}

export function formatRupiah(value: number | null | undefined): string {
    if (value === null || value === undefined) {
        return '-';
    }

    return `Rp ${value.toLocaleString('id-ID')}`;
}

export function statusBadgeClass(label: string): string {
    switch (label) {
        case 'Disetujui':
        case 'Terbit':
            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
        case 'Ditolak':
            return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300';
        case 'Draft':
            return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        default:
            return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    }
}
