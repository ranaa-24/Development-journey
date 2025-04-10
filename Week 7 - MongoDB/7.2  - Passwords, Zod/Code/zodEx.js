const { z } = require("zod");

// const nameSchema = z.string().min(3);

// try {
//     let name = nameSchema.parse(123);
//     console.log(name);
// } catch (err) {
//     console.log(err.errors);
//     // console.log(err.errors[0].message);
// }

// only accepys @gmail
const requiredObject = z.object({
    name : z.string(),
    email : z.string().email().refine((val) => val.endsWith("@gmail.com"), { message: "Email must be a Gmail address"}),  
    isAdmin : z.boolean().default(false)
})

let obj1 = {
    email : "lina@gmail.com",
    name : "Lina"
}

let result = requiredObject.safeParse(obj1);

if(result.success){
    console.log(result.data);
}else{
    console.log(result.error.errors);
}