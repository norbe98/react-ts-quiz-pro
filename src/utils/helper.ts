    export function decodeHTML(text: string): string {
        const textarea = document.createElement("textarea")
        textarea.innerHTML = text
        return textarea.value
    }

    export function addDate() {
        const now = new Date()
        const pad = (n: number) => n.toString().padStart(2, "0")

        const year = now.getFullYear()
        const month = pad(now.getMonth() + 1)
        const day = pad(now.getDate())
        const hour = pad(now.getHours())
        const minute = pad(now.getMinutes())
        const second = pad(now.getSeconds())

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }