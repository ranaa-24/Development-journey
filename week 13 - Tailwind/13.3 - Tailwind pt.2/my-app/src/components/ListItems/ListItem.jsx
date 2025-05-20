import React from 'react'

function ListItem({ icon, content, isSelected}) {
    return (
        <>
            <div className={`primary rounded-md flex justify-center lg:justify-between items-center px-3 py-2 hover:text-black hover:bg-hover transition duration-300 ${isSelected ? "bg-main-bg text-black" : "text-white "} cursor-pointer`}>
                <p className='font-semibold text-md hidden lg:block'>{content}</p>
                {icon}
            </div>
        </>
    )
}

export default ListItem