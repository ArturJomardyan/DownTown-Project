document.getElementsByClassName("list")[0];

function chekObj(value) {
    return typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
}

function creatList(obj) {
    let objLength = Object.keys(obj).length
    if (objLength) {
        let ul = document.createElement("ul");
        for (const property in obj) {
            let li = document.createElement("li");
            li.innerText = property

            if (chekObj(obj[property])) {
                let childrenUl = creatList(obj[property]);
                if (childrenUl) {
                    li.append(childrenUl);
                }
            }
            ul.append(li);
        }
        return ul
    }
}

function createObjectThree(container, obj) {
    container.append(creatList(obj))
}


let data = {
    "Fish": {
        "trout": {},
        "salmon": {}
    },

    "Tree": {
        "Huge": {
            "sequoia": {},
            "oak": {}
        },
        "Flowering": {
            "apple tree": {},
            "magnolia": {}
        }
    }
};

createObjectThree(container, data)
