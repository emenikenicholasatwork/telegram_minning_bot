// import path from "path";
// import currentCombo  from "../data/dailyCombo.json";

// interface ComboInterface{
//     time: number,
//     firstItemID: number,
//     secondItemID: number,
//     thirdItemID: number
// }


// function randomNumberGenerator(count: number, min: number, max: number){
//     const numbers: Set<number> = new Set<number>();

//     while(numbers.size < count){
//         const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//         numbers.add(randomNumber);
//     }
//     return Array.from(numbers);
// }

// function getDailyCombo(){
//     const MILLISECONDS_IN_DAY = 86400000;
//     const RANGE_MIN = 0;
//     const RANGE_MAX = 68;
//     const hiddenComboDuration = Date.now() - currentCombo.time;
    
//     if(hiddenComboDuration > MILLISECONDS_IN_DAY){
//         const uniqueRandomNumbers : any = randomNumberGenerator(3, RANGE_MIN, RANGE_MAX);
        
//         const newCombo: ComboInterface={
//             time: Date.now(),
//             firstItemID: uniqueRandomNumbers[0],
//             secondItemID: uniqueRandomNumbers[1],
//             thirdItemID: uniqueRandomNumbers[2],
//         };
//         const filePath = path.join(__dirname, "dailyCombo.json");
//         fs
//     }
// }