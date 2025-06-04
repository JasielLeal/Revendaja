import { format } from 'date-fns-tz';

export function formatDate(dateString: string) {
    return format(new Date(dateString), 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
    });
}