document.getElementById("btnForm").addEventListener("click", function (event) {
  event.preventDefault();
  let form = document.forms["form"];
  let procVendor = form.elements["procVendor"].value;
  let videoVendor = form.elements["videoVendor"].value;
  // сериализуем данные в json
  let user = JSON.stringify({ procVendor: procVendor, videoVendor: videoVendor });
  let request = new XMLHttpRequest();
  // посылаем запрос на адрес "/user"
  request.open("POST", "/dataBase", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    // получаем и парсим ответ сервера
    let receivedUser = request.response;

    console.log(receivedUser);   // смотрим ответ сервера
  });
  request.send(user);
});