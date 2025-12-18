export function createPageUrl(pageName: string) {
    const normalized = pageName.trim().toLowerCase().replace(/ /g, '-');
    if (normalized === 'home') {
        return '/';
    }
    return `/${normalized}`;
}
