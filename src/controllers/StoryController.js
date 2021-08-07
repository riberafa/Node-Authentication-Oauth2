const {response} = require ('express');
const Story = require('../models/Story');

const create = async(req,res) => {
    try{
        const story = await Story.create(req.body);
        return res.status(201).json({
            message: "Story cadastrada com sucesso!", 
            Story: story
        });
    }catch(err){
        res.status(500).json({
            error: err, message: "Erro ao criar Story."
        });
    }
};

const show = async(req,res) => {
    const {id} = req.params;
    try {
        const story = await Story.findByPk(id);
        return res.status(200).json({message: "Story encontrada.", story});
    }catch(err){
        return res.status(500).json({err, message: "Story não encontrada."});
    }
};

const index = async(req,res) => {
    try {
        const storys = await Story.findAll();
        return res.status(200).json({message: "Storys encontradas.", storys});
    }catch(err){
        return res.status(500).json({err, message: "Storys não encontradas."});
    }
};

const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Story.update(req.body, {where: {id: id}});
        if(updated) {
            const story = await Story.findByPk(id);
            return res.status(200).send(story);
        } 
        throw new Error();
    }catch(err){
        return res.status(500).json("Erro ao tentar atualizar informações de uma Story.");
    }
};

const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Story.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Story deletada com sucesso.");
        }
        throw new Error ();
    }catch(err){
        return res.status(500).json("Story não encontrada.");
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
