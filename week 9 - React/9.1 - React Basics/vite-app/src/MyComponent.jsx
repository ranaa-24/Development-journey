const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
];

export default function shopingList(){
    let productList = products.map(product => {
        return <li key={product.id}
        style={{color : product.isFruit ? 'green' : 'orangered'}}
        >
            {product.title}
        </li>
    })

    return (
        <ul>{ productList }</ul>
    )
}