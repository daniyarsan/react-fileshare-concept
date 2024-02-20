function copytoClipboard() {
    const link = document.querySelector('#shareLink');
    const alert = document.querySelector('#copytoClipboard-alert');

    const storage = document.createElement('textarea');
    storage.value = link.innerHTML;
    link.appendChild(storage);

    storage.select();
    storage.setSelectionRange(0, 99999);
    if (document.execCommand('copy')) {
        link.removeChild(storage);
        alert.classList.remove('hidden');
        setTimeout(() => {
            alert.classList.add('hidden');

        }, 2000);
    }
}