function goToPage(page) {
    let newStr = page.replaceAll(' ', '-')
    window.location.href= `/${newStr}`
}