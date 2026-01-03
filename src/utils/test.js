// console.log('task', tasks);
// stepTasks(tasks, (taskChunk) => {
//     let count = 0;
//     setTimeout(() => {
//         taskChunk(() => count++ < 3);
//     }, 1000);
// });
function stepTasks(tasks, scheduler) {
    let index = 0;
    function run() {
        scheduler((isGoRunning) => {
            while (index < tasks.length && isGoRunning()) {
                tasks[index++]();
            }
            if (index < tasks.length) {
                run();
            }
        });
    }
    run();
};
const tasks = Array.from({ length: 20 }, (_, i) => () => { console.log('task' + i); });

function idleStepTasks(tasks) {
    requestIdleCallback((idle) => {
        stepTasks(tasks, (taskChunk) => {
            taskChunk(() => idle.timeRemaining() > 0);
        });
    });
}
idleStepTasks(tasks);
