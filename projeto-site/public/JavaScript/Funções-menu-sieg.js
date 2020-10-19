
$(document).ready(function(){
    $(".fa-bars").click(function(){
       $(".caixa_nav").toggleClass("muda01");
       $(".local-menu").toggleClass("muda02");
       $(".sieg").toggleClass("muda03");
       $(".Informa").toggleClass("muda04");
       $(".conteiner-altera").toggleClass("muda-imagem");

    });
});

function mudar(){
    nome.contentEditable= "true";
    btn_editar.style.display= "none";
    btn_senha.style.display= "none";
    btn_salvar.style.display= "block";

}


function salvar(){
    nome.contentEditable= "false";
    btn_editar.style.display= "block";
    btn_senha.style.display= "block";
    btn_salvar.style.display= "none";
}

function senha(){
    informa_cliente.style.display= "none";
    altera_senha.style.display= "block";
}

function salvar_senha(){
    let erros = 0;
    men_erro.innerHTML="";

    if ((senha_nova.value.trim() == "") || (confir_senha.value.trim() == "") || (senha_antiga.value.trim() == "")) {

        alert(`Preencha todos os campos!`);

        //Soma um erro
        erros++;

    }

    if (senha_nova.value.length < 8) {
        men_erro.innerHTML = "Senha com 8 caracteres mínimo<br>";
        erros++;
    }

    
    if (senha_nova.value != confir_senha.value) {
        men_erro.innerHTML += "Senhas não coincidem";
        erros++;
    }

    if(erros == 0){
        informa_cliente.style.display= "block";
        altera_senha.style.display= "none";
    }
    
 

}


function voltar(){
    informa_cliente.style.display= "block";
    altera_senha.style.display= "none";

}