export default class Person{
    constructor(name, role){
        this.name = name;
        this.role = role;
    }

    info() {
        console.log(this.name + " " + this.role);
    }
}

export let normalExport = true;
