import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

// Fireflies drifting over the night meadow video.
const fireflies = [
    {
        left: '8%',
        top: '62%',
        size: 5,
        delay: '0s',
        duration: '3s',
        color: 'bg-amber-200',
    },
    {
        left: '16%',
        top: '74%',
        size: 4,
        delay: '1.2s',
        duration: '4s',
        color: 'bg-cyan-100',
    },
    {
        left: '26%',
        top: '58%',
        size: 6,
        delay: '0.6s',
        duration: '3.5s',
        color: 'bg-amber-100',
    },
    {
        left: '36%',
        top: '80%',
        size: 4,
        delay: '2s',
        duration: '4.5s',
        color: 'bg-white',
    },
    {
        left: '48%',
        top: '66%',
        size: 5,
        delay: '0.3s',
        duration: '3.2s',
        color: 'bg-amber-200',
    },
    {
        left: '58%',
        top: '76%',
        size: 4,
        delay: '1.8s',
        duration: '3.8s',
        color: 'bg-cyan-100',
    },
    {
        left: '68%',
        top: '60%',
        size: 6,
        delay: '0.9s',
        duration: '4.2s',
        color: 'bg-amber-100',
    },
    {
        left: '78%',
        top: '72%',
        size: 4,
        delay: '2.6s',
        duration: '3.4s',
        color: 'bg-white',
    },
    {
        left: '88%',
        top: '64%',
        size: 5,
        delay: '1.5s',
        duration: '4s',
        color: 'bg-amber-200',
    },
    {
        left: '93%',
        top: '78%',
        size: 4,
        delay: '0.2s',
        duration: '3.6s',
        color: 'bg-cyan-100',
    },
];

function Fireflies() {
    return (
        <>
            {fireflies.map((fly, index) => (
                <span
                    key={index}
                    aria-hidden
                    className={`pointer-events-none absolute animate-twinkle rounded-full ${fly.color} shadow-[0_0_10px_2px_rgba(255,255,255,0.35)]`}
                    style={{
                        left: fly.left,
                        top: fly.top,
                        width: fly.size,
                        height: fly.size,
                        animationDuration: fly.duration,
                        animationDelay: fly.delay,
                    }}
                />
            ))}
        </>
    );
}

export default function AnimeAuthLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { component, props } = usePage();
    const isLogin = component === 'auth/login';
    const greeting = isLogin ? 'Selamat Datang Kembali' : 'Selamat Bergabung';
    const greetingSub = isLogin
        ? 'Senang kamu kembali!'
        : 'Buat akun dan mulai ceritamu!';
    const appName = props.name;

    return (
        <div className="relative flex min-h-svh flex-col bg-slate-950 font-anime">
            {/* Live wallpaper video */}
            <video
                className="fixed inset-0 h-full w-full object-cover"
                src="/videos/night-meadow.mp4"
                poster="/images/anime-auth.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            />
            {/* Readability overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/10 to-slate-950/80" />
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <Fireflies />
            </div>

            {/* Content */}
            <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 px-6 py-10 lg:flex-row lg:justify-between">
                {/* Greeting */}
                <div className="text-center lg:max-w-md lg:text-left">
                    <p className="text-5xl leading-tight font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] lg:text-6xl">
                        {greeting}
                    </p>
                    <p className="mt-3 text-lg font-bold text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                        {greetingSub}
                    </p>
                    <Link
                        href={home()}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <AppLogoIcon className="size-5 fill-current" />
                        {appName}
                    </Link>
                </div>

                {/* Card */}
                <div className="w-full max-w-sm">
                    <div className="mb-5 text-center">
                        <h1 className="bg-gradient-to-r from-amber-100 via-teal-100 to-emerald-300 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm font-bold text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                            {description}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/20 bg-slate-950/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-xs font-black tracking-[0.3em] text-amber-200/70">
                        ✦ {greeting} ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
