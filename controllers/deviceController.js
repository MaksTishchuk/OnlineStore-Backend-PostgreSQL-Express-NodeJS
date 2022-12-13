const uuid = require('uuid')
const path = require('path')
const MyError = require("../error/MyError");
const {Device, DeviceInfo, Brand, Type} = require('../models/models')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let filename = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', 'images', filename))

            const device = await Device.create({name, price, brandId, typeId, info, img:filename})

            if (info) {
                info = JSON.parse(info)
                for (const i in info) {
                    DeviceInfo.create({
                        title: info[i].title,
                        description: info[i].description,
                        deviceId: device.id
                    })
                }

            }
            return res.json(device)
        } catch (e) {
            next(MyError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: {},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}], order: [ [ 'id', 'DESC' ] ],
                limit,
                offset
            })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: {brandId},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}], order: [ [ 'id', 'DESC' ] ],
                limit,
                offset
            })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: {typeId},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}], order: [ [ 'id', 'DESC' ] ],
                limit,
                offset
            })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: {typeId, brandId},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}], order: [ [ 'id', 'DESC' ] ],
                limit,
                offset
            })
        }

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()