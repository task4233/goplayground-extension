/* let runBtn = document.getElementById("switch1");
let fmtBtn = document.getElementById("switch1");
let txtField = document.getElementById("text");
let dbgField = document.getElementById("dbg");

class GoPlayGround {
    // Checks whether the status code returned matches given stattus
    static _checkStatus(status) {
        return res => {
            if (res.status === status) {
                return res;
            }
        };
    }

    createFormData(data) {
        if (data == null) {
            data = "";
        }

        const form = new FormData();
        form.append("body", data);
        return form;
    }

    // formats selected text
    fmt(code) {
        return fetch('https://play.golang.org/fmt', {
            method: 'POST',
            body: this.createFormData(code),
        })
            .then(GoPlayGround._checkStatus(200))
            .then(res => res.text())

    };

    run(code) {
        return fetch('https://play.golang.org/compile', {
            method: 'POST',
            body: this.createFormData(code),
        })
            .then(GoPlayGround._checkStatus(200))
            .then(res => res.text())
    };
}

let g = new GoPlayGround(); */

/* storageの保存 

// restore selected box
function restore_options() {
    chrome.storage.sync.get({
        code: ""
    }, function (items) {
        g.run(items.code)
            .then(res => {
                console.log(res);
                console.log(res["Events"]);
                txtField.value = res.Events[0].Message;
                dbgField.value = res.Errors;
            })
            .then(() => {
                // hoge
            })
    });
}
*/

// document.addEventListener("DOMContentLoaded", restore_options);