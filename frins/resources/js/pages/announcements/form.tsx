import { Form, Head, Link } from '@inertiajs/react';
import AnnouncementController from '@/actions/App/Http/Controllers/AnnouncementController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

type Item = {
    id: number;
    title: string;
    content: string;
    published_at: string | null;
    expires_at: string | null;
    is_published: boolean;
};

type Props = {
    item: Item | null;
};

const selectClassName =
    'mt-1 block h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:outline-none';
const textareaClassName =
    'mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none';
const inputClassName = 'mt-1 block w-full';

function datetimeInputValue(value: string | null | undefined): string {
    if (!value) {
        return '';
    }

    return value.slice(0, 16);
}

export default function AnnouncementForm({ item }: Props) {
    const isEdit = item !== null;

    return (
        <>
            <Head title={isEdit ? 'Ubah Pengumuman' : 'Buat Pengumuman'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <Heading
                    title={isEdit ? 'Ubah Pengumuman' : 'Buat Pengumuman'}
                    description="Pengumuman aktif tampil di dashboard selama masa berlakunya"
                />

                <Card>
                    <CardContent className="pt-6">
                        <Form
                            {...(isEdit
                                ? AnnouncementController.update.form(item.id)
                                : AnnouncementController.store.form())}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="title">Judul</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            defaultValue={item?.title ?? ''}
                                            required
                                            className={inputClassName}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor="content">Isi</Label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            defaultValue={item?.content ?? ''}
                                            required
                                            className={textareaClassName}
                                            rows={6}
                                        />
                                        <InputError message={errors.content} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="published_at">
                                            Terbit Pada (opsional)
                                        </Label>
                                        <Input
                                            id="published_at"
                                            name="published_at"
                                            type="datetime-local"
                                            defaultValue={datetimeInputValue(
                                                item?.published_at,
                                            )}
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.published_at}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="expires_at">
                                            Berakhir Pada (opsional)
                                        </Label>
                                        <Input
                                            id="expires_at"
                                            name="expires_at"
                                            type="datetime-local"
                                            defaultValue={datetimeInputValue(
                                                item?.expires_at,
                                            )}
                                            className={inputClassName}
                                        />
                                        <InputError
                                            message={errors.expires_at}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="is_published">
                                            Status
                                        </Label>
                                        <select
                                            id="is_published"
                                            name="is_published"
                                            defaultValue={
                                                item
                                                    ? item.is_published
                                                        ? '1'
                                                        : '0'
                                                    : '1'
                                            }
                                            className={selectClassName}
                                        >
                                            <option value="1">Terbit</option>
                                            <option value="0">Draft</option>
                                        </select>
                                        <InputError
                                            message={errors.is_published}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 sm:col-span-2">
                                        <Button disabled={processing}>
                                            Simpan
                                        </Button>
                                        <Link
                                            href={AnnouncementController.index.url()}
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

AnnouncementForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pengumuman', href: AnnouncementController.index.url() },
        { title: 'Formulir', href: AnnouncementController.create.url() },
    ],
};
