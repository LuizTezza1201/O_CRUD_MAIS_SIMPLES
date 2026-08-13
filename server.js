const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const Usuarios = require("./model/Usuarios");
const app = express();
const PORT = 3000;

// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota da página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota da página de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Rota da página de cadastro
app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

// Rota da página do administrador
app.get("/adm", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "adm.html"));
});

// Rota temporária para receber o formulário de login
app.post("/login"), (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    try{
        const usuario = await Usuarios.buscarPorEmail(email);

        if(usuario){
            return res.redirect("/login");
        }

        const senhaCorreta = await bcrypt.compare{
            senha, usuario.senha
        }

        if(!senhaCorreta){
            return res.redirect("/login")
        }

        res.redirect("/adm")
    }catch (erro){
        console.error{
            "erro ao fazer login: ", erro
        }

        res.redirect("/login")
    }
}

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});