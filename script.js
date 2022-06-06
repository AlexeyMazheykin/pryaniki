document.addEventListener("DOMContentLoaded", async function () {

    const parent = document.querySelector('ul')
    const resp = await fetch('./sample.json')
    const data = await resp.json()

    const orderKeys = data.view
    const dataSource = data.data

    const orderedData = dataOrder(dataSource, orderKeys)

    render(parent, orderedData)



})

const dataOrder = (data, keys) => {
    const orderedData = []
    keys.forEach(el => {
        orderedData.push(...data.filter(fEl=>fEl.name===el))
    })
    return orderedData
}


function render(parent, data) {

    data.forEach(el => {
        if (el.name === "hz") {
            const child = document.createElement("li")
            child.classList.add("text-block")
            child.innerHTML = `
            <p>${el.name}</p>
            <p>${el.data.text}</p>
            `
            parent.append(child)
        } else if (el.name === 'picture') {
            const child = document.createElement("li")
            child.classList.add("picture-block")
            child.innerHTML = `
            <p>${el.name}</p>
            <p>${el.data.text}</p>
            <img src="${el.data.url}">
            `
            parent.append(child)
        } else if (el.name === 'selector') {

            const selectorsArr = el.data.variants
            const child = document.createElement("li")
            child.classList.add("selectors-block")
            child.innerHTML = `
            <p class="selectors-title">${el.name}</p>
               `;
            selectorsArr.forEach(sel => {
                const selector = document.createElement("p")
                selector.classList.add("selectors-item")
                selector.title = "Натиснить на мене"
                selector.innerText = sel.id
                selector.onclick = function () {
                    alert(sel.text)
                }
                child.append(selector)

            })
            parent.append(child)

        }
    })
}

