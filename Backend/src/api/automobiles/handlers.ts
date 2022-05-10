import { Request, Response } from 'express';
import { AutoMobile } from './models';

const getAllAutoMobiles = (req: Request, res: Response) => {
    const { pageId, pageSize } = req.params
    const limit = parseInt(pageSize)
    const skip = (parseInt(pageId) - 1) * parseInt(pageSize)
    AutoMobile.find({}, {}, {limit, skip})
      .then((result) =>
        res.json({
          success: true,
          message: "Automobiles fetched successfully",
          payload: result,
        })
      )
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "error in fetching automobiles",
          error: err,
        })
      );
  };

const createAutoMobile = (req: Request, res: Response) => {
    const automobile = new AutoMobile(req.body)
    automobile
    .save()
    .then(result => {
      res.status(201).json({
        status: "success",
        message: "created automobile successfully",
        error: null,
        data: result,
      })
    })
    .catch((err => {
      res.status(500).json({
        status: "failure",
        message: "Failed to create automobile",
        error: err,
        data: null,
      })
    }))
}

const getAutoMobileById = (req: Request, res:Response) => {
  const id = req.params.id
  AutoMobile.findById(id)
  .then(result => {
    res.json({
      status: "success",
      message: "fetched automobile successflly",
      error: null,
      data: result,
    })
  })
  .catch(err => res.status(500).json({
    status: "Failure",
    message: "Failed to fetch Automobile",
    error: err,
    data: null,
  }))
}


const updateAutoMobile = () => {}

const deleteAutoMobile = (req: Request, res: Response) => {
  const id = req.params.id
  AutoMobile.deleteOne({ _id: id })
  .then(result => {
    res.json({
      status: "Success",
      message: "Automobile deleted successfully",
      data: result,
      error: null,
    })
  })
  .catch(err => {
    res.status(500).json({
      status: "Failure",
      message: "Failed to delete automobile",
      error: err,
      data: null,
    })
  })
}
const handlers = {
  getAllAutoMobiles,
  getAutoMobileById,
  createAutoMobile,
  deleteAutoMobile
}

export default handlers


