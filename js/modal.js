const createmobile = (input, arr, element1, element2, text) => {
    let form = document.querySelector('form')
    let arr_name_for_inp = ['Zagolovok', 'des']
    let arr_ple_for_inp = ['Заголовок', 'Описание']
    form.innerHTML = ' '
    let inputmobail
    let buton = document.createElement('button')
    buton.innerText = 'Создать'
    let code = ` <div class="item">
    <h1>${text}</h1>
    </div>`
    form.innerHTML = code
    for (let i = 0; i < input; i++) {
        inputmobail = document.createElement('input')
        inputmobail.setAttribute('type', 'text')
        inputmobail.setAttribute('name', arr_name_for_inp[i])
        inputmobail.setAttribute('placeholder', arr_ple_for_inp[i])
        form.append(inputmobail)
    }
    let num = inputmobail.value
    inputmobail.onkeyup = () => {
        num = inputmobail.value
        REGEX(arr, num, element1, element2)
    }
    form.append(buton)
    
    element2.onclick = () => {
        closeModal(element1, element2)
    }

    anim()
}

const closeModal = (element1, element2) => {
    let body = document.body
    element2.style.opacity = "0"
    element1.style.opacity = "0"
    element1.style.width = "0px"
    element1.style.height = '0px'
    body.style.overflow = 'scroll'
    setTimeout(() => {
        element2.style.display = "none"
        element1.style.display = "none"
        element1.classList.remove('mobail-modal')
    }, 100);
}

const showModal = (width, haight, input, text, arr, data_del, element1, element2, arr_full) => {
    let body = document.body
    console.log(element2);
    element2.style.display = "block"
    element1.style.display = "flex"
    body.style.overflow = 'hidden'
    element1.style.width = width
    element1.style.height = haight
    setTimeout(() => {
        element2.style.opacity = "1"
        element1.style.opacity = "1"
    }, 100);

    setTimeout(() => {
        element1.classList.add('mobail-modal')
    }, 150);
    createmobile(input, arr, element1, element2, text)
}

const anim = (arr, arr_full) => {
    let course_modal = document.querySelector('.modal')
    let bg_modal = document.querySelector('.bg-modal')
    let butns = document.querySelectorAll('div[data-but]')
    console.log(butns);
    for (const but of butns) {
        but.onclick = () => {
            let valueinnrTEXT = 'Добавить Задачу'
            let data_del = but.getAttribute('data-del')
            let width = but.getAttribute('data-with')
            let haight = but.getAttribute('data-haight')
            let input = but.getAttribute('data-input')
            showModal(width, haight, input, valueinnrTEXT, arr, data_del, course_modal, bg_modal)
        }
    }
}

const REGEX = (finds, num, shit, element1, element2, id) => {
    let form = document.querySelectorAll('form')
    for (const item of form) {
        item.onsubmit = () => {
            event.preventDefault()
            let fm = new FormData(item)
            let Create_New_Task = {
                id: Math.random()
            }
            fm.forEach((a, b) => {
                Create_New_Task[b] = a
            });

            let slep = setTimeout(function () {
                axios.patch(`http://localhost:3001/user/${finds.id}`, finds)
            }, 500);

            closeModal(element1, element2)
        }
    }
}


export default anim