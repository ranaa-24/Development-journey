export let visitorCountMap = new Map();

export function countUser(user){
    let count = visitorCountMap.get(user) || 0;
    visitorCountMap.set(user, count+1);
}
