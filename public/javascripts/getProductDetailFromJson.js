/**
********************************************************************************
Projeto Seniores Digitais - Labora/Alura/Oracle ONE
Aluna: Rosemeire Deconti
Desafio - https://github.com/enextgroup/quero-trabalhar-na-enext
Data: Dezembro/2020
********************************************************************************
**/
/** ------------------------------------------------------------------------ **/
function productDetailShow(potionNumber)
{
  document.getElementById('product-detail-show').style.display='block';
  document.getElementById('product-detail-hide').style.display='block';

  getProductDetailFromJson(potionNumber);

}

/** ------------------------------------------------------------------------ **/
function productDetailHide()
{
  document.getElementById('product-detail-show').style.display='none';
  document.getElementById('product-detail-hide').style.display='none';
}

/** ------------------------------------------------------------------------ **/
/** Get data from JSON using XMLHttpRequest                                  **/
/** In case of error a message is displayed to user                          **/
/** ------------------------------------------------------------------------ **/
function getProductDetailFromJson(potionNumber){

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:3002/potions");

  xhr.addEventListener("load", function() {

      var baseMessage = document.querySelector("#base-message");

      if (xhr.status == 200) {

          baseMessage.classList.add("base-message");
          var requestAnswer = xhr.responseText;
          var arrayObject = JSON.parse(requestAnswer);

          for(var index in arrayObject.potions) {
            createUnorderedListDetail(arrayObject.potions[index], potionNumber)
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
function createUnorderedListDetail(itemJson, potionNumber){

  if (itemJson.id == potionNumber){

      generateListItemDetailImage(itemJson);
      generateListItemDetailData(itemJson);

  }

}

/** ------------------------------------------------------------------------ **/
/** Create item to unordered list with data from Json - Data                 **/
/** ------------------------------------------------------------------------ **/
function generateListItemDetailData(itemJson){

  var unorderedList = document.querySelector("#product-detail-data");

  unorderedList.appendChild(formatListItemDetail(itemJson.name, "product-detail-name"));
  unorderedList.appendChild(formatListItemDetail("Use/Effect:", "product-detail-title"));
  unorderedList.appendChild(formatListItemDetail(itemJson.effect, "product-detail-effect"));
  unorderedList.appendChild(formatListItemDetail("Ingredients:", "product-detail-title"));

  for (index in itemJson.ingredients) {
    unorderedList.appendChild(formatListItemDetail(itemJson.ingredients[index], "product-detail-ingredient"));
    index++;
  }

  unorderedList.appendChild(formatListItemDetail("Price:", "product-detail-title"));
  unorderedList.appendChild(formatListItemDetail(itemJson.price, "product-detail-price"));
  unorderedList.appendChild(formatListItemDetail("Add to cart", "product-detail-button"));

}

/** ------------------------------------------------------------------------ **/
/** Create item to unordered list with data from Json - Image                **/
/** ------------------------------------------------------------------------ **/
function generateListItemDetailImage(itemJson){

  var unorderedList = document.querySelector("#product-detail-image");
  unorderedList.appendChild(formatListItemDetail(itemJson.image, "product-detail-image"));

}

/** ---------------------------------------------------------------------- **/
/** Format list item with data from Json                                   **/
/** ---------------------------------------------------------------------- **/
function formatListItemDetail(data, classId) {

  console.log(classId + " " + data);

  switch (classId) {

    default:
      var itemList = document.createElement("P");
      itemList.textContent = data;
      itemList.classList.add(classId);
      break;

    case "product-list-line":
      var itemList = document.createElement("LI");
      var linkText = document.createTextNode(data);
      itemList.textContent = data;
      itemList.classList.add(classId);
      break;

    case "product-detail-image":
      var itemList = document.createElement("IMG");
      var imageSrc = "http://localhost:3002/imagesProducts/" + data;
      itemList.src = imageSrc;
      itemList.alt = "Potion detail data";
      itemList.textContent = data;
      itemList.classList.add(classId);
      break;

    case "product-detail-button":
      var itemList = document.createElement("BUTTON");
      var linkText = document.createTextNode("Add to cart");
      itemList.classList.add("product-detail-button");
      itemList.textContent = data;
      itemList.classList.add(classId);
      break;

    case "product-detail-close":
      var itemList = document.createElement("A");
      var linkText = document.createTextNode(data);
      itemList.setAttribute("href", "javascript:void(0)")
      var itemParameter = "productDetailHide();";
      itemList.setAttribute("onclick", itemParameter)
      itemList.classList.add("product-detail-close");
      itemList.textContent = data;
      itemList.classList.add(classId);
      break;

  }

  console.log(itemList);

  return itemList;
}
