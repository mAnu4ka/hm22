import anim from './modal.js'
import caunt from './caunt.js'
import search from './search.js'
import coll_hover from './hover.js'
import prompt from './prompt.js'

let searh = document.querySelector('.searh')
let main = document.querySelector('main')
let api = 'https://wepro-groups.herokuapp.com/todos'
let techStack

const get = () => {
    axios.get(api)
        .then(function (response) {
            let strung_arr = JSON.stringify(response.data)
            techStack = localStorage.setItem("arr", strung_arr)
            console.log(response.data);
            main.innerHTML = ` `
            create(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

const create = (arr) => {
    let arrs = arr
    prompt()
    let news
    if (arr.length == 0) {
        main.innerHTML = `не найдено`
        searh.onkeyup = () => {
            let arrs = localStorage.getItem('arr');
            let parse = JSON.parse(arrs)
            create(parse)
        }
    } else {
        main.innerHTML = ` `
        for (const item of arr) {
            if (item.status == 'new') {
                news = 'Undone'
                
            } else {
                news = 'done'
            }
            console.log('почемау');
            main.innerHTML += `<div class="item">
            <div  data-but data-input="3" data-with="400px" data-haight="250px" id='${item._id}' data-what='edit'>
            <h1 class="name">${item.title} </h1>
            <p class="des">${item.description}</p>
            <p class="athour"> athour: ${item.author}</p>
            </div>
            <div class="done done_or_n ${news}">
            <svg fill="#fff" height="24" width="24" stroke="currentColor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p>${news}</p>
            <div  data-but data-input="1" data-with="400px" data-haight="250px" id='${item._id}' data-what='del'>
            <svg
            height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1"
            viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" class="svg red" >
            <g>
            <path
            d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z" />
            <path
            d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z" />
            </g>
            </svg>
            </div>
            </div>
            </div>`
        }
        coll_hover()
        anim(arrs)
        caunt(arr)
        searh.onkeyup = () => {
            create(search(arr, searh))
        }
    }
}
get()
export default get