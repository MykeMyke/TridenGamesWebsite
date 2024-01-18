export function nextWeek() {
    const now = new Date();

    now.setDate(now.getDate() + 7)
    return now
}

export function tomorrow(){
    const now = new Date();

    now.setDate(now.getDate() + 1)
    return now
}