const caunt = (arr) => {
    let caunt = document.querySelectorAll('.caunt')
    for (const item of caunt) {
        item.innerHTML = arr.length
    }
}

export default caunt