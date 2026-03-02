export function updateBusinessHours() {
    const scheduleConfig = {
        default_hours: {
            sunday: "11AM - 7PM",
            montuesday: "Closed 🚫",
            wednesday: "4PM - 8PM",
            thursday: "4PM - 8PM",
            friday: "4PM - 10PM",
            saturday: "12PM - 10PM"
        },
        holidays: {
            "10-31": "Closed 🎃",
            "12-25": "Closed 🎄",
            "12-26": "Closed 🎁",
            "12-27": "12PM - 10PM<br><span class='text-sm opacity-80'>(Holiday Hours)</span>",
            "01-01": "Closed 🌟",
            "01-02": "12PM - 6PM",
            "01-03": "12PM - 10PM<br><span class='text-sm opacity-80'>(Holiday Hours)</span>",
            "04-20": "Closed 🐣",
            "07-01": "Closed 🍁"
        }
    };

    const now = new Date();
    const currentDay = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentDay);

    const getOrdinal = n => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formatMonthDay = date => {
        let m = '' + (date.getMonth() + 1);
        let d = '' + date.getDate();
        if (m.length < 2) m = '0' + m;
        if (d.length < 2) d = '0' + d;
        return m + '-' + d;
    };

    const daysMap = [
        { id: 'card-0', offset: 0, key: 'sunday' },
        { id: 'card-1', offset: [1, 2], key: 'montuesday' },
        { id: 'card-2', offset: 3, key: 'wednesday' },
        { id: 'card-3', offset: 4, key: 'thursday' },
        { id: 'card-4', offset: 5, key: 'friday' },
        { id: 'card-5', offset: 6, key: 'saturday' }
    ];

    const mobileTodayEl = document.getElementById('mobile-today-hours-text');

    daysMap.forEach(config => {
        const card = document.getElementById(config.id);
        if (!card) return;

        const dateEl = card.querySelector('.day-date');
        const hoursEl = card.querySelector('.hour-text');

        let displayHours = scheduleConfig.default_hours[config.key];
        let isToday = false;

        if (Array.isArray(config.offset)) {
            const d1 = new Date(startOfWeek);
            d1.setDate(startOfWeek.getDate() + config.offset[0]);
            const d2 = new Date(startOfWeek);
            d2.setDate(startOfWeek.getDate() + config.offset[1]);

            if (currentDay === config.offset[0] || currentDay === config.offset[1]) isToday = true;

            const d1Key = formatMonthDay(d1);
            const d2Key = formatMonthDay(d2);

            if (scheduleConfig.holidays[d1Key]) displayHours = scheduleConfig.holidays[d1Key];
            if (scheduleConfig.holidays[d2Key]) displayHours = scheduleConfig.holidays[d2Key];

            if (dateEl) dateEl.textContent = `${getOrdinal(d1.getDate())} + ${getOrdinal(d2.getDate())}`;
        } else {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + config.offset);

            if (currentDay === config.offset) isToday = true;

            const dKey = formatMonthDay(d);
            if (scheduleConfig.holidays[dKey]) displayHours = scheduleConfig.holidays[dKey];

            if (dateEl) dateEl.textContent = getOrdinal(d.getDate());
        }

        if (hoursEl) hoursEl.innerHTML = displayHours;

        // Add or remove is-today class
        if (isToday) {
            card.classList.add('is-today');
            if (mobileTodayEl) mobileTodayEl.innerHTML = displayHours;
        } else {
            card.classList.remove('is-today');
        }
    });

    // Fallback for policy pages: update mobile hours if still loading
    if (mobileTodayEl && mobileTodayEl.textContent === 'Loading...') {
        const daysMapSimple = ['sunday', 'montuesday', 'montuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayKey = daysMapSimple[currentDay];
        let displayHours = scheduleConfig.default_hours[todayKey];
        
        const dKey = formatMonthDay(now);
        if (scheduleConfig.holidays[dKey]) displayHours = scheduleConfig.holidays[dKey];
        
        mobileTodayEl.innerHTML = displayHours;
    }
}