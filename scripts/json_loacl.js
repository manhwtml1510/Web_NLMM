localStorage.clear()



fetch('data.json')
    .then(products_data => products_data.json())
    .then(data => {
        localStorage.setItem('products',JSON.stringify(data))
    })