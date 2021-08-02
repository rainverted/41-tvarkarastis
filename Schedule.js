class Schedule {
    constructor() {
        this.lessonsBegins = [9, 0];
        this.lessonDuration = [0, 45];
        this.breaks = [];
    }

    intro() {
        const h = this.lessonsBegins[0];
        const m = this.lessonsBegins[1];
        console.log(`Lessons begins at ${this.formatTime(h, m)}`);
    }

    setNewLessonsBegins(newTime) {
        this.lessonsBegins = newTime;
    }

    setNewLessonDuration(newDuration) {
        this.lessonDuration = newDuration;
    }

    addBreak(breakDuration) {
        this.breaks.push(breakDuration);
        console.log(`${this.breaks.length}) break is ${breakDuration} minutes long`);
    }

    printSchedule() {
        let lessonNumber = 0;
        const h = this.lessonsBegins[0];
        const m = this.lessonsBegins[1];
        const firstEndTime = this.calcTimeSum(this.lessonsBegins, this.lessonDuration);
        const firstFormatedStart = this.formatTime(h, m);
        const firstFormatedEnd = this.formatTime(...firstEndTime);

        console.log('School schedule:');
        console.log('================');
        console.log(`${++lessonNumber}. ${firstFormatedStart} - ${firstFormatedEnd}`);

        let lastTime = firstEndTime;
        for (const breakDuration of this.breaks) {
            const lessonStart = this.calcTimeSum(lastTime, [0, breakDuration]);
            const lessonEnd = this.calcTimeSum(lessonStart, this.lessonDuration);
            const formatedLessonStart = this.formatTime(...lessonStart);
            const formatedLessonEnd = this.formatTime(...lessonEnd);
            console.log(`${++lessonNumber}. ${formatedLessonStart} - ${formatedLessonEnd}`);
            lastTime = lessonEnd;
        }
    }

    calcTimeSum(firstTime, secondTime) {
        const totalMinutes = firstTime[1] + secondTime[1];
        const h = firstTime[0] + secondTime[0] + (totalMinutes > 60 ? 1 : 0);
        const m = totalMinutes % 60;
        return [h, m];
    }

    formatTime(hours, minutes) {
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
}

module.exports = Schedule;