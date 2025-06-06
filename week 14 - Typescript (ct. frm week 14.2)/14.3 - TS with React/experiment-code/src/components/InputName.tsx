import React, { useState } from 'react'

function InputName() {
    const [name, setName] = useState<string>("");

    type inputType = (e: React.ChangeEvent<HTMLInputElement>) => void
    const handleChange: inputType = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // prevent page reload

        const form  = e.currentTarget;      // the form, where the event handler is attached to..
        const formData = new FormData(form);

        // we can even send the form data to server, fetch..

        const name = formData.get('name');
        const email = formData.get('email');

        console.log("Name: ", name);
        console.log("Email", email);

        form.reset();

    }       


    return (
        <form onSubmit={handleSubmit}>
            <h1>Hii, <span style={{ color: "red" }}>{capitalize(name)}</span></h1>
            <input type="text" placeholder='Your name..' name='name' onChange={handleChange} />

            <input type="email" name="email" id="email" placeholder='xyz@gmail.com'/>
            <input type="submit"/>
        </form>
    )
}




function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default InputName