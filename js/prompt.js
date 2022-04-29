const prompts = () => {
    let arrssss = localStorage.getItem('prompt');
    let promptss = JSON.parse(arrssss)
    if (promptss !== null) {
        return
    } else {
        let al = prompt('автор').toString()
        let mass = {
            'name': al,
        }
        let strung_arr = JSON.stringify(mass)
        let asl = localStorage.setItem("prompt", strung_arr)
    }
}
export default prompts