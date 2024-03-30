const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    index : async (req, res, next) => {
        try {
            const users = await prisma.user.findMany();
            if (!users) {
              return res.status(404).json({ error: 'User dont have data yet' });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: users
            })
        }
        catch (err) {
            next(err);
        }
    },

    show : async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const user = await prisma.user.findUnique({
              where: { id: id },
              include: { profile: true }
            });
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: user
            })
        }
        catch (err) {
            next(err);
        }
    },

    store : async (req, res, next) => {
        try {
            const { name, email, password, profileData } = req.body;
            let exist = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if (exist) {
                return res.status(400).json({
                    status: 'false',
                    message: 'email already exist',
                    data: null
                });
            }
            const user = await prisma.user.create({
              data: {
                name,
                email,
                password,
                profile: {
                  create: profileData
                }
              },
              include: {
                profile: true
              }
            });
            res.status(201).json({
                status: true,
                message: 'OK',
                data: user
            });
        }
        catch (err) {
            next(err);
        }

}
}