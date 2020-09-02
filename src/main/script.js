class GoPlayGround {
    // Checks whether the status code returned matches given stattus
    static _checkStatus(status) {
        return res => {
            if (res.status === status) {
                return res;
            }
        };
    }

    createFormDataWithOptions(data, options) {
        if (data == null) {
            data = "";
        }

        const form = new FormData();
        form.append("body", data);
        for (let key in options) {
            form.append(key, options[key]);
        }
        return form;
    }

    // formats selected text
    fmt(code) {
        const options = {
            "imports": true
        };
        return fetch('https://play.golang.org/fmt', {
            method: 'POST',
            body: this.createFormDataWithOptions(code, options),
        })
            .then(GoPlayGround._checkStatus(200))
            .then(res => res.text())

    };

    run(code) {
        const options = {
            "withVet": true
        };

        return fetch('https://play.golang.org/compile', {
            method: 'POST',
            body: this.createFormDataWithOptions(code, options),
        })
            .then(GoPlayGround._checkStatus(200))
            .then(res => res.text())
    };
}

function copyToClipboard(body) {
    let dummyObj = document.createElement("textarea");
    document.body.appendChild(dummyObj);
    dummyObj.value = body;
    dummyObj.select();
    document.execCommand("copy");
    document.body.removeChild(dummyObj);
}

let selectedTxt = "";
let g = new GoPlayGround();

// 選択されたときのイベント
document.addEventListener("selectionchange", function (e) {
    const str = window.getSelection().toString();
    selectedTxt = str;
})

// キーが押されたときのイベント
document.body.addEventListener('keydown', function (e) {
    // Ctrl + Shift + Enter
    // Run
    if (event.key === 'Enter' && event.ctrlKey && event.shiftKey) {
        g.run(selectedTxt)
            .then(res => JSON.parse(res))
            .then(res => {
                const err = res.Errors;
                if (err) {
                    console.log(err);
                } else {
                    if (res.Events.length > 0) {
                        const message = res.Events[0].Message;
                        alert(message);
                    }
                }
            }).catch(err => {
                console.log(err);
                alert('Failed to get value\n' + err);
            })
    }

    // Ctrl + Enter
    // Fmt
    if (event.key === 'Enter' && event.ctrlKey) {
        g.fmt(selectedTxt)
            .then(res => JSON.parse(res))
            .then(res => {
                const err = res.Error;
                if (err) {
                    console.log(err);
                    alert("Error:\n" + err);
                } else {
                    const body = res.Body;
                    copyToClipboard(body);
                }
            }).catch(err => {
                console.log(err);
                alert('Failed to get value\n' + err);
            })
    }
});