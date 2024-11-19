import moment from "moment/moment";
export const formatDate = (date: string | undefined) => moment(date).format('DD.MM.YYYY');
export const formatTime = (date: string | undefined) => moment(date).format('HH:mm');