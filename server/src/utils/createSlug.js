function createSlug(text) {
    if (!text) return ""
    let slug = text.replace(/[^\w\u0980-\u09FF]+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');
    slug = slug.toLowerCase();

    return slug;
}

export default createSlug