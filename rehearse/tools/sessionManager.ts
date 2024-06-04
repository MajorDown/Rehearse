import { Session } from '@/types';

/**
 * Formatte une date en YYMMDD-HHMMSS
 * @param {Date} date
 * @returns {Session}
 */
const sessionFormater = (date: Date): Session => {
    const padZero = (num: number): string => (num < 10 ? '0' : '') + num;
  
    const year: string = String(date.getFullYear()).slice(-2);
    const month: string = padZero(date.getMonth() + 1);
    const day: string = padZero(date.getDate());
  
    const hours: string = padZero(date.getHours());
    const minutes: string = padZero(date.getMinutes());
    const seconds: string = padZero(date.getSeconds());
  
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};

/**
 * récupère un format Date à partir d'une session
 * @param {Session} session 
 * @returns {Date | null}
 */
const sessionExtractor = (session: Session): Date | null => {
    const year: number = 2000 + Number(session.slice(0, 2));
    const month: number = Number(session.slice(2, 4)) - 1;
    const day: number = Number(session.slice(4, 6));
  
    const hours: number = Number(session.slice(7, 9));
    const minutes: number = Number(session.slice(9, 11));
    const seconds: number = Number(session.slice(11, 13));
  
    const date = new Date(year, month, day, hours, minutes, seconds);
  
    return date;
};

export { sessionFormater, sessionExtractor };