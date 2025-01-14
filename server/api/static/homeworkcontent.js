var token = document.cookie.split(";" )[0];
var currentCookie = token.split("=")[1];
//編輯作業
function changeHomeworkContent() {
    $.ajax({
        type: 'PUT',
        url: '/api/homework',
        headers: {
            'Authorization': 'Bearer ' + currentCookie,
            'Content-Type' : 'application/json' 
        },
        data: JSON.stringify({
            homeworkName: $('#homeworkName').val(),
            oldhomeworkName: $('#oldhomeworkName').text(),
            courseName: $('#courseName').text().split(":")[1],
            homeworkInfo: $('#homeworkInfo').val(),
            score1: $('#changescore1').val(),
            score2: $('#changescore2').val(),
            score3: $('#changescore3').val()
        }),
        success: function(response){
            alert(response.message);
        }
    })
}
//刪除作業
function delete_homeworkcontent() {
    var dccMessage = confirm("確定要解散課程 ? ");
    if (dccMessage==true) {
        $.ajax({
            type: 'delete',
            url: '/api/homework',
            headers: {
                'Authorization': 'Bearer ' + currentCookie,
                'Content-Type' : 'application/json' 
            },
            data: JSON.stringify({
                courseName: $('#courseName').text().split(":")[1],
                homeworkName: $('#oldhomeworkName').text()
            }),
            success: function(response){
                if (response.success == 't'){
                    alert(response.message);
                    window.location.href = '/course/' + $('#courseName').text().split(":")[1];
                }
            }
        })
    }
    else {
        
    }
}
//高權限上傳檔案
function A1_upload_file() {
    let formData = new FormData();
    formData.append('workType', 1);
    formData.append('className', $('#courseName').text().split(":")[1]);
    formData.append('homeworkName', $('#oldhomeworkName').text());
    formData.append('pgvFile', document.getElementById('pgv1').files[0]);
    formData.append('pgvFile2', document.getElementById('pgv2').files[0]);
    formData.append('pgvFile3', document.getElementById('pgv3').files[0]);
    formData.append('sofFile', document.getElementById('sof1').files[0]);
    formData.append('score', $('#score1').val());
    formData.append('score2', $('#score2').val());
    formData.append('score3', $('#score3').val());

    $.ajax({
        type: 'POST',
        url: '/api/ProgrammingRequest',
        headers: {
            'Authorization': 'Bearer ' + currentCookie
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){}
    })
}
//低權限檔案上傳
function A0_upload_file() {
    let formData = new FormData();
    formData.append('workType', 2);
    formData.append('className', $('#courseName').text().split(":")[1]);
    formData.append('homeworkName', $('#oldhomeworkName').text());
    formData.append('sofFile', document.getElementById('sof1').files[0]);

    $.ajax({
        type: 'POST',
        url: '/api/ProgrammingRequest',
        headers: {
            'Authorization': 'Bearer ' + currentCookie
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){}
    })
}
//顯示編輯作業視窗
function show_change_homeworkcontent() {
    document.getElementsByClassName('dialog')[0].showModal();
}
//送出編輯內容
function pay_change_homeworkcontent() {
    changeHomeworkContent()
    window.location.href = '/course/' + $('#courseName').text().split(":")[1] + '/' +$('#homeworkName').val();
}
//關閉編輯作業視窗
function close_change_homeworkcontent() {
    document.getElementsByClassName('dialog')[0].close();
}
//返回作業列表
function go_back(){
    window.location.href = '/course/' + $('#courseName').text().split(":")[1];
}