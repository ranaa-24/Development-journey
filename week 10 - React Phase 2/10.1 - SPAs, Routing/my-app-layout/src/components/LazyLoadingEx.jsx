function LazyGuy(){
    for(let i=0; i<1e9; i++){}  // it blocks the rendering.. tho its already downloaded as it is in the view already
    return(
        <h1 style={{color : 'purple'}}>Hii im kinda lazyyy</h1>
    )
}

export default LazyGuy;