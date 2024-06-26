export default class Jsml {
    constructor() {
    }

    deleteChildren(victim) {
        let e = victim;
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

    createHTMLElement(elementType, parent, text, attributes, childrenArray) {
        let e = document.createElement(elementType);

        if (text) {
            e.innerHTML = text;
        }

        // add attributes to element
        if (attributes) {
            const keys = Object.keys(attributes);
            keys.forEach(key => {
                if (key === 'classList') {
                    const classList = attributes[key].split(" ")
                    classList.forEach(classItem => {
                        e[key].add(classItem)
                    })
                } else if (key === 'addEventListener') {
                    e[key](attributes[key][0], attributes[key][1]);
                } else {
                    e[key] = attributes[key];
                }
            })
        }

        //append children
        if (childrenArray) {
            childrenArray.forEach(child => {
                if (Object.keys(child).length > 0) {
                    let at = child[Object.keys(child)]['attributes'];
                    console.log(at)
                    this.createHTMLElement(Object.keys(child), e, false, false, at, child[Object.keys(child)]['children'])
                } else {
                    e.appendChild(child)
                }
            })
        }
        if (parent) {
            parent.appendChild(e)
            return e
        } else {
            return e
        }
    }

    elementFromHtml(html) {
        const template = document.createElement("template");

        template.innerHTML = html.trim();

        return template.content.firstElementChild;
    }
}