let map = new Map()

class thong_Tin {
    #sdt
    #ten
    #email
    #ghi_chu

    constructor(sdt, ten, email, ghi_chu) {
        this.sdt = sdt
        this.#ten = ten
        this.#email = email
        this.#ghi_chu = ghi_chu
    }

    get sdt() {
        return this.#sdt
    }
    set sdt(sdt) {
        this.#sdt = sdt
    }

    get ten() {
        return this.#ten
    }
    set ten(ten) {
        this.#ten = ten
    }
    
    get email() {
        return this.#email
    }
    set email(email) {
        this.#email = email
    }

    get ghi_chu() {
        return this.#ghi_chu
    }
    set ghi_chu(ghi_chu) {
        this.#ghi_chu = ghi_chu
    }
}

function submit () {
    let sdt = document.getElementById("phone").value
    let ten = document.getElementById("hoVaTen").value
    let email = document.getElementById("email").value
    let ghi_chu = document.getElementById("ghiChu").value

    if (sdt && ten && email && ghi_chu) {
    let thongtin = new thong_Tin(sdt, ten, email, ghi_chu)
    map.set(sdt, thongtin)
    
    alert(`Cảm ơn bạn đã để lại thôn tin cho NLMM.
Tư vẫn sẽ sớm liên hệ với bạn để tư vấn.`)
    } else {
        alert(`Bạn nhập thiếu thông tin rồi.
Bạn hãy để lại thông tin đầy đủ để NLMM có 
thể liên hệ tư vấn với bạn dễ ràng hơn.`)
    }

    console.log(map) // xem map trong console

    document.getElementById("phone").value = ""
    document.getElementById("hoVaTen").value = ""
    document.getElementById("email").value = ""
    document.getElementById("ghiChu").value = ""
}

// còn thiếu phần hiển thị các thông tin của khách hàng ở đâu ?
