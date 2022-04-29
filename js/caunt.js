const caunt = (arr) => {
    let caunt = document.querySelector('.caunt')
    let good = document.querySelector('.good')
    caunt.innerHTML = arr.length
    let caunts = 0
    for (const item of arr) {
        if(item.status == 'done'){
            caunts++
        }
        good.innerHTML = caunts 
    }
}

export default caunt