SPINTAX = {
        identifier1: ",,,Idontthinkthiswillsshowup...",
        identifier2: "...Idontthinkthiswillsshowup,,,",
        input: null,
        output: null,
        button: null,
        bind: function () {
                let changed = function () {
                        let end = SPINTAX.change(SPINTAX.input.value);
                        SPINTAX.output.innerHTML = end;
                };
                this.input.addEventListener('keyup', changed);
                this.button.addEventListener('click', changed);
        },
        change: function (text) {
                text = text.replaceAll("\\{", SPINTAX.identifier1).replaceAll("\\}", SPINTAX.identifier2);
                let ocurrences = /(?:\{)(.*?)(?:\})/g.exec(text);
                if (typeof ocurrences !== "undefined" && ocurrences !== null && typeof ocurrences[1] !== "undefined") {
                        console.log(ocurrences);
                        let possibilities = ocurrences[1].split("|");
                        let rand = Math.floor(Math.random() * (ocurrences.length - 0) + 0);
                        if (typeof possibilities[rand] !== "undefined") {
                                text = text.replaceAll(ocurrences[0], possibilities[rand]);
                        }
                        return SPINTAX.change(text);
                } else {
                        text = text.replaceAll("{", "").replaceAll("}", "");
                        return text.replaceAll(SPINTAX.identifier1, "{").replaceAll(SPINTAX.identifier2, "}");
                }
        },
        init: function (input, output, button) {
                this.input = document.querySelector(input);
                this.output = document.querySelector(output);
                this.button = document.querySelector(button);
                this.bind();
        }
};