class Element {
    constructor(innerText = "") {
        this.innerText = innerText;
        this.children = [];
    }

    setInnerText(text) {
        this.innerText = text;
    }

    getInnerText() {
        return this.innerText;
    }

    addChild(child) {
        this.children.push(child);
    }

    getChildren() {
        return this.children;
    }

    removeChild(child) {
        this.children = this.children.filter(c => c !== child);
    }

    render() {
        if (this.innerText) console.log(this.innerText);


        for (const child of this.children) {
            child.render();
        }
    }
}

class Div extends Element {
    constructor(innerText) {
        super(innerText);
    }

    render() {
        console.log("Im a div");
        super.render();
    }
}

class H1 extends Element {
    constructor(innerText) {
        super(innerText);
    }

    render() {
        console.log("Im a H1");
        super.render();
    }
}


const div = new Div('a');
const h11 = new H1('b');
const h12 = new H1('c');

div.addChild(h11);
div.addChild(h12);

div.render();


div.setInnerText('new div inner text');
div.removeChild(h11);


div.render();


