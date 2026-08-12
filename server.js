const express = require("express");
const path = require("path");

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
app.post("/login", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    console.log("Tentativa de login:");
    console.log("Email:", email);
    console.log("Senha:", senha);

    // Por enquanto, depois de tentar login, manda para o ADM
    res.redirect("/adm");
});

// Rota temporária para receber o formulário de cadastro
app.post("/cadastro", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    console.log("Novo cadastro:");
    console.log("Email:", email);
    console.log("Senha:", senha);

    // Por enquanto, depois de cadastrar, manda para o login
    res.redirect("/login");
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});