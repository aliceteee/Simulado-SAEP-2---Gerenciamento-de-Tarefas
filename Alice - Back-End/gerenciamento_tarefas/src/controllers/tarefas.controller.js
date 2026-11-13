
const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.tarefas.create({
            data
        });

        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao cadastrar tarefa"
        });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.tarefas.findMany({
            include: {
                usuario: true
            }
        });

        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao listar tarefas"
        });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.tarefas.findUnique({
            where: { id: Number(id) },
            include: {
                usuario: true
            }
        });

        if (!item) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao buscar tarefa"
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.tarefas.update({
            where: { id: Number(id) },
            data: dados
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao atualizar tarefa"
        });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.tarefas.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao excluir tarefa"
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
