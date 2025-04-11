// we can split long runnig tasks, so that the rest of the code can run..

console.log("Start");

let i=0;

function count(){
    do{
        i++;
    }while(i % 1e6 != 0);       // if we set the condition as while(i < 1e6)  it will only run for 1e6 times, but now it will run multiple 1e6 multiples


    if(i == 1e9){
        console.log("Task COmpleted!");
    }else{
        setTimeout(count);
    }
}

count();

console.log("End");

