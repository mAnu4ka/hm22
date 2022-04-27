let api = 'https://wepro-groups.herokuapp.com/leads'

const createmobile = (input, arr, element1, element2, text, id, what) => {
    let form = document.querySelector('form')
    let arr_name_for_inp = ['name', 'comment']
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
        REGEX(arr, num, element1, element2, id, what)
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
    body.style.overflow = 'auto'
    setTimeout(() => {
        element2.style.display = "none"
        element1.style.display = "none"
        element1.classList.remove('mobail-modal')
    }, 100);
}

const showModal = (width, haight, input, text, arr, element1, element2, id, what) => {
    let body = document.body
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
    createmobile(input, arr, element1, element2, text, id, what)
}

const anim = (arr) => {
    let arrs = localStorage.getItem('arr');
    let parse = JSON.parse(arrs)
    let course_modal = document.querySelector('.modal')
    let bg_modal = document.querySelector('.bg-modal')
    let butns = document.querySelectorAll('div[data-but]')
    for (const but of butns) {
        but.onclick = () => {
            let valueinnrTEXT
            let what = but.getAttribute('data-what')
            if (what == 'edit') {
                valueinnrTEXT = 'Изменить'
            } else {
                let find = parse.find(item => but.id == item._id)
                valueinnrTEXT = find.name
            }
            let width = but.getAttribute('data-with')
            let haight = but.getAttribute('data-haight')
            let input = but.getAttribute('data-input')
            let id = but.getAttribute('id')
            showModal(width, haight, input, valueinnrTEXT, parse, course_modal, bg_modal, id, what)
        }
    }
}

const REGEX = (finds, num, element1, element2, id, patch) => {
    let form = document.querySelectorAll('form')
    for (const item of form) {
        item.onsubmit = () => {
            event.preventDefault()
            let fm = new FormData(item)
            let Create_New_Task = {
                age: "19",
                sex: "female",
                surname: "Johns",
            }
            let inp = document.querySelector('input[placeholder=Заголовок]')
            console.log(inp);

            let find = finds.find(item => id == item._id)
            let num = finds.indexOf(find)

            fm.forEach((a, b) => {
                Create_New_Task[b] = a
            });

            if (patch == 'edit') {
                find[num] = Create_New_Task
                axios.patch(`${api}/${id}`, find[num])
                closeModal(element1, element2)
            } else {
                if (inp.value == find.name) {
                    post(id )
                    closeModal(element1, element2)
                }
            }
        }
    }
}

const post = (id) => {
    axios.delete(`${api}/${id}`)
}
export default anim