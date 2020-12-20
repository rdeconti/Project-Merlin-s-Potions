/**
********************************************************************************
Projeto Seniores Digitais - Labora/Alura/Oracle ONE
Aluna: Rosemeire Deconti
Desafio - https://github.com/enextgroup/quero-trabalhar-na-enext
Data: Dezembro/2020
********************************************************************************
**/

getProductListFromJson();

/** ------------------------------------------------------------------------ **/
/** Get data from JSON using XMLHttpRequest                                  **/
/** In case of error a message is displayed to user                          **/
/** ------------------------------------------------------------------------ **/
function getProductListFromJson(){

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:3002/potions");

  xhr.addEventListener("load", function() {

      var baseMessage = document.querySelector("#base-message");

      if (xhr.status == 200) {

          baseMessage.classList.add("base-message");
          var requestAnswer = xhr.responseText;
          var arrayObject = JSON.parse(requestAnswer);

          for(var index in arrayObject.potions) {
            createUnorderedList(arrayObject.potions[index])
          }

      } else {

          baseMessage.classList.remove("base-message");

      }

  });

  xhr.send();

}

/** ---------------------------------------------------------------------- **/
/** Create unordered list with data from Json                              **/
/** ---------------------------------------------------------------------- **/
function createUnorderedList(itemJson){

  var unorderedList = document.querySelector("#product-list-line");
  var unorderedListItem = generateListItem(itemJson);
  unorderedList.appendChild(unorderedListItem);

}

/** ---------------------------------------------------------------------- **/
/** Create item to unordered list with data from Json                      **/
/** ---------------------------------------------------------------------- **/
function generateListItem(itemJson){

  var itemList = document.createElement("li");
  itemList.classList.add("product-list-line");

  itemList.appendChild(formatListItem(itemJson.image, "product-list-image"));
  itemList.appendChild(formatListItem(itemJson.name, "product-list-name"));
  itemList.appendChild(formatListItem(itemJson.price, "product-list-price"));
  itemList.appendChild(formatListItem(itemJson.id, "product-list-detail"));

  return itemList;

}

/** ---------------------------------------------------------------------- **/
/** Format list item with data from Json                                   **/
/** ---------------------------------------------------------------------- **/
function formatListItem(data, classId) {

  switch (classId) {

    case "product-list-image":
      var itemList = document.createElement("IMG");
      var imageSrc = "http://localhost:3002/imagesProducts/" + data;
      itemList.src = imageSrc;
      itemList.alt = "Potion data";
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "product-list-name":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "product-list-price":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "product-list-detail":
      var itemList = document.createElement("A");
      var linkText = document.createTextNode("Details: " + data);
      itemList.setAttribute("href", "javascript:void(0)")
      var itemParameter = "productDetailShow(" + data + ");";
      itemList.setAttribute("onclick", itemParameter)
      itemList.classList.add("product-list-detail");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

  }

  return itemList;

}
