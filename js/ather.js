const ather = () => {
    let arrssss = localStorage.getItem('prompt');
    let prompt = JSON.parse(arrssss)
    return prompt.name
}
export default ather