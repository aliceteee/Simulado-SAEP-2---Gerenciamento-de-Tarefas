
const prisma = require("../data/prisma");

const emailValido = (email) => {
    return typeof email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const cadastrar = async (req, res) => {
    try {
        const { nome, email } = req.body;

        if (
            typeof nome !== "string" ||
            !nome.trim() ||
            !emailValido(email)
        ) {
            return res.status(400).json({
                mensagem: "Nome e e-mail válido são obrigatórios"
            });
        }

        console.log("Iniciando cadastro...");

        const item = await prisma.usuarios.create({
            data: {
                nome: nome.trim(),
                email: email.trim()
            }
        });

        console.log("Cadastro realizado:", item);

        res.status(201).json(item);
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário"
        });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.usuarios.findMany();
        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao listar usuários"
        });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuarios.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao buscar usuário"
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        if (
            typeof nome !== "string" ||
            !nome.trim() ||
            !emailValido(email)
        ) {
            return res.status(400).json({
                mensagem: "Nome e e-mail válido são obrigatórios"
            });
        }

        const item = await prisma.usuarios.update({
            where: { id: Number(id) },
            data: {
                nome: nome.trim(),
                email: email.trim()
            }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao atualizar usuário"
        });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuarios.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao excluir usuário"
        });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};
