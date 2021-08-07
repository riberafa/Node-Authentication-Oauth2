const { response } = require('express');
const User = require('../models/User');


const create = async(req,res) => {
    try{
          const user = await User.create(req.body);
          return res.status(201).json({message: "Usuário cadastrado com sucesso!", user: user});
      }catch(err){
          res.status(500).json({error: err});
      }
};

const show = async(req,res) => {
    const {id} = req.params; //req.params
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({message: "Usuário foi encontrado!", user});
    }catch(err){
        return res.status(500).json({err});
    }
};

const index = async(req,res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({
            message: "Usuários foram encontrados!", users}
        );
    }catch(err){
        return res.status(500).json({err});
    }
};

const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await User.update(req.body, {where: {id: id}});
        if(updated) {
            const user = await User.findByPk(id);
            return res.status(200).send(user);
        } 
        throw new Error();
    }catch(err){
        return res.status(500).json("Usuário não encontrado");
    }
};

const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await User.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Usuário deletado com sucesso!");
        }
        throw new Error ();
    }catch(err){
        return res.status(500).json("Usuario não encontrado.");
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy
};
