
async function CaptureLoginBtn(evt: MouseEvent): Promise<void> {
    window.location.href = 'http://localhost:8081/auth';
}

document.querySelector('.login button').addEventListener('click', CaptureLoginBtn)