"use strict";

function visao() {
  visao_display.style.display = "none";
  missao_display.style.display = "block";
  mudar.style.left = "0";
}

function misao() {
  visao_display.style.display = "block";
  missao_display.style.display = "none";
  mudar.style.left = "50%";
}

var teste = 0;

function fn_muda_tema() {
  if (teste == 0) {
    document.getElementById('estilo_site').setAttribute('href', './CSS/Estilo_Site_claro.css');
    document.getElementById('estilo_menu').setAttribute('href', './CSS/Estilo_menu_claro.css');
    teste++;
  } else {
    document.getElementById('estilo_site').setAttribute('href', './CSS/Estilo_Site_escuro.css');
    document.getElementById('estilo_menu').setAttribute('href', './CSS/Estilo_menu_escuro.css');
    teste--;
  }
}

function consultaCep() {
  var cep = document.getElementById("cep1").value;
  var url = "https://viacep.com.br/ws/" + cep + "/json/";
  $.ajax({
    url: url,
    type: "GET",
    success: function success(response) {
      document.querySelector('input[name=logradouro]').value = response.logradouro;
      document.querySelector('input[name=bairro]').value = response.bairro;
      document.querySelector('input[name=cidade]').value = response.localidade;
    }
  });
}

$(function () {
  $(window).on("scroll", function () {
    {
      if ($(window).scrollTop() < 1301) {
        $("#opt_home").addClass("aqui01");
      } else {
        $("#opt_home").removeClass("aqui01");
      }
    }
    {
      if ($(window).scrollTop() > 1302 && $(window).scrollTop() < 2565) {
        $("#opt_about").addClass("aqui01");
      } else {
        $("#opt_about").removeClass("aqui01");
      }
    }
    {
      if ($(window).scrollTop() > 2566) {
        $("#opt_service").addClass("aqui01");
      } else {
        $("#opt_service").removeClass("aqui01");
      }
    }
  });
});
