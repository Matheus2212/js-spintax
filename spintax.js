SPINTAX = {
        identifier1: ",,,Idontthinkthiswillsshowup...",
        identifier2: "...Idontthinkthiswillsshowup,,,",
        identifier3: ",.,Idontthinkthiswillsshowup.,.",
        changeInType: false,
        input: null,
        output: null,
        button: null,
        bind: function () {
                let changed = function () {
                        let end = SPINTAX.change(SPINTAX.input.value);
                        SPINTAX.output.innerHTML = end;
                };
                if (this.changeInType) {
                        this.input.addEventListener('keyup', changed);
                }
                this.button.addEventListener('click', changed);
        },
        change: function (text) {
                text = text.replaceAll("\\{", SPINTAX.identifier1).replaceAll("\\}", SPINTAX.identifier2).replaceAll("\\|", SPINTAX.identifier3);
                let ocurrences = /(?:\{)(.*?)(?:\})/g.exec(text);
                if (typeof ocurrences !== "undefined" && ocurrences !== null && typeof ocurrences[1] !== "undefined") {
                        let possibilities = ocurrences[1].split("|");
                        let rand = Math.floor(Math.random() * possibilities.length);
                        if (typeof possibilities[rand] !== "undefined") {
                                text = text.replaceAll(ocurrences[0], possibilities[rand]);
                        }
                        return SPINTAX.change(text);
                } else {
                        text = text.replaceAll("{", "").replaceAll("}", "");
                        return text.replaceAll(SPINTAX.identifier1, "{").replaceAll(SPINTAX.identifier2, "}").replaceAll(SPINTAX.identifier3, "|");
                }
        },
        init: function (input, output, button, changeInType) {
                if (typeof changeInType !== "undefined") {
                        this.changeInType = true;
                }
                this.input = document.querySelector(input);
                this.output = document.querySelector(output);
                this.button = document.querySelector(button);
                this.bind();
        }
};