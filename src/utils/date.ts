import moment from 'moment';

export const customTimeTemplate = (stringDate: string, hours: string) => {
    return moment(`${moment(stringDate).format('YYYY/MM/DD')} ${hours}`);
};

export const checkFormatTime = (v: string) => moment(v, 'HH:mm').isValid();

export const getDateDiff = (date1: string, date2: string) => {
    const duration = moment
        .duration(moment(date2).diff(moment(date1).format('YYYY-MM-DD')))
        .asHours();
    return Math.ceil(duration / 24) || 1;
};

export const isSameMonth = (
    firstDate: string | Date,
    secondDate: string | Date,
) => moment(firstDate).isSame(moment(secondDate), 'month');

export const getStartDateOfMonth = (current: Date) =>
    moment(current).startOf('month').utc().format();

export const getEndDateOfMonth = (current: Date) =>
    moment(current).endOf('month').utc().format();

export const getStartDateOfNextMonth = (current: Date) =>
    moment(current).endOf('month').add('1', 'second').format();

export const getDaysArrayByMonth = (month: Date | string) => {
    let daysInMonth = moment(month).daysInMonth();
    const arrDays = [];

    while (daysInMonth) {
        const current = moment(month).date(daysInMonth);
        arrDays[daysInMonth - 1] = current;
        daysInMonth--;
    }
    return arrDays.map(item => ({
        firstWordDay: item.format('ddd')[0],
        numberDay: item.format('DD'),
        dayStr: item.format('d'),
        startDate: item.format('YYYY-MM-DD'),
    }));
};

const getEndOfDayOrEndDay = (date: string, stop: string) => {
    const endOfDay = moment(date).endOf('day').utc().format();
    return moment(endOfDay).isBefore(moment(stop)) ? endOfDay : stop;
};

const getNextDay = (date: string) => {
    return moment(date).add(1, 'days').startOf('day').utc().format();
};

export const getRoundDay = (date: string) => {
    const isRoundToNextDay = new Date(date).getHours() > 11;
    return isRoundToNextDay
        ? getNextDay(date)
        : moment(date).startOf('day').utc().format();
};

export const setEventsRange = (start: string, stop: string) => {
    let tempDate: string = start;
    const arr: { start: string; stop: string }[] = [];
    while (moment(tempDate).isBefore(stop)) {
        const obj = { start: '', stop: '' };
        obj.start = tempDate;
        obj.stop = getEndOfDayOrEndDay(tempDate, stop);
        arr.push(obj);
        tempDate = getNextDay(tempDate);
    }
    return arr;
};
