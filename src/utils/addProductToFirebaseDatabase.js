const addProductToFirebase = () => {
    setLoading(true);

    const db = getFirestore();        
    const addProductToFirebase = db.collection('items');

        const newItemProduct = {
        categoryId: 'Unisex',
        details: {
            large: {
                aqua: {
                    image: 'unisex-superman-tas-celeste.png',
                    stock: 7
                }
            },
            medium: {
                aqua: {
                    image: 'unisex-superman-tas-celeste.png',
                    stock: 5
                }
            },
            small: {
                aqua: {
                    image: 'unisex-superman-tas-celeste.png',
                    stock: 8
                }
            }
        },
        featured: false,
        image: 'unisex-superman-tas-celeste.png',
        name: 'Superman TAS',
        price: 900
    }

    addProductToFirebase.add(newItemProduct)
    
    setLoading(false);
}

<button className="btn btn-success w-100" onClick={addProductToFirebase}>AGREGAR PRODUCTO A BASE DE DATOS</button>