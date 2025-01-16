export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nb-NO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};