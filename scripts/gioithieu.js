const members = [
    {
    name: "Phạm Văn Minh",
    birthday: "29/08/2005",
    desc: "Phạm Văn Minh: Giám đốc công ty."
    },
    {
    name: "Phạm Hữu Linh",
    birthday: "23/03/2006",
    desc: "Phạm Hữu Linh: Trợ lý giám đốc."
    },
    {
    name: "Nguyễn Đình Đức Mạnh",
    birthday: "15/10/2006",
    desc: "Nguyễn Đình Đức Mạnh: Nhân viên xuất sắc nhất năm."
    },
    {
    name: "Trần Đình Nhân",
    birthday: "17/12/2006",
    desc: "Trần Đình Nhân: Siêu lao công."
    }
];

window.showInfo = function(index) {
    const infoBox = document.getElementById("member-info");
    document.getElementById("member-name").textContent = members[index].name;
    document.getElementById("member-birthday").textContent = "Ngày sinh: " + members[index].birthday;
    document.getElementById("member-description").textContent = members[index].desc;
    infoBox.style.display = "block";
};